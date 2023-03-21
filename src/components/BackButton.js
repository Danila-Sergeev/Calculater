import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";

const BackButton = () => {
  const { handleBackButton } = useContext(NumberContext);
  return (
    <button type="button" onClick={() => handleBackButton()}>
      Back
    </button>
  );
};

export default BackButton;
