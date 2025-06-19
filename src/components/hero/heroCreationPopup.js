import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { useStarterWeapons } from "../../hooks/useStarterWeapons";
import HeroPortrait from "./heroPortrait";
import { createPlayer } from "../../services/accountService";

export default function HeroCreationPopup({ showPopup, closePopup, refresh }) {
  const { weapons } = useStarterWeapons();
  const [name, setName] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState(null);
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
    setCurrentStep(0);
    setName("");
    setSelectedWeapon(null);
    closePopup();
  }

  function getNameSelection() {
    return (
      <>
        <Row className="justify-content-center hero-creation-text mt-4 engraved">Hail hero,</Row>
        <Row className="justify-content-center hero-creation-text mt-2 engraved">
          what is your name?
        </Row>
        <Row className="justify-content-center mt-4">
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
                setCurrentStep(1);
              }}
            >
              Continue
            </button>
          </Col>
        </Row>
      </>
    );
  }

  function getWeaponSelection() {
    return (
      <>
        <Row className="justify-content-center hero-creation-text mt-4 engraved">{name}...</Row>
        <Row className="justify-content-center hero-creation-text mx-5 engraved">
          Your name sounds familiar, what's that in your hand?
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={6} className="text-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                className="hero-creation-dropdown engraved"
                style={borderStyle}
              >
                {selectedWeapon ? (
                  <div className="d-flex align-items-center">
                    <Image src={selectedWeapon.icon} width={20} height={20} className="me-2" />
                    {selectedWeapon.name}
                  </div>
                ) : (
                  "Select a weapon"
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="hero-creation-dropdown-menu">
                {weapons.map((weapon) => (
                  <Dropdown.Item
                    key={weapon.id}
                    onClick={() => setSelectedWeapon(weapon)}
                    className="hero-creation-dropdown-item"
                  >
                    <div className="d-flex align-items-center">
                      <Image src={weapon.icon} width={24} height={24} className="me-2" />
                      {weapon.name}
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={6} className="text-center">
            <button
              className="hero-creation-button engraved"
              style={borderStyle}
              disabled={!selectedWeapon}
              onClick={() => {
                setCurrentStep(2);
              }}
            >
              Continue
            </button>
          </Col>
        </Row>
      </>
    );
  }

  function getConfirmation() {
    return (
      <>
        <Row className="mx-5 mt-5">
          <Col xs={4} className="mt-4 pe-5">
            <Row>
              <HeroPortrait
                hero={{ name, weapon0: selectedWeapon.icon }}
                style={{ boxShadow: "rgba(255, 255, 255, 0.11) 0px 0px 15px" }}
              />
            </Row>
          </Col>
          <Col xs={8} className="mt-3">
            <Row
              className="justify-content-start hero-creation-text mt-4 engraved"
              style={{ fontSize: "50px" }}
            >
              {name}
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col className="text-center mt-3">
            <button
              className="hero-creation-button engraved"
              style={{ width: "340px", ...borderStyle }}
              onClick={async () => {
                await createPlayer(name, selectedWeapon.id);
                await refresh();
                exitPopup();
              }}
            >
              Create Hero
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
      <Container className="hero-creation-popup p-3" style={borderStyle}>
        {currentStep == 0 ? getNameSelection() : null}
        {currentStep == 1 ? getWeaponSelection() : null}
        {currentStep == 2 ? getConfirmation() : null}
      </Container>
    </>
  );
}
