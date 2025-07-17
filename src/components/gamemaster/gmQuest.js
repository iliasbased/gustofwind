import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle, getRandomBorderLeftOnly } from "../../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function GMQuest({ quest, onEditQuest, onDeleteQuest, onAssignQuest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [deleteBorder, setDeleteBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorder());
    setDeleteBorder(getRandomBorderLeftOnly());
  }, []);

  return (
    <Row>
      <Col xs={1} className="text-end align-self-center">
        <button
          className="quest-add-button"
          style={deleteBorder}
          onClick={() => onAssignQuest(quest)}
        >
          <FontAwesomeIcon icon={faPlus} size="2xs" />
        </button>
      </Col>
      <Col xs={11}>
        <Container className="gm-quest" style={borderStyle}>
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
                <Col className={`quest-reward engraved`}>
                  {quest.reward} {" "}
                  <span
                    style={{ fontFamily: "BeyondWonderland", fontSize: "25px", fontWeight: "500" }}
                  >
                    Gust
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className=" pe-0">
                  <button
                    className="quest-done"
                    style={buttonBorder}
                    onClick={() => {
                      onEditQuest(quest);
                    }}
                  >
                    Edit
                  </button>
                </Col>
                <Col className="ps-0">
                  <button
                    className="quest-done-trash"
                    style={buttonBorder}
                    onClick={() => {
                      onDeleteQuest(quest);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} size="xs" />
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
