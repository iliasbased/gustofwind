import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle, getRandomBorderSubtleLeftSide } from "../../utilities";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMPlayerQuest from "./gmPlayerQuest";

export default function GMPlayerQuests({ quests, player, onRemoveQuest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [activeTab, setActiveTab] = useState("today");

  let selectedQuests =
    activeTab == "today"
      ? quests.filter((q) => q.repeatable == "0")
      : quests.filter((q) => q.repeatable == "1");

  selectedQuests = selectedQuests.sort((a, b) => {
    let aOrder = a.completed ? 1 : 3;
    let bOrder = b.completed ? 1 : 3;

    aOrder = a.submitted && !a.completed ? 2 : aOrder;
    bOrder = b.submitted && !b.completed ? 2 : bOrder;

    return aOrder - bOrder;
  });

  useEffect(() => {
    if (quests.length > 3) {
      setBorderStyle(getRandomBorderSubtleLeftSide());
    } else {
      setBorderStyle(getRandomBorderSubtle());
    }
  }, [quests]);

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <button
            className={
              activeTab == "today" ? "quest-button-active engraved" : "quest-button engraved"
            }
            style={borderStyle}
            onClick={() => {
              setActiveTab("today");
            }}
          >
            {`${player.name}'s Quests`}
          </button>
        </Col>
        <Col>
          <button
            className={
              activeTab == "daily" ? "quest-button-active engraved" : "quest-button engraved"
            }
            style={borderStyle}
            onClick={() => {
              setActiveTab("daily");
            }}
          >
            Dailies
          </button>
        </Col>
        <Col></Col>
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
            {selectedQuests.map((quest, index) => (
              <Row key={index} className="mt-2 mb-2 px-2">
                <Col className="me-3">
                  <GMPlayerQuest quest={quest} onRemoveQuest={onRemoveQuest} />
                </Col>
              </Row>
            ))}
          </PerfectScrollbar>
        </Container>
      </Row>
    </Container>
  );
}
