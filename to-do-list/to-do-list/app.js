const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.querySelector(".container");

let tasks =
  JSON.parse(localStorage.getItem("tasks")) !== null
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
tasks.forEach((task) => ui.addTask(task));

class Task {
  constructor(id, taskName) {
    this.id = id;
    this.taskName = taskName;
  }
}
class UI {
  constructor() {}

  addTask(taskObj) {
    const taskElement = document.createElement("p");
    taskElement.textContent = taskObj.taskName;
    taskElement.classList.add("task");
    container.appendChild(taskElement);
    taskElement.dataset.id = String(taskObj.id);
  }
  removeTask(id) {
    tasks = tasks.filter((task) => task.id !== parseInt(id));
    let arr = Array.from(document.querySelectorAll(".task"));
    arr.forEach((task) => {
      if (task.dataset.id === id) task.remove();
    });
  }

  displayAlert(message, className) {
    const alert = document.createElement("p");
    alert.textContent = message;
    alert.classList.add(className);
    container.insertAdjacentElement("afterend", alert);
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
}
const ui = new UI();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  input.value = "";
  if (inputValue) {
    const taskObj = new Task(
      tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      inputValue
    );
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ui.addTask(taskObj);
    ui.displayAlert("Task added succesfully", "success");
  } else {
    ui.displayAlert("Please add a task", "error");
  }
});

container.addEventListener("click", (event) => {
  ui.removeTask(event.target.dataset.id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
