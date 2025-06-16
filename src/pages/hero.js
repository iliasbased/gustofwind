import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import SButton from "../components/button";
import SFadeInOut from "../layouts/fade-in-out";
import SCentered from "../layouts/centered";
import { Container, Row, Col } from "react-bootstrap";
import GButton from "../components/button";
import getRandomBorder, { getRandomBorderSubtle } from "../utilities";

export default function HeroSelection() {
  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const navigate = useNavigate();

  const heroes = [
    {
      name: "Norewind",
      level: "1",
      gust: "25",
      weapon0: "/assets/images/items/weapons/common/training_sword.png",
      weapon1: "/assets/images/items/weapons/common/training_sword.png",
    },
  ];

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  return (
    <SFadeInOut
      onFadeOutEnd={() => {
        navigate(nextPage);
      }}
      fadeOut={nextPage != ""}
    >
      <Container style={{ paddingTop: "200px" }}>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row className="justify-content-center engraved mb-4" style={{ fontSize: "40px" }}>
              Heroes
            </Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <Row className="justify-content-end ">
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row
              className="justify-content-end px-5 mx-3 engraved"
              style={{ fontSize: "35px", fontFamily: "Garamond", fontWeight: "bold" }}
            >{`${heroes.length}/3`}</Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container className="hero-container p-1" style={borderStyle}>
        <Row className="justify-content-center w-100 h-100">
          <Col className="align-self-start">
            {heroes.map((hero, index) => (
              <Row>
                <button
                  className="hero-select-button"
                  style={borderStyle}
                  onClick={() => {
                    setNextPage("/hero");
                  }}
                >
                  {hero.name}
                </button>
              </Row>
            ))}
            <Row>
              <button
                className="hero-create-button"
                style={borderStyle}
                onClick={() => {
                  setNextPage("/hero");
                }}
              >
                +
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
