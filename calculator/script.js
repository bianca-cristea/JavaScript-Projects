const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
  button.addEventListener("click", () => calculate(button))
);

let arr = [];
let string = "";

const calculate = (button) => {
  if (button.textContent === "=") {
    screen.textContent = eval(string);
    arr = [eval(string)];
  } else if (button.textContent === "Clear") {
    arr = [];
    screen.textContent = "";
  } else {
    arr.push(button.textContent);
    string = arr.join("");
    screen.textContent = string;
  }
};
