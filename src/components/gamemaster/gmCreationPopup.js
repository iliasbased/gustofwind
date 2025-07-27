import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useStarterWeapons } from "../../hooks/useStarterWeapons";
import { createPlayer } from "../../services/accountService";

export default function GMCreationPopup({ showPopup, closePopup, refresh }) {
  const [name, setName] = useState("");
  const [borderStyle, setBorderStyle] = useState({});
  const [textAreaBorder, setTextAreaBorder] = useState({});

  function createGamemaster() {
    
  }

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setTextAreaBorder(getRandomBorder());

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        exitPopup();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!showPopup) {
    return null;
  }

  const handleInput = (e) => {
    let value = e.target.value;

    // Filter: only letters, numbers, underscores, hyphens
    value = value.replace(/[^a-zA-Z]/g, "");

    // Limit length
    value = value.substring(0, 20);

    setName(value);
  };

  function exitPopup() {
    setName("");
    closePopup();
  }

  function getNameSelection() {
    return (
      <>
        <Row className="justify-content-center hero-creation-text mt-4 engraved">
          Give youself a name, gamemaster.
        </Row>
        <Row className="justify-content-center mt-5">
          <input
            type="text"
            className="hero-creation-input"
            placeholder="my name is..."
            value={name}
            onChange={handleInput}
            style={textAreaBorder}
          />
        </Row>
        <Row>
          <Col className="text-center mt-5">
            <button
              className="hero-creation-button engraved"
              style={borderStyle}
              disabled={!name}
              onClick={() => {
                createGamemaster();
              }}
            >
              Invent Yourself
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
      <Container className="hero-creation-popup p-3" style={{height:'350px',...borderStyle}}>
        {getNameSelection()}
      </Container>
    </>
  );
}
