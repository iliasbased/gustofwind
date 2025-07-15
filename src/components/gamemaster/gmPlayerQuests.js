import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { useStarterWeapons } from "../../hooks/useStarterWeapons";
import { createPlayer } from "../../services/accountService";
import { useQuests } from "../../hooks/useQuests";
import Quests from "../questlog/quests";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMPlayerQuest from "./gmPlayerQuest";

export default function GMPlayerQuests({ player, onSelectQuest }) {
  const { quests, loading, refreshQuests } = useQuests();

  const [borderStyle, setBorderStyle] = useState({});
  const [activeTab, setActiveTab] = useState("today");

  let selectedQuests =
    activeTab == "today"
      ? quests.filter((q) => q.repeatable == "0")
      : quests.filter((q) => q.repeatable == "1");

  selectedQuests = selectedQuests.sort((a, b) => {
    let aOrder = a.completed ? 3 : 2;
    let bOrder = b.completed ? 3 : 2;

    aOrder = a.submitted && !a.completed ? 1 : aOrder;
    bOrder = b.submitted && !b.completed ? 1 : bOrder;

    return aOrder - bOrder;
  });

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

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
              // setQuests(todaysQuests);
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
              // setQuests(dailyQuests);
            }}
          >
            Dailies
          </button>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Container
          className="gm-player-quests-container"
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
                  <GMPlayerQuest quest={quest} onSelectQuest={onSelectQuest} />
                </Col>
              </Row>
            ))}
          </PerfectScrollbar>
        </Container>
      </Row>
    </Container>
  );
}
