import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import SButton from "../components/button";
import SFadeInOut from "../layouts/fade-in-out";
import SCentered from "../layouts/centered";
import { Container, Row, Col } from "react-bootstrap";
import GButton from "../components/button";
import getRandomBorder, {
  getRandomBorderSubtle,
  getRandomBorderSubtleLeftSide,
} from "../utilities";
import HeroSelectionButton from "../components/hero/heroSelectButton";
import GMCreationPopup from "../components/gamemaster/gmCreationPopup";
import { useAccountGamemasters } from "../hooks/useAccountGamemasters";
import GMSelectButton from "../components/gamemaster/gmSelectButton";
import GMDeletionPopup from "../components/gamemaster/gmDeletionPopup";
import { useGamemaster } from "../context/gmContext";
import HeroSelectButton from "../components/hero/heroSelectButton";
import PlayerSearch from "../components/gamemaster/playerSearch";
import { useHero } from "../context/heroContext";

export default function GMPlayers() {
  const { gamemaster, selectGMPlayer } = useGamemaster();
  const { clearHero } = useHero();

  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [deletingGM, setDeletingGM] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
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
            <Row className="justify-content-center engraved mb-4" style={{ fontSize: "40px" }}>
              {gamemaster.name}'s Players
            </Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <Row>
          <PlayerSearch />
        </Row>
        <Row className="justify-content-end ">
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row
              className="justify-content-end px-5 mx-3 engraved"
              style={{ fontSize: "25px", fontFamily: "Garamond", fontWeight: "bold" }}
            >{`${gamemaster.players.length}/5`}</Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container className="hero-container p-1" style={{height:'360px', ...borderStyle}}>
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
