import React, { useState } from "react";

export const NumberContext = React.createContext();

const NumberProvider = (props) => {
  const [number, setNumber] = useState("");
  const [storedNumber, setStoredNumber] = useState("");
  const [functionType, setFunctionType] = useState("");

  /*  handleSetDisplayValue: задает значение, выводимое на дисплей.
   Мы проверяем, что в числовой строке есть только один десятичный
  знак, и ограничиваем длину числа 8 символами. Он передает свойство
  buttonValue в NumberButton.js. */

  const handleSetDisplayValue = (num) => {
    if ((!number.includes(".") || num !== ".") && number.length < 8) {
      setNumber(`${(number + num).replace(/^0+/, "")}`);
    }
  };

  /* handleSetStoredValue: принимает строку и сохраняет ее, позволяя ввести другое число. */

  const handleSetStoredValue = () => {
    setStoredNumber(number);
    setNumber("");
  };

  /*  handleClearValue: сбрасывает всё в 0. Это «функция очистки», которая передается в ClearButton.js. */

  const handleClearValue = () => {
    setNumber("");
    setStoredNumber("");
    setFunctionType("");
  };

  /* handleBackButton: позволяет удалять ранее введенные символы по одному, пока вы не вернетесь в 0. Код привязан к BackButton.js.*/

  const handleBackButton = () => {
    if (number !== "") {
      const deletedNumber = number.slice(0, number.length - 1);
      setNumber(deletedNumber);
    }
  };

  /*   handleSetCalcFunction: срабатывает при выборе математической функции, передается в FunctionButton.js и в свойства buttonValue.*/

  const handleSetCalcFunction = (type) => {
    if (number) {
      setFunctionType(type);
      handleSetStoredValue();
    }
    if (storedNumber) {
      setFunctionType(type);
    }
  };

  /*   handleToggleNegative: оперирует отображаемыми или сохраненными значениями, передаваемыми в NegativeButton.js.*/

  const handleToggleNegative = () => {
    if (number) {
      if (number > 0) {
        setNumber(`-${number}`);
      } else {
        const positiveNumber = number.slice(1);
        setNumber(positiveNumber);
      }
    } else if (storedNumber > 0) {
      setStoredNumber(`-${storedNumber}`);
    } else {
      const positiveNumber = storedNumber.slice(1);
      setStoredNumber(positiveNumber);
    }
  };

  /*   doMath: запускает выбранную математическую операцию.*/

  const doMath = () => {
    if (number && storedNumber) {
      switch (functionType) {
        case "+":
          setStoredNumber(
            `${
              Math.round(
                `${(parseFloat(storedNumber) + parseFloat(number)) * 100}`
              ) / 100
            }`
          );
          break;
        case "-":
          setStoredNumber(
            `${
              Math.round(
                `${(parseFloat(storedNumber) - parseFloat(number)) * 1000}`
              ) / 1000
            }`
          );
          break;
        case "/":
          setStoredNumber(
            `${
              Math.round(
                `${(parseFloat(storedNumber) / parseFloat(number)) * 1000}`
              ) / 1000
            }`
          );
          break;
        case "*":
          setStoredNumber(
            `${
              Math.round(
                `${parseFloat(storedNumber) * parseFloat(number) * 1000}`
              ) / 1000
            }`
          );
          break;
        default:
          break;
      }
      setNumber("");
    }
  };

  return (
    <NumberContext.Provider
      value={{
        doMath,
        functionType,
        handleBackButton,
        handleClearValue,
        handleSetCalcFunction,
        handleSetDisplayValue,
        handleSetStoredValue,
        handleToggleNegative,
        number,
        storedNumber,
        setNumber,
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
