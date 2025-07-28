import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Effect from "./effect";
import SFadeInOut from "../../layouts/fade-in-out";

export default function CombatLog({ log }) {
  useEffect(() => {}, []);

  return (
    <Container className="combat-log mt-5">
      {log.map((entry, index) => (
        // <SFadeInOut key={index}>
           <Row>
            <Col>{entry.text}</Col>
          </Row>
        // </SFadeInOut>
      ))}
    </Container>
  );
}
