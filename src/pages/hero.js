import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import SButton from "../components/button";
import SFadeInOut from "../layouts/fade-in-out";
import SCentered from "../layouts/centered";
import { Container, Row, Col } from "react-bootstrap";
import GButton from "../components/button";
import getRandomBorder, { getRandomBorderSubtle } from "../utilities";
import HeroSelectionButton from "../components/hero/heroSelectButton";
import HeroCreationPopup from "../components/hero/heroCreationPopup";
import { useAccountPlayers } from "../hooks/useAccountPlayers";
import HeroDeletionPopup from "../components/hero/heroDeletionPopup";

export default function HeroSelection() {
  const { players, refreshPlayers } = useAccountPlayers();
  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [deletingHero, setDeletingHero] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, [players]);

  function closePopup() {
    setShowCreationPopup(false);
    setDeletingHero(null);
  }

  function refresh() {
    refreshPlayers();
  }

  function onDelete(hero) {
    setDeletingHero(hero);
  }

  function onSelectHero(hero) {
    sessionStorage.setItem("selectedHero", JSON.stringify(hero));
    setNextPage("/character");
  }

  return (
    <SFadeInOut
      onFadeOutEnd={() => {
        navigate(nextPage);
      }}
      fadeOut={nextPage != ""}
    >
      <HeroCreationPopup showPopup={showCreationPopup} closePopup={closePopup} refresh={refresh} />
      <HeroDeletionPopup hero={deletingHero} closePopup={closePopup} refresh={refresh} />
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
              style={{ fontSize: "25px", fontFamily: "Garamond", fontWeight: "bold" }}
            >{`${players.length}/3`}</Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container className="hero-container p-1" style={borderStyle}>
        <Row className="justify-content-center w-100 h-100">
          <Col className="align-self-start">
            {players.map((hero, index) => (
              <Row key={index} className="m-1 mt-3">
                <HeroSelectionButton hero={hero} onDelete={onDelete} onSelectHero={onSelectHero} />
              </Row>
            ))}
            <Row className="m-1 mt-2">
              <button
                className={
                  players.length >= 3 ? "hero-create-button-disabled" : "hero-create-button"
                }
                style={borderStyle}
                disabled={players.length >= 3}
                onClick={() => {
                  setShowCreationPopup(true);
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
