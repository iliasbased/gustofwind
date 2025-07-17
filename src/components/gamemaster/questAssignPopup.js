import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities";
import { assignQuest } from "../../services/questService";

export default function QuestAssignPopup({ quest, player, closePopup }) {
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

  const handleAssign = async (isDaily) => {
    await assignQuest(quest.id, player.id, isDaily);
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
      <Container className="hero-creation-popup p-3" style={{ height: "350px", ...borderStyle }}>
        <Row className="px-3 justify-content-center mb-4 engraved" style={{ fontSize: "30px" }}>
          {`<< ${quest.name} >>`}
        </Row>
        <Row
          className="mt-2 px-3 mb-3 justify-content-center engraved"
          style={{ fontFamily: "Calibri", fontSize: "20px" }}
        >
          Do you want to add this quest to{" "}
          <span
            className="w-auto pe-0"
            style={{ fontFamily: "BeyondWonderland", fontSize: "20px" }}
          >
            {player.name}
          </span>
          's today's tasks?
        </Row>
        <Row
          className="mt-2 px-3 mb-3 justify-content-center engraved"
          style={{ fontFamily: "Calibri", fontSize: "25px" }}
        >
          OR
        </Row>
        <Row
          className="mt-2 px-3 mb-3 justify-content-center engraved"
          style={{ fontFamily: "Calibri", fontSize: "20px" }}
        >
          Assign it as a repeatable daily task for them?
        </Row>
        <Row className="mt-5 px-3 justify-content-center">
          <Col>
            <Row className="justify-content-center">
              <button
                className="quest-done"
                style={{ width: "200px", ...buttonBorder }}
                onClick={()=>handleAssign(false)}
              >
                Add to Today
              </button>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <button
                className="quest-done"
                style={{ width: "200px", ...buttonBorder }}
                onClick={()=>handleAssign(true)}
              >
                Assign Daily
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
