import getRandomBorder from "../utilities/borderUtility";
import { useState, useEffect, useRef } from "react";

export default function GButton({ activateOnEnter, disabled, size, onClick, style, children }) {
  const [buttonStyle, setButtonStyle] = useState({});
  const buttonRef = useRef(null);

  useEffect(() => {
    setButtonStyle(getRandomBorder());

    if (activateOnEnter) {
      document.addEventListener("keypress", onEnterPressed);
    }
  }, []);

  function onEnterPressed(e) {
    if (buttonRef.current.disabled) return;

    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
    <button
      ref={buttonRef}
      className={`gustofwind-button gustofwind-button-${size}`}
      style={{...buttonStyle, ...style}}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
