import { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function EnemyPortrait({ enemy, onSelectTarget, isDead, style = {} }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  function getNameStyle(name) {
    if (name.length >= 15) {
      return { fontSize: "0.7rem" };
    }

    return { fontSize: "1rem" };
  }

  return (
    <Container
      className="enemy-portrait p-0 m-0"
      style={{ ...style, ...borderStyle }}
      onClick={isDead ? undefined : onSelectTarget}
    >
      <Row
        className="enemy-portrait-name dusty m-0"
        style={{ ...getNameStyle(enemy.name), ...borderStyle }}
      >
        <Col className="align-self-center">
          <Row>{enemy.name}</Row>
        </Col>
      </Row>
      <Row className="enemy-portrait-image-background m-0">
        <Image src={enemy.icon} className="enemy-portrait-image" />
      </Row>
    </Container>
  );
}
