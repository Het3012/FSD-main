import React, { useState, useEffect } from "react";

const operators = ["/", "*", "+", "-", "C", "DEL"];
const numbers = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["0", ".", "="],
];

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  // Add keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (/[0-9.]/.test(key)) {
        handleButtonClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleButtonClick(key);
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleButtonClick("=");
      } else if (key === "Backspace") {
        event.preventDefault();
        handleButtonClick("DEL");
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        event.preventDefault();
        handleButtonClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [expression, result]);

  const handleButtonClick = (value) => {
    if (value === "C") {
      // Clear all - reset everything
      setExpression("");
      setResult("");
    } else if (value === "DEL") {
      // Delete last character
      setExpression(expression.slice(0, -1));
      setResult("");
    } else if (value === "=") {
      if (expression.trim() === "") {
        setResult("0");
        return;
      }
      try {
        // Replace common mathematical symbols for eval
        const processedExpression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        // eslint-disable-next-line no-eval
        const evalResult = eval(processedExpression);

        if (!isFinite(evalResult)) {
          setResult("Error");
        } else {
          // Format result to avoid very long decimals
          const formattedResult = Number(evalResult.toFixed(10)).toString();
          setResult(formattedResult);
        }
      } catch {
        setResult("Error");
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Handle operators
      if (expression === "" && value === "-") {
        // Allow negative numbers
        setExpression(value);
      } else if (expression !== "") {
        // Prevent multiple consecutive operators
        const lastChar = expression.slice(-1);
        if (!["+", "-", "*", "/"].includes(lastChar)) {
          setExpression(expression + value);
        } else {
          // Replace last operator with new one
          setExpression(expression.slice(0, -1) + value);
        }
      }
      setResult("");
    } else {
      // Handle numbers and decimal point
      if (result && result !== "Error" && /[0-9.]/.test(value)) {
        // If we just calculated a result, start fresh with new number
        setExpression(value);
        setResult("");
      } else {
        // Prevent multiple decimal points in the same number
        if (value === ".") {
          const parts = expression.split(/[+\-*/]/);
          const currentNumber = parts[parts.length - 1];
          if (currentNumber.includes(".")) {
            return; // Don't add another decimal point
          }
        }
        setExpression(expression + value);
        setResult("");
      }
    }
  };

  // Basic black and white styling for beginners
  const containerStyle = {
    minHeight: "100vh",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "20px"
  };

  const calculatorStyle = {
    background: "white",
    border: "2px solid black",
    width: "300px",
    padding: "0"
  };

  const displayStyle = {
    background: "white",
    color: "black",
    minHeight: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "15px",
    fontSize: "20px",
    position: "relative",
    borderBottom: "1px solid black"
  };

  const resultStyle = {
    color: "black",
    fontSize: "14px",
    position: "absolute",
    top: "10px",
    right: "15px",
    fontWeight: "bold"
  };

  const expressionStyle = {
    fontSize: "24px",
    color: "black",
    fontWeight: "bold",
    wordBreak: "break-all",
    minHeight: "30px",
    display: "flex",
    alignItems: "flex-end"
  };

  const operatorRowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    background: "white",
    borderBottom: "1px solid black"
  };

  const operatorButtonStyle = {
    background: "white",
    color: "black",
    border: "1px solid black",
    fontSize: "14px",
    padding: "15px 0",
    cursor: "pointer"
  };

  const clearButtonStyle = {
    ...operatorButtonStyle,
    fontWeight: "bold"
  };

  const deleteButtonStyle = {
    ...operatorButtonStyle,
    fontWeight: "bold"
  };

  const numpadStyle = {
    padding: "10px"
  };

  const rowStyle = {
    display: "flex",
    gap: "5px",
    marginBottom: "5px"
  };

  const numberButtonStyle = {
    background: "white",
    color: "black",
    border: "1px solid black",
    flex: 1,
    fontSize: "16px",
    padding: "15px 0",
    margin: "0",
    cursor: "pointer"
  };

  const equalsButtonStyle = {
    ...numberButtonStyle,
    fontWeight: "bold"
  };

  return (
    <div style={containerStyle}>
      <div style={calculatorStyle}>
        <div style={displayStyle}>
          {result !== "" && <span style={resultStyle}>= {result}</span>}
          <span style={expressionStyle}>{expression || "0"}</span>
        </div>

        <div style={operatorRowStyle}>
          {operators.map((op) => (
            <button
              key={op}
              style={
                op === "C"
                  ? clearButtonStyle
                  : op === "DEL"
                    ? deleteButtonStyle
                    : operatorButtonStyle
              }
              onClick={() => handleButtonClick(op)}
              onMouseEnter={(e) => {
                e.target.style.background = "black";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "black";
              }}
              type="button"
            >
              {op}
            </button>
          ))}
        </div>

        <div style={numpadStyle}>
          {numbers.map((row, i) => (
            <div style={rowStyle} key={i}>
              {row.map((num) => (
                <button
                  key={num}
                  style={num === "=" ? equalsButtonStyle : numberButtonStyle}
                  onClick={() => handleButtonClick(num)}
                  onMouseEnter={(e) => {
                    e.target.style.background = "black";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "black";
                  }}
                  type="button"
                >
                  {num}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;