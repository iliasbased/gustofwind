import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Effect from "./effect";

export default function CombatLog({ log }) {
  useEffect(() => {}, []);

  return (
    <Container className="combat-log mt-5">
      {log.map((entry, index) => (
        <Row key={index}>
          <Col>{entry}</Col>
        </Row>
      ))}
    </Container>
  );
}
