import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Quest({ quest, onSelectQuest }) {
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
    if (!quest.completed && quest.submitted) {
      icon = (
        <span>
          <FontAwesomeIcon icon={faRotate} spin />
        </span>
      );
    }

    if (quest.completed) {
      icon = (
        <span style={{ color: "rgb(80, 219, 127)" }}>
          <FontAwesomeIcon icon={faCheck} size="xl" bounce />
        </span>
      );
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
      if (quest.proof_txt || quest.proof_img) {
        return (
          <button className="quest-done" style={buttonBorder}>
            Submitted
          </button>
        );
      }
      return (
        <button className="quest-done" style={buttonBorder} onClick={()=>onSelectQuest(quest)}>
          Done?
        </button>
      );
    }
  }

  let className = "quest";
  if (quest.submitted) {
    className = "quest-submitted";
  }
  if (quest.completed) {
    className = "quest-completed";
  }

  return (
    <>
      {getQuestBox()}
      <Container className={className} style={borderStyle}>
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
                  style={{ fontFamily: "BeyondWonderland", fontSize: "25px", fontWeight: "500" }}
                >
                  Gust
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>{getDoneButton()}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
