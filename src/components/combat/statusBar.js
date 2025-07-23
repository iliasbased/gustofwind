import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Effect from "./effect";

export default function StatusBar({ effects }) {
  useEffect(() => {}, []);

  return (
    <Container className="status-bar">
      <Row>{effects.map(effect => (
        <Col xs="auto" key={effect.name} className="p-0">
          <Effect effect={effect}/>
        </Col>
      ))}</Row>
    </Container>
  );
}
