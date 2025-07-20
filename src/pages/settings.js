import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { getRandomBorderSubtle } from "../utilities";
import { usePlayerGamemasters } from "../hooks/usePlayerGamemasters";
import { useHero } from "../context/heroContext";
import PlayerGamemaster from "../components/settings/playerGamemaster";
import PlayerGamemasterRequest from "../components/settings/playerGamemasterRequest";
import GMRemovePopup from "../components/settings/gmRemovePopup";
import { acceptGamemasterRequest, declineGamemasterRequest } from "../services/accountService";

export default function Settings() {
  const { hero } = useHero();
  const { gamemasters, requests, refreshGamemasters } = usePlayerGamemasters(hero.id);
  const [borderStyle, setBorderStyle] = useState({});
  const [removingGM, setRemovingGM] = useState(null);

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  function onRemove(gamemaster) {
    setRemovingGM(gamemaster);
  }

  function closePopup(refresh) {
    setRemovingGM(null);

    if (refresh) {
      refreshGamemasters();
    }
  }

  async function onAccept(request) {
    await acceptGamemasterRequest(request.id);
    refreshGamemasters();
  }

  async function onDecline(request) {
    await declineGamemasterRequest(request.id);
    refreshGamemasters();
  }

  return (
    <SFadeInOut>
      <GMRemovePopup gamemaster={removingGM} closePopup={closePopup} />
      <Container>
        <Row
          className="justify-content-center engraved mb-5"
          style={{ paddingTop: "120px", fontSize: "40px" }}
        >
          S e t t i n g s
        </Row>
        <Row>
          <Col></Col>
          <Col className="mt-5 mb-2 engraved" style={{ fontSize: "24px", marginLeft: "90px" }}>
            My Gamemasters
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Container className="hero-container p-1" style={{ height: "430px", ...borderStyle }}>
            <Row className="justify-content-center w-100 h-100 gm-players-container">
              <Col className="align-self-start">
                {gamemasters.length == 0 && requests.length == 0 ? (
                  <Row className="mt-3 justify-content-center" style={{ fontFamily: "Calibri", color: "#dbdbdb" }}>
                    You have no gamemasters or requests.
                  </Row>
                ) : null}
                {gamemasters.map((gm) => (
                  <Row key={gm.id} className="p-2">
                    <PlayerGamemaster gamemaster={gm} onRemove={onRemove} />
                  </Row>
                ))}
                {requests.map((req) => (
                  <Row key={req.id} className="p-2">
                    <PlayerGamemasterRequest
                      request={req}
                      onAccept={onAccept}
                      onDecline={onDecline}
                    />
                  </Row>
                ))}
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
