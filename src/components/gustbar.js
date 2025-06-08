import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function GustBar() {
  let current = 30;
  let max = 100;
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <Container className="gust-bar engraved mt-2">
      <Row>
        <Col xs={3} style={{ textAlign: "end" }}>
          Gust
        </Col>
        <Col xs={6} className="align-self-center mt-1">
          <Row className="gust-bar-wrapper">
            <Col className="gust-bar-fill" style={{ width: `${percentage}%`, flex: "none" }}></Col>
            <span className="gust-bar-value">{current} / {max}</span>
          </Row>
        </Col>
        <Col xs={3} style={{ textAlign: "start" }}>
        </Col>
      </Row>
    </Container>
  );
}
