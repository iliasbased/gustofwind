import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import Loot from "./loot";
import { useNavigate } from "react-router-dom";

export default function EndCombatPopup({
  adventureLevel,
  showPopup,
  getLoot,
  acceptLoot,
  isVictory,
}) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorderStyle, setButtonBorderStyle] = useState({});
  const [loot, setLoot] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorderStyle(getRandomBorder());

    async function loadLoot() {
      if (isVictory && showPopup) {
        const lootData = await getLoot();
        setLoot(lootData);
      }
    }
    loadLoot();

    function handleKeyDown(e) {
      if (e.key === "Enter") {
        closePopup();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPopup, isVictory]);

  if (!showPopup) {
    return null;
  }

  async function closePopup() {
    if (isVictory) {
      await acceptLoot();
    }

    navigate("/tavern");
  }

  console.log("Loot in EndCombatPopup:", loot);

  return (
    <>
      <div
        className="popup-overlay-noexit"
        style={{ background: "rgb(0, 0, 0, 0.85)" }}
        onClick={() => {}}
      />
      <Container
        className="end-combat-popup p-3 engraved"
        style={{
          background: `url(${adventureLevel.img})  no-repeat left center fixed`,
          backgroundSize: "cover",
          ...borderStyle,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row>
          <Col className={`d-flex justify-content-center pt-4 ${isVictory ? "victory" : "defeat"}`}>
            {isVictory ? "Victory!" : "Defeat"}
          </Col>
        </Row>
        {isVictory && loot ? (
          <Row className="justify-content-center py-4">
            <Loot items={loot} />
          </Row>
        ) : (
          <Row className="px-5 py-4">
            <Col
              className="d-flex justify-content-center"
              style={{ fontSize: "20px", fontFamily: "Cinzel, serif", marginTop: "70px" }}
            >
              <span>Nothing to loot - head back to the tavern to recover.</span>
            </Col>
          </Row>
        )}
        <Row className="mt-auto">
          <Col className="d-flex justify-content-center pt-5">
            {isVictory ? (
              <button
                className="grab-loot-button engraved"
                style={buttonBorderStyle}
                onClick={closePopup}
              >
                Grab Loot
              </button>
            ) : (
              <button
                className="tavern-return-button engraved"
                style={buttonBorderStyle}
                onClick={closePopup}
              >
                Return to Tavern
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
