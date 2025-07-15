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
import BackButton from "../components/backButton";
import HeroPortrait from "../components/hero/heroPortrait";
import GMPlayerQuests from "../components/gamemaster/gmPlayerQuests";
import GMQuests from "../components/gamemaster/gmQuests";

export default function GMPlayer() {
  const { gamemaster, gmPlayer } = useGamemaster();

  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [deletingGM, setDeletingGM] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  function closePopup() {
    setShowCreationPopup(false);
    setDeletingGM(null);
  }

  function refresh() {
    // refreshPlayers();
  }

  function onSelectHero(hero) {
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
          <Col xs={4}></Col>
          <Col xs={4}>
            <Container className="h-100 p-4 gm-player-container" style={borderStyle}>
              <Row>
                <Col xs={4}>
                  <HeroPortrait hero={gmPlayer} />
                </Col>
                <Col xs={5} className="ps-4">
                  <Row className="hero-name engraved">{gmPlayer.name}</Row>
                  <Row>
                    <Container className="gust-bar ms-0 mt-2">
                      <Row className="justify-content-center">
                        <Col xs={6} className="align-self-end w-100">
                          <Row
                            className="gust-bar-wrapper"
                            style={{ height: "10px", ...borderStyle }}
                          >
                            <Col
                              className="gust-bar-fill"
                              style={{
                                width: `${gmPlayer.gust == 0 ? 0 : gmPlayer.gust - 1.3}%`,
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
                  <Row className="h-100">
                    <Col className="align-self-center engraved ps-5">
                        lvl{" "}
                        <b style={{ fontSize: "55px", fontFamily: "Impact" }}>{gmPlayer.level}</b>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <Row className="m-5">
          <Col>
            <GMPlayerQuests player={gmPlayer}/>
          </Col>
          <Col>
            <GMQuests />
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
