import React from "react";
import "./css/SuccessAlert.css";
interface SuccessAlerts {
  message?: string;
  description: string;
  id?: string;
}
const collapseSuccessAlert=()=>{

}
const SuccessAlert: React.FC<SuccessAlerts> = ({
  message = "Congratulations!",
  description,
  id,
}) => {
  return (
    <div id={id} className="success-alert">
      <div id="success-cross" onClick={collapseSuccessAlert}>
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.3999 6.91961L2.22925 10.099C2.02853 10.2982 1.77345 10.3979 1.46403 10.3979C1.15461 10.3979 0.89954 10.2982 0.698815 10.099C0.49954 9.89969 0.399902 9.64606 0.399902 9.33809C0.399902 9.03012 0.49954 8.7765 0.698815 8.57722L3.87816 5.39787L0.698815 2.2544C0.49954 2.05367 0.399902 1.7986 0.399902 1.48918C0.399902 1.17976 0.49954 0.924686 0.698815 0.723961C0.898091 0.524686 1.15171 0.425049 1.45968 0.425049C1.76766 0.425049 2.02128 0.524686 2.22055 0.723961L5.3999 3.90331L8.54338 0.723961C8.7441 0.524686 8.99918 0.425049 9.3086 0.425049C9.61802 0.425049 9.87309 0.524686 10.0738 0.723961C10.2912 0.941353 10.3999 1.19969 10.3999 1.49896C10.3999 1.79824 10.2912 2.04715 10.0738 2.2457L6.89447 5.39787L10.0738 8.56853C10.2731 8.76925 10.3727 9.02432 10.3727 9.33374C10.3727 9.64316 10.2731 9.89824 10.0738 10.099C9.85642 10.3164 9.59845 10.425 9.2999 10.425C9.00135 10.425 8.75207 10.3164 8.55207 10.099L5.3999 6.91961Z"
            fill="black"
          />
        </svg>
      </div>
      <div id="success-check">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM14.59 5.58L8 12.17L5.41 9.59L4 11L8 15L16 7L14.59 5.58Z"
            fill="#149E32"
          />
        </svg>
      </div>
      <div id="success-box">
        <div id="success-message">{message}</div>
        <div id="success-description">{description}</div>
      </div>
    </div>
  );
};

export default SuccessAlert;
