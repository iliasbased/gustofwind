import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { deletePlayer } from "../../services/accountService";

export default function GMDeletionPopup({ gamemaster, closePopup, refresh }) {
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [borderStyle, setBorderStyle] = useState({});
  const [textAreaBorder, setTextAreaBorder] = useState({});

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

  if (!gamemaster) {
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
    setCurrentStep(0);
    setName("");
    closePopup();
  }

  const deleteDisabled = name.toLowerCase() !== gamemaster.name.toLowerCase();

  function getDelete() {
    return (
      <>
        <Row className="justify-content-center hero-creation-text mt-4 px-5 engraved">
          Type your name below to erase yourself.
        </Row>
        <Row className="justify-content-center mt-4">
          <input
            type="text"
            className="hero-deletion-input"
            placeholder="Nooo!"
            value={name}
            onChange={handleInput}
            style={textAreaBorder}
          />
        </Row>
        <Row>
          <Col className="text-center mt-5">
            <button
              className={`${
                deleteDisabled ? "hero-deletion-delete-disabled" : "hero-deletion-delete"
              } engraved`}
              style={borderStyle}
              disabled={deleteDisabled}
              onClick={async () => {
                // await deletePlayer(hero.id);
                refresh();
                exitPopup();
              }}
            >
              Delete GM
            </button>
          </Col>
        </Row>
      </>
    );
  }

  function getConfirmation() {
    return (
      <>
        <Row className="justify-content-center hero-creation-text mt-5 engraved">
          Are you sure you want to delete {gamemaster.name}? All your quests will be deleted.

        </Row>
        <Row>
          <Col className="text-center mt-5">
            <button
              className="hero-deletion-yes engraved p-3"
              style={borderStyle}
              onClick={() => {
                setCurrentStep(1);
              }}
            >
              Yes, wipe me from existence
            </button>
          </Col>
          <Col className="text-center mt-5">
            <button
              className="hero-deletion-no engraved p-3"
              style={borderStyle}
              onClick={() => {
                exitPopup();
              }}
            >
              No, I changed my mind
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
      <Container className="hero-deletion-popup p-3" style={{height:'460px', ...borderStyle}}>
        {currentStep == 0 ? getConfirmation() : null}
        {currentStep == 1 ? getDelete() : null}
      </Container>
    </>
  );
}
