import { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function HeroPortrait({ hero, isEmpty, onSelectTarget, style = {} }) {
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

  if (isEmpty) {
    return (
      <Container
        className="hero-portrait empty-hero-portrait p-0 m-0"
        style={{ backgroundColor: "#474e5c", ...style, ...borderStyle }}
      ></Container>
    );
  }

  return (
    <Container
      className="hero-portrait p-0 m-0"
      style={{ ...style, ...borderStyle }}
      onClick={onSelectTarget}
    >
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
