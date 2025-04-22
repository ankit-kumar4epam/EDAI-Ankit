import React from "react";
import "./css/SecInputBtn.css";
interface InputProps {
  value: string;
}
const SecInputBtn: React.FC<InputProps> = ({ value }) => {
  return (
    <>
      <button id="secBtnSubmit">{value}</button>
    </>
  );
};

export default SecInputBtn;
