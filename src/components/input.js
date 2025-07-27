import getRandomBorder from "../utilities/borderUtility";
import { useState, useEffect } from "react";

export default function SInput({  onChange, type, placeholder, style, className }) {
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    setInputStyle(getRandomBorder());
  }, []);

  return (
    <input
      type={type}
      className={`solidarity-input px-2 py-0 ${className}`}
      placeholder={placeholder}
      style={{...inputStyle, ...style}}
      onChange={(e)=>{onChange(e.target.value)}}
    />
  );
}
