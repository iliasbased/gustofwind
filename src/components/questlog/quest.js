import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";

export default function Quest({ quest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [boxBorder, setBoxBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorder());
    setBoxBorder(getRandomBorder());
  }, []);

  function getQuestBox() {
    let icon = "";
    if (!quest.completed && (quest.proof_text || quest.proof_img)) {
      icon = "↻";
    }

    if (quest.completed) {
      icon = "✔️";
    }

    return (
      <div className="quest-box" style={boxBorder}>
        {icon}
      </div>
    );
  }

  function getDoneButton() {
    if (quest.completed) {
      return (
        <button className="quest-done-completed" style={buttonBorder} disabled>
          Done!
        </button>
      );
    } else {
      if (quest.proof_text || quest.proof_img) {
        return (
          <button className="quest-done" style={buttonBorder} >
            Submitted
          </button>
        );
      }
      return (
        <button className="quest-done" style={buttonBorder}>
          Done?
        </button>
      );
    }
  }

  return (
    <>
      {getQuestBox()}
      <Container className={quest.completed ? "quest-completed" : "quest"} style={borderStyle}>
        <Row>
          <Col xs={8}>
            <Row className="mb-2">
              <Col className="quest-name engraved">{quest.name}</Col>
            </Row>
            <Row>
              <Col className="quest-description engraved">{quest.description}</Col>
            </Row>
          </Col>
          <Col xs={4} className="text-end">
            <Row className="mb-1">
              <Col className={`quest-reward engraved ${quest.completed ? "strike-through" : ""}`}>
                {quest.reward} {" "}
                <span
                  style={{ fontFamily: "BeyondWonderland", fontSize: "22px", fontWeight: "500" }}
                >
                  Gust
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                {getDoneButton()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
