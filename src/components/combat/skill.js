import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";

export default function Skill({ effect, style }) {
  useEffect(() => {}, []);

  return (
    <Container className="skill-container">
      <Image className="skill" src={effect.icon} alt={effect.name} style={style} />
    </Container>
  );
}
