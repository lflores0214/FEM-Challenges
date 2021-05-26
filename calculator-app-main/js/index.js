const calculator = document.querySelector(".calculator");
const keys = document.querySelectorAll(".btn");
const display = document.getElementById("display");
const themeToggle = document.getElementById("toggle-btn");
const container = document.getElementById("container")

themeToggle.addEventListener("click", (e) => {
  const themeDic = { 1: "theme1", 2: "theme2", 3: "theme3" };
  container.dataset.theme = themeDic[e.target.value];
});

const calculate = (num1, operator, num2) => {
  let answer;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (operator === "add") {
    answer = n1 + n2;
  }
  if (operator === "subtract") {
    answer = n1 - n2;
  }
  if (operator === "multiply") {
    answer = n1 * n2;
  }
  if (operator === "divide") {
    answer = n1 / n2;
  }
  console.log(answer);
  return answer;
};

keys.forEach((e) => {
  e.addEventListener("click", (el) => {
    const key = el.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = "";
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === "decimal") {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = "0.";
        calculator.dataset.previousKeyType = "";
      }
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      calculator.dataset.num1 = displayedNum;
      calculator.dataset.operator = action;
      calculator.dataset.previousKeyType = "operator";
    }

    if (action === "calculate") {
      const num1 = calculator.dataset.num1;
      const operator = calculator.dataset.operator;
      const num2 = displayedNum;
      display.textContent = calculate(num1, operator, num2);
    }

    if (action === "delete") {
      console.log("delete");
    }

    if (action === "reset") {
      display.textContent = 0;
      calculator.dataset.num1 = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
    }
  });
});
