import React from "react";
import { AlertCustom } from "./type";
import { AlertSVG } from "./AlertSVG";

const AlertBox = ({ alert }: { alert: AlertCustom }) => {
  const { type, heading, message } = alert;

  const selectedSvg = AlertSVG[type];
  const alertClass = `${type}-alert`;

  return (
    <div className={alertClass}>
      <div id={`${type}-check`} className="alert-icon">
        {selectedSvg} {/* Display corresponding SVG */}
      </div>
      <div id={`${type}-box`} className="alert-content">
        <div id={`${type}-heading`} className="alert-heading">
          {heading} {/* Display alert heading */}
        </div>
        <div id={`${type}-message`} className="alert-message">
          {message} {/* Display alert message */}
        </div>
      </div>
      <div id={`${type}-cross`} className="alert-close">
        <button
          aria-label="Dismiss Alert"
          style={{
            background: "none",
            border: "none",
            padding: "0",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={() => console.log("Alert dismissed")}
        >
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
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
