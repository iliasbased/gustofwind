import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities/borderUtility";

export default function Effect({ effect }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  return (
    <Image
      className={effect.isBuff ? "buff" : "debuff"}
      src={effect.icon}
      alt={effect.name}
      style={borderStyle}
    />
  );
}
