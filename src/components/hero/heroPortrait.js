import { getRandomBorderTopOnlySubtle } from "../../utilities";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function HeroPortrait({ hero, style = {} }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderTopOnlySubtle());
  }, []);

  function getNameStyle(name, low, high) {
    if (name.length >= 15) {
      return { fontSize: "0.8rem" };
    } else if (name.length > 10) {
      return { fontSize: "0.9rem" };
    }
    return {};
  }

  return (
    <Container className="hero-portrait p-0" style={{ ...style, ...borderStyle }}>
      <Row
        className="hero-portrait-name dusty m-0"
        style={{ ...getNameStyle(hero.name), ...borderStyle }}
      >
        {hero.name}
      </Row>
      <Row className="hero-portrait-weapons m-0">
        {hero.weapon0 ? (
          <Col className="align-self-center px-2 text-center">
            <Image src={hero.weapon0} className="hero-portait-image" />
          </Col>
        ) : (
          ""
        )}
        {hero.weapon1 ? (
          <Col className="align-self-center px-2 text-center">
            <Image src={hero.weapon1} className="hero-portrait-image" />
          </Col>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}
