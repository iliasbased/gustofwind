import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import { getRandomBorderSubtle } from "../../utilities";

export default function ResourceBar({ current, max, isHP, isAlly }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  let percentage = Math.min((current / max) * 100, 100);
  if (percentage < 0) {
    percentage = 0;
  }

  const fillStyle = {
    height: "40px",
    width: `${percentage}%`,
  };

  const textStyle = {
    height: "40px",
    fontFamily: "Impact",
    fontSize: "22px",
  };

  function getClassName() {
    if (isHP) {
      return isAlly ? "hp-bar-fill-ally" : "hp-bar-fill-enemy";
    }
    return "mana-bar-fill";
  }

  return (
    <Container className="resource-bar mb-1" style={borderStyle}>
      <Row className={`m-0 ${getClassName()}`} style={{ ...borderStyle, ...fillStyle }}>
        <Col className="p-0"></Col>
      </Row>
      <Row 
        className="m-0 position-absolute w-100" 
        style={{ ...textStyle, top: 0, left: 0 }}
      >
        <Col style={{ paddingRight: '5px'}} className="d-flex align-items-center justify-content-end engraved">
          {current} / {max}
        </Col>
      </Row>
    </Container>
  );
}
