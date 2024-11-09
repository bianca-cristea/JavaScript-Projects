const form = document.querySelector("form");
const container = document.querySelector(".container");
const input = document.querySelector("input");

class Task {
  constructor(id, task) {
    this.id = id;
    this.task = task;
  }
}
class UI {
  constructor() {}

  addTask(taskObj) {
    const p = document.createElement("p");
    p.innerText = taskObj.task;
    p.classList.add("task");
    p.dataset.id = taskObj.id;
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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let idTask = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;

const ui = new UI();
tasks.forEach((task) => ui.addTask(task));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  if (inputValue === "") {
    ui.displayAlert("Please enter task.", "error");
    return;
  } else {
    const task = new Task(idTask, inputValue);
    idTask++;
    ui.addTask(task);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ui.displayAlert("Task added", "success");
  }
});
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("task")) {
    const taskId = parseInt(event.target.dataset.id);
    console.log(taskId);
    ui.removeTask(event.target);
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ui.displayAlert("Task removed succesfully", "success");
    idTask--;
  }
});
