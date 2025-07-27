import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import HeroPortrait from "../hero/heroPortrait";
import EnemyPortrait from "./enemyPortrait";

export default function StartCombatPopup({ adventureLevel, showPopup, startCombat, team1 }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorderStyle, setButtonBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorderStyle(getRandomBorder());

    function handleKeyDown(e) {
      if (e.key === "Enter") {
        startCombat();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!showPopup) {
    return null;
  }

  return (
    <>
      <div
        className="popup-overlay-noexit"
        style={{ background: "rgb(0, 0, 0, 0.85)" }}
        onClick={() => {}}
      />
      <Container
        className="start-combat-popup p-3 engraved"
        style={{
          background: `url(${adventureLevel.img})  no-repeat left center fixed`,
          backgroundSize: "cover",
          ...borderStyle,
        }}
      >
        <Row>
          <Col className="d-flex justify-content-center pt-4">
            <h1>{adventureLevel.name}</h1>
          </Col>
        </Row>
        <Row className="px-5 py-4">
          <Col>
            <h5 style={{ fontFamily: "Calibri", lineHeight: "1.6" }}>
              {adventureLevel.description}
            </h5>
          </Col>
        </Row>
        <Row className="p-1">
          <Col className="d-flex justify-content-center">
            <h2>Enemies Encountered:</h2>
          </Col>
        </Row>
        <Row className="justify-content-center p-1">
          {team1.map((enemy, index) => (
            <Col xs={2} key={index} className="d-flex justify-content-center">
              {enemy.player_id ? (
                <HeroPortrait hero={enemy.info} />
              ) : (
                <EnemyPortrait enemy={enemy.info} />
              )}
            </Col>
          ))}
          {team1.map((enemy, index) => (
            <Col xs={2} key={index} className="d-flex justify-content-center">
              {enemy.player_id ? (
                <HeroPortrait hero={enemy.info} />
              ) : (
                <EnemyPortrait enemy={enemy.info} />
              )}
            </Col>
          ))}
          {team1.map((enemy, index) => (
            <Col xs={2} key={index} className="d-flex justify-content-center">
              {enemy.player_id ? (
                <HeroPortrait hero={enemy.info} />
              ) : (
                <EnemyPortrait enemy={enemy.info} />
              )}
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-5">
            <button
              className="start-combat-button engraved"
              style={buttonBorderStyle}
              onClick={startCombat}
            >
              Start Combat
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
