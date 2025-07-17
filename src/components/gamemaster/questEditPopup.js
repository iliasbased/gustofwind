import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { editQuest } from "../../services/questService";

export default function QuestEditPopup({ quest, closePopup }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gust, setGust] = useState(5);
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [textAreaBorder, setTextAreaBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorder());
    setButtonBorder(getRandomBorderSubtle());
    setTextAreaBorder(getRandomBorderSubtle());
    setName(quest?.name);
    setDescription(quest?.description);
    setGust(quest?.reward);

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closePopup(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quest]);

  if (!quest) {
    return null;
  }

  const handleSubmit = async () => {
    await editQuest(quest.id, name, description, gust);
    closePopup(true);
  };

  const generateRangeLabels = (min, max, step) => {
    const labels = [];
    for (let i = min; i <= max; i += step) {
      labels.push(i);
    }
    return labels;
  };

  return (
    <>
      <div
        className="popup-overlay"
        onClick={() => {
          closePopup(false);
        }}
      />
      <Container className="quest-popup p-3" style={borderStyle}>
        <Row className="px-3 justify-content-center mb-4" style={{ fontSize: "30px" }}>
          {`<< ${quest.name} >>`}
        </Row>
        <Row className="mt-2 px-3 mb-3 justify-content-center">
          <textarea
            className="quest-textarea"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Quest Title..."
            style={{ height: "45px", fontSize: "25px", ...textAreaBorder }}
          />
        </Row>

        <Row className="mt-2 px-3 justify-content-center">
          <textarea
            className="quest-textarea"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            maxLength={300}
            placeholder="Add a description for your quest..."
            style={{ height: "150px", ...textAreaBorder }}
          />
        </Row>

        <Row className="mt-4 px-3 justify-content-center">
          <Col>
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "20px",
                fontFamily: "Calibri",
                color: "#47c0f0",
                textShadow: "0 0 5px rgba(103, 205, 245, 0.5)",
              }}
            >
              Gust Reward: <span style={{ fontFamily: "Impact", color: "#4d4242" }}>{gust}</span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="gust-slider"
                type="range"
                min="0"
                max="100"
                step="5"
                value={gust}
                onChange={(e) => {
                  setGust(e.target.value);
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                  marginTop: "5px",
                  fontFamily: "Impact",
                }}
              >
                {generateRangeLabels(0, 100, 100).map((value, index) => (
                  <span key={index} style={{ textAlign: "center", minWidth: "20px" }}>
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 px-3 justify-content-center">
          <button
            className="quest-done"
            style={{ width: "200px", ...buttonBorder }}
            disabled={!name && !description}
            onClick={handleSubmit}
          >
            Sign It!
          </button>
        </Row>
      </Container>
    </>
  );
}
