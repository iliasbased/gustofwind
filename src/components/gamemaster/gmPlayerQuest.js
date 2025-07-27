import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle, getRandomBorderRightOnly } from "../../utilities/borderUtility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCheck, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function GMPlayerQuest({ quest, onRemoveQuest, onApproveQuest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [boxBorder, setBoxBorder] = useState({});
  const [deleteBorder, setDeleteBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorder());
    setBoxBorder(getRandomBorder());
    setDeleteBorder(getRandomBorderRightOnly());
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

    if (quest.failed) {
      icon = (
        <span style={{ color: "rgb(197, 97, 94)" }}>
          <FontAwesomeIcon icon={faXmark} size="xl"/>
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
    if (quest.failed) {
      return (
        <button className="quest-done" style={buttonBorder} disabled>
          Failed
        </button>
      );
    }

    if (quest.completed) {
      return (
        <button className="quest-done-completed" style={buttonBorder} disabled>
          Approved!
        </button>
      );
    } else {
      if (quest.proof_txt || quest.proof_img) {
        return (
          <button className="quest-done" style={buttonBorder} onClick={() => onApproveQuest(quest)}>
            Approve
          </button>
        );
      }
      return (
        <button className="quest-done" disabled style={buttonBorder}>
          Not Done
        </button>
      );
    }
  }

  let className = "gm-quest";
  if (quest.submitted) {
    className = "gm-quest-submitted";
  }
  if (quest.completed) {
    className = "gm-quest-completed";
  }

  if (quest.failed) {
    className = "gm-quest-failed";
  }

  return (
    <Row>
      <Col xs={11}>
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
      </Col>
      <Col xs={1} className="text-start align-self-center">
        {!quest.completed && !quest.submitted && !quest.failed ? (
          <button
            className="quest-remove-button"
            style={deleteBorder}
            onClick={() => onRemoveQuest(quest)}
          >
            <FontAwesomeIcon icon={faMinus} size="2xs" />
          </button>
        ) : null}
      </Col>
    </Row>
  );
}
