const display = document.getElementById("display");
let currentInput = ""; // Holds the entire expression

// Function to update the display
function updateDisplay() {
    display.value = currentInput;
}

// Function to handle button clicks
function buttonClick(value) {
    if (!isNaN(value) || value === ".") {
        // Append numbers and decimals to current input
        currentInput += value;
    } else if (["+", "-", "x", "/"].includes(value)) {
        // Add operator only if there's no operator at the end
        if (currentInput && !isOperatorAtEnd()) {
            currentInput += ` ${value} `;
        }
    } else if (value === "=") {
        calculate();
    } else if (value === "RESET") {
        currentInput = "";
    } else if (value === "Del") {
        currentInput = currentInput.slice(0, -1).trim();
    }
    updateDisplay();
}

// Helper function to check if the last character is an operator
function isOperatorAtEnd() {
    return ["+", "-", "x", "/"].includes(currentInput.trim().slice(-1));
}

// Function to evaluate the expression
function calculate() {
    const sanitizedInput = currentInput.replace(/x/g, "*"); // Replace 'x' with '*' for multiplication
    try {
        const result = new Function("return " + sanitizedInput)(); // Safely evaluate
        currentInput = result.toString();
    } catch (error) {
        currentInput = "Error";
    }
    updateDisplay();
}

// Add event listeners to all buttons
document.querySelectorAll(".btncontainer button").forEach(button => {
    button.addEventListener("click", () => buttonClick(button.textContent));
});
