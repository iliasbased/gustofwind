import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SFadeInOut from "../layouts/fade-in-out";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle, getRandomBorderSubtleLeftSide } from "../utilities/borderUtility";
import GMCreationPopup from "../components/gamemaster/gmCreationPopup";
import GMDeletionPopup from "../components/gamemaster/gmDeletionPopup";
import { useGamemaster } from "../context/gmContext";
import HeroSelectButton from "../components/hero/heroSelectButton";
import PlayerSearch from "../components/gamemaster/playerSearch";
import { useHero } from "../context/heroContext";

export default function GMPlayers() {
  const { gamemaster, selectGMPlayer, refreshGMPlayers } = useGamemaster();
  const { clearHero } = useHero();

  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [deletingGM, setDeletingGM] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshGMPlayers();
    clearHero();
    if (gamemaster.players.length > 3) {
      setBorderStyle(getRandomBorderSubtleLeftSide());
    } else {
      setBorderStyle(getRandomBorderSubtle());
    }
  }, []);

  function closePopup() {
    setShowCreationPopup(false);
    setDeletingGM(null);
  }

  function refresh() {
    // refreshPlayers();
  }

  function onSelectHero(hero) {
    selectGMPlayer(hero);
    setNextPage("/gmplayer");
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
            <Row className="justify-content-center engraved mb-5" style={{ fontSize: "40px" }}>
              {gamemaster.name}'s Players
            </Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <Row className="mb-4">
          <PlayerSearch />
        </Row>
      </Container>
      <Container className="hero-container p-1" style={{ height: "450px", ...borderStyle }}>
        <Row className="justify-content-center w-100 h-100 gm-players-container">
          <Col className="align-self-start">
            {gamemaster.players.map((hero, index) => (
              <Row key={index} className="m-1 mt-3">
                <HeroSelectButton hero={hero} onSelectHero={onSelectHero} />
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
