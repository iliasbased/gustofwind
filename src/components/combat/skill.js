import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities";

export default function Skill({ skill, style, imageStyle }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  return (
    <button className="skill" style={{ ...style, ...borderStyle }}>
      <Image
        style={{ ...imageStyle, ...borderStyle }}
        src={skill.icon}
        alt={skill.name}
      />
      <div className="hotkey">{skill.hotkey}</div>
    </button>
  );
}
