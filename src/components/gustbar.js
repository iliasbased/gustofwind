import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function GustBar() {
  let current = 30;
  let max = 100;
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <Container className="gust-bar engraved mt-1">
      <Row className="">
        <Col style={{ textAlign: "start", paddingLeft: "5px" }}>Gust</Col>
        <Col style={{ textAlign: "end", paddingRight: "5px" }}>
          {current} / {max}
        </Col>
      </Row>
      <Row className="gust-bar-wrapper">
        <Col className="gust-bar-fill" style={{ width: `${percentage}%`, flex: "none" }}>
        </Col>
      </Row>
    </Container>
  );
}
