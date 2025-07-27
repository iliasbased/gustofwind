import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { submitQuestProof } from "../../services/questService";

export default function QuestPopup({ quest, closePopup }) {
  const [proofText, setProofText] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [textAreaBorder, setTextAreaBorder] = useState({});
  const [clearStyle, setClearStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorder());
    setButtonBorder(getRandomBorderSubtle());
    setTextAreaBorder(getRandomBorder());
    setClearStyle(getRandomBorder());
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closePopup(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!quest) {
    return null;
  }

  const handleSubmit = async () => {
    await submitQuestProof(quest.id, proofText, proofImage);
    closePopup(true);
  };

  return (
    <>
      <div className="popup-overlay" onClick={()=>{closePopup(false)}} />
      <Container className="quest-popup p-3" style={borderStyle}>
        <Row className="px-3 justify-content-left engraved" style={{ fontSize: "30px" }}>
          {quest.name}
        </Row>
        <Row
          className="mt-3 px-3 justify-content-left"
          style={{ fontSize: "15px", fontFamily: "Calibri" }}
        >
          {quest.description}
        </Row>
        <Row className="my-3 px-3">
          <hr />
        </Row>
        <Row className="my-4 px-3 justify-content-center " style={{ fontSize: "25px" }}>
          Proof of Completion:
        </Row>

        <Row className="mt-2 px-3 justify-content-center">
          <textarea
            className="quest-textarea"
            value={proofText}
            onChange={(e) => {
              setProofText(e.target.value);
            }}
            placeholder="Describe how you completed this quest..."
            style={clearStyle}
          />
        </Row>
        <Row className="my-4 px-3 justify-content-center " style={{ fontSize: "25px" }}>
          OR
        </Row>
        <Row className="mt-2 px-2 justify-content-center">
          <Col xs={7}>
            <Row className="justify-content-start">
              <input
                type="file"
                style={{ fontFamily: "Calibri", ...textAreaBorder }}
                accept="image/*"
                onChange={(e) => {
                  setProofImage(e.target.files[0]);
                }}
              />
            </Row>
          </Col>
          <Col xs={5} className="align-self-center">
            <Row className="justify-content-start pe-3">
              <button
                className="quest-clear"
                style={proofImage ? {opacity: 1, ...clearStyle} : {opacity: 0, ...clearStyle}}
                onClick={() => {
                  setProofImage(null);
                  const fileInput = document.querySelector('input[type="file"]');
                  if (fileInput) fileInput.value = "";
                }}
              >
                Clear
              </button>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5 px-3 justify-content-center">
          <button
            className="quest-done"
            style={{ width: "200px", ...buttonBorder }}
            disabled={!proofText && !proofImage}
            onClick={handleSubmit}
          >
            Send Letter
          </button>
        </Row>
      </Container>
    </>
  );
}
