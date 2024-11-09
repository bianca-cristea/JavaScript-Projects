const form = document.querySelector("form");
const container = document.querySelector(".container");
const input = document.querySelector("input");

class Task {
  constructor(task) {
    this.task = task;
  }
}
class UI {
  constructor() {}

  addTask(task) {
    const p = document.createElement("p");
    p.innerText = task;
    p.classList.add("task");
    container.appendChild(p);
    input.value = "";
  }
  removeTask(target) {
    target.remove();
  }
  displayAlert(message, className) {
    const alert = document.createElement("div");
    alert.className = `alert ${className}`;
    alert.textContent = message;
    container.insertAdjacentElement("afterend", alert);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;

  const ui = new UI();

  if (inputValue === "") {
    ui.displayAlert("Please enter task.", "error");
  } else {
    ui.addTask(inputValue);
    ui.displayAlert("Task added", "success");
  }
});
container.addEventListener("click", (event) => {
  const ui = new UI();
  ui.removeTask(event.target);
  ui.displayAlert("Task removed succesfully", "success");
});
