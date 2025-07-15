import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import getRandomBorder, { getRandomBorderSubtle, getRandomBorderLeftOnly } from "../../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function GMQuest({ quest, onSelectQuest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [boxBorder, setBoxBorder] = useState({});
  const [deleteBorder, setDeleteBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorder());
    setBoxBorder(getRandomBorder());
    setDeleteBorder(getRandomBorderLeftOnly());
  }, []);

  return (
    <Row>
      <Col xs={1} className="text-end align-self-center">
        <button className="quest-add-button" style={deleteBorder}>
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
                <Col>
                  <button
                    className="quest-done"
                    disabled
                    style={buttonBorder}
                    onClick={() => {
                      /* editQuest(quest) */
                    }}
                  >
                    Edit
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
