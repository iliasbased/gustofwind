import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "./heroPortrait";

export default function HeroSelectButton({ hero, onDelete, onSelectHero }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  function getNameStyle(name) {
    if (name.length >= 13) {
      return { fontSize: "35px" };
    } else if (name.length > 10) {
      return { fontSize: "40px" };
    }
    return {};
  }

  return (
    <button
      className="hero-select-button"
      style={borderStyle}
      onClick={() => {
        onSelectHero(hero);
      }}
    >
      <Container className="h-100 pt-2">
        <Row>
          <Col xs={4}>
            <HeroPortrait hero={hero} />
          </Col>
          <Col xs={5} className="ps-4">
            <Row className="hero-name engraved" style={getNameStyle(hero.name)}>{hero.name}</Row>
            <Row>
              <Container className="gust-bar ms-0 mt-2">
                <Row className="justify-content-center">
                  <Col xs={6} className="align-self-end w-100">
                    <Row className="gust-bar-wrapper" style={{ height: "10px", ...borderStyle }}>
                      <Col
                        className="gust-bar-fill"
                        style={{
                          width: `${hero.gust == 0 ? 0 : (hero.gust - 1.3)}%`,
                          flex: "none",
                          height: "6.5px",
                          ...borderStyle,
                        }}
                      ></Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Col>
          <Col xs={3}>
            <Row className="justify-content-end pe-0">
              <FontAwesomeIcon
                className="hero-delete-icon"
                icon={faTrash}
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(hero);
                }}
              />
            </Row>
            <Row className="h-100">
              <Col className="align-self-center engraved">
                lvl <b style={{ fontSize: "55px", fontFamily: "Impact" }}>{hero.level}</b>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </button>
  );
}
