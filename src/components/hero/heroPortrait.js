import { getRandomBorderTopOnlySubtle } from "../../utilities";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function HeroPortrait({ hero, style = {} }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderTopOnlySubtle());
  }, []);

  function getNameStyle(name) {
    if (name.length >= 15) {
      return { fontSize: "0.7rem" };
    }

    return { fontSize: "1rem" };
  }

  return (
    <Container className="hero-portrait p-0 m-0" style={{ ...style, ...borderStyle }}>
      <Row
        className="hero-portrait-name dusty m-0"
        style={{ ...getNameStyle(hero.name), ...borderStyle }}
      >
        <Col className="align-self-center">
          <Row>{hero.name}</Row>
        </Col>
      </Row>
      <Row className="hero-portrait-weapons m-0">
        {hero.weapon0 && (
          <Col className="align-self-center px-1 text-center">
            <Row className="justify-content-center">
              <Image src={hero.weapon0} className="hero-portrait-image" />
            </Row>
          </Col>
        )}
        {hero.weapon1 && (
          <Col className="align-self-center px-1 text-center">
            <Row>
              <Image src={hero.weapon1} className="hero-portrait-image" />
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}
