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
import GMCreationPopup from "../components/gamemaster/gmCreationPopup";
import { useAccountGamemasters } from "../hooks/useAccountGamemasters";
import GMSelectButton from "../components/gamemaster/gmSelectButton";
import GMDeletionPopup from "../components/gamemaster/gmDeletionPopup";
import { useHero } from "../context/heroContext";
import { useGamemaster } from "../context/gmContext";

export default function GamemasterSelection() {
  const { gamemasters, refreshGamemasters } = useAccountGamemasters();
  const { clearHero } = useHero();
  const { selectGamemaster } = useGamemaster();

  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [deletingGM, setDeletingGM] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    clearHero();
  }, []);

  function closePopup() {
    setShowCreationPopup(false);
    setDeletingGM(null);
  }

  function refresh() {
    refreshGamemasters();
  }

  function onDelete(gamemaster) {
    setDeletingGM(gamemaster);
  }

  function onSelectGamemaster(gamemaster) {
    selectGamemaster(gamemaster);
    setNextPage("/gmplayers");
  }

  return (
    <SFadeInOut
      onFadeOutEnd={() => {
        navigate(nextPage);
      }}
      fadeOut={nextPage != ""}
    >
      <GMCreationPopup showPopup={showCreationPopup} closePopup={closePopup} refresh={refresh} />
      <GMDeletionPopup gamemaster={deletingGM} closePopup={closePopup} refresh={refresh} />
      <Container style={{ paddingTop: "200px" }}>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row className="justify-content-center engraved mb-4" style={{ fontSize: "40px" }}>
              Gamemasters
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
            >{`${gamemasters.length}/1`}</Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container className="gm-container p-1" style={borderStyle}>
        <Row className="justify-content-center w-100 h-100">
          <Col className="align-self-start">
            {gamemasters.map((gm, index) => (
              <Row key={index} className="m-1 mt-3">
                <GMSelectButton
                  gamemaster={gm}
                  onDelete={onDelete}
                  onSelectGamemaster={onSelectGamemaster}
                />
              </Row>
            ))}
            <Row className="m-1 mt-2">
              <button
                className={
                  gamemasters.length >= 1 ? "hero-create-button-disabled" : "hero-create-button"
                }
                style={borderStyle}
                disabled={gamemasters.length >= 1}
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
