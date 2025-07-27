import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities/borderUtility";

export default function Skill({ skill, style, imageStyle, isEmpty, attemptCast }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  if (isEmpty) {
    return <button className="empty-skill" style={{ ...style, ...borderStyle }}></button>;
  }

  return (
    <button
      className="skill"
      style={{ ...style, ...borderStyle }}
      onClick={() => attemptCast(skill)}
    >
      <Image style={{ ...imageStyle, ...borderStyle }} src={skill.icon} alt={skill.name} />
      <div className="hotkey">{skill.hotkey}</div>
    </button>
  );
}
