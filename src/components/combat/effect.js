import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";

export default function Effect({ effect }) {
  useEffect(() => {}, []);

  return <Image className={effect.isBuff ? "buff" : "debuff"} src={effect.icon} alt={effect.name} />;
}
