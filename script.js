const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (_, secondNumber) => secondNumber,
};

let firstValue = 0;
let operateValue = "";
let awaitNextValue = false;

function sendNumberValue(number) {
  // Replace currentValue if firstValue is entered
  if (awaitNextValue) {
    calculatorDisplay.textContent = number;
    awaitNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitNextValue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = +calculatorDisplay.textContent;
  //   Prevent multiple operators
  if (operateValue && awaitNextValue) {
    operateValue = operator;
    return;
  }

  // Assigning firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calc = calculate[operateValue](firstValue, currentValue);
    calculatorDisplay.textContent = calc;
    firstValue = calc;
  }
  //   Ready for Next Value, store Operator
  awaitNextValue = true;
  operateValue = operator;
}

// Reset All Values
function resetAll() {
  firstValue = 0;
  operateValue = "";
  awaitNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add Event Listners for Numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Event Listners
clearBtn.addEventListener("click", resetAll);
