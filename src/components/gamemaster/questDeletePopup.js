import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities";
import { deleteQuest } from "../../services/questService";

export default function QuestDeletePopup({ quest, closePopup }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorderSubtle());

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

  const handleDelete = async () => {
    await deleteQuest(quest.id);
    closePopup(true);
  };

  return (
    <>
      <div
        className="popup-overlay"
        onClick={() => {
          closePopup(false);
        }}
      />
      <Container className="hero-creation-popup p-3" style={{ height: "250px", ...borderStyle }}>
        <Row className="px-3 justify-content-center mb-4 engraved" style={{ fontSize: "30px" }}>
          {`<< ${quest.name} >>`}
        </Row>
        <Row
          className="mt-2 px-3 mb-3 justify-content-center engraved"
          style={{ fontFamily: "Calibri", fontSize: "20px" }}
        >
          Are you sure you want to permanently delete this quest?
        </Row>
        <Row className="mt-5 px-3 justify-content-center">
          <Col>
            <Row className="justify-content-center">
              <button
                className="quest-done"
                style={{ width: "200px", ...buttonBorder }}
                onClick={handleDelete}
              >
                Destroy it!
              </button>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <button
                className="quest-done"
                style={{ width: "200px", ...buttonBorder }}
                onClick={closePopup}
              >
                Nevermind!
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
