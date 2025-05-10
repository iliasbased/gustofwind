import getRandomBorder from "../utilities";
import { useState, useEffect, useRef } from "react";

export default function SButton({ activateOnEnter, disabled, size, onClick, style, children }) {
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
      className={`solidarity-button solidarity-button-${size}`}
      style={{...buttonStyle, ...style}}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
