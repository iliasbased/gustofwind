import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";

export default function ResourceBar({ current, max, isHP, isAlly }) {
  useEffect(() => {}, []);

  let percentage = Math.min((current / max) * 100, 100);
  if (percentage < 0) {
    percentage = 0;
  }

  const fillStyle = {
    height: "20px",
    width: `${percentage}%`,
  };

  const textStyle = {
    height: "20px",
    fontFamily: "Impact",
    fontSize: "14px",
  };

  function getClassName() {
    if (isHP) {
      return isAlly ? "hp-bar-fill-ally" : "hp-bar-fill-enemy";
    }
    return "mana-bar-fill";
  }

  return (
    <Container className="resource-bar position-relative">
      <Row className={`m-0 ${getClassName()}`} style={fillStyle}>
        <Col className="p-0"></Col>
      </Row>
      <Row 
        className="m-0 position-absolute w-100" 
        style={{ ...textStyle, top: 0, left: 0 }}
      >
        <Col style={{ paddingRight: '2px'}} className="d-flex align-items-center justify-content-end">
          {current} / {max}
        </Col>
      </Row>
    </Container>
  );
}
