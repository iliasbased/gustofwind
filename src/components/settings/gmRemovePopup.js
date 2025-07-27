import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { removePlayerGamemaster } from "../../services/accountService";

export default function GMRemovePopup({ gamemaster, closePopup }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!gamemaster) {
    return null;
  }

  function exitPopup() {
    closePopup();
  }

  const handleAccept = async () => {
    await removePlayerGamemaster(gamemaster.id);
    closePopup(true);
  };

  const handleDecline = async () => {
    closePopup(false);
  };

  function getConfirmation() {
    return (
      <>
        <Row
          className="justify-content-center hero-creation-text engraved p-4 mb-2"
          style={{ fontSize: "30px", fontFamily: "Calibri" }}
        >
          Are you sure you want to remove{" "}
          <span style={{ fontFamily: "BeyondWonderland", width: "auto" }}>{gamemaster.name}</span>{" "}
          from your gamemasters? They won't be able to assign you quests anymore and you will lose
          all quests set by them.
        </Row>
        <Row>
          <Col className="text-center">
            <button
              className="hero-deletion-yes engraved p-3"
              style={{height:'70px',...borderStyle}}
              onClick={handleAccept}
            >
              Yes, free me
            </button>
          </Col>
          <Col className="text-center">
            <button
              className="hero-deletion-no engraved p-3"
              style={{height:'70px',...borderStyle}}
              onClick={handleDecline}
            >
              No, keep them
            </button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <div
        className="popup-overlay"
        style={{ background: "rgb(0, 0, 0, 0.85)" }}
        onClick={() => {
          exitPopup();
        }}
      />
      <Container className="hero-deletion-popup p-3" style={{ height: "370px", ...borderStyle }}>
        {getConfirmation()}
      </Container>
    </>
  );
}
