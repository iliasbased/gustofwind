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

export default function GMPlayer() {
  const { gamemaster, gmPlayer } = useGamemaster();

  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [deletingGM, setDeletingGM] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
      <Container>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
