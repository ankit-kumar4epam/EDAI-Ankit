import React from "react";
import "./css/RedInputBtn.css";
interface InputProps {
  value: string;
  type?: "submit" | "button";
}
const RedInputBtn: React.FC<InputProps> = ({ value, type = "button" }) => {
  return (
    <>
      <button id="redBtnSubmit" type={type}>
        {value}
      </button>
    </>
  );
};

export default RedInputBtn;
