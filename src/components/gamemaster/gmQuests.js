import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle, getRandomBorderSubtleLeftSide } from "../../utilities";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMQuest from "./gmQuest";

export default function GMQuests({
  quests,
  onNewQuest,
  onEditQuest,
  onDeleteQuest,
  onAssignQuest,
}) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    if (quests.length > 4 ) {
      setBorderStyle(getRandomBorderSubtleLeftSide());
    } else {
      setBorderStyle(getRandomBorderSubtle());
    }
  }, [quests]);

  return (
    <Container>
      <Row className="mb-3">
        <Col className="engraved" style={{ fontSize: "41px" }}>
          My Quests
        </Col>
        <Col></Col>
        <Col>
          <Row className="justify-content-end h-100">
            <button
              className="add-quest-button engraved"
              style={borderStyle}
              onClick={() => {
                onNewQuest();
              }}
            >
              + New Quest
            </button>
          </Row>
        </Col>
      </Row>
      <Row>
        <Container
          className="gm-player-quests-container pe-0"
          style={{ height: "550px", ...borderStyle }}
        >
          <PerfectScrollbar
            className="perfect-scrollbar"
            options={{
              suppressScrollX: true,
            }}
          >
            {quests.map((quest, index) => (
              <Row key={index} className="mt-2 mb-2 px-2">
                <Col className="me-3">
                  <GMQuest
                    quest={quest}
                    onEditQuest={onEditQuest}
                    onDeleteQuest={onDeleteQuest}
                    onAssignQuest={onAssignQuest}
                  />
                </Col>
              </Row>
            ))}
          </PerfectScrollbar>
        </Container>
      </Row>
    </Container>
  );
}
