import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle, getRandomBorderSubtleLeftSide } from "../../utilities";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMPlayerQuest from "./gmPlayerQuest";

export default function GMPlayerQuests({ quests, player, onRemoveQuest, onApproveQuest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [activeTab, setActiveTab] = useState("today");
  const [availableGust, setAvailableGust] = useState(0);
  const [awardedGust, setAwardedGust] = useState(0);

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

    let available = 0;
    let awarded = 0;
    quests.forEach((quest) => {
      available += quest.reward;
      if (quest.completed) {
        awarded += quest.reward;
      }
    });
    setAvailableGust(available);
    setAwardedGust(awarded > 100 ? 100 : awarded);
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
        <Col className="gust-info align-self-center">
          <Row className="justify-content-end" style={{ alignItems: "center" }}>
            <Col xs={9}>
              <Row className="justify-content-end">{`Daily Gust Available:`}</Row>
            </Col>
            <Col className="gust-text">
              <Row className="justify-content-end">{`${availableGust}/100`}</Row>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col xs={9}>
              <Row className="justify-content-end">{`Daily Gust Awarded:`}</Row>
            </Col>
            <Col className="gust-text">
              <Row className="justify-content-end">{`${awardedGust}/100`}</Row>
            </Col>
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
            {selectedQuests.map((quest, index) => (
              <Row key={index} className="mt-2 mb-2 px-2">
                <Col className="me-3">
                  <GMPlayerQuest quest={quest} onRemoveQuest={onRemoveQuest} onApproveQuest={onApproveQuest}/>
                </Col>
              </Row>
            ))}
          </PerfectScrollbar>
        </Container>
      </Row>
    </Container>
  );
}
