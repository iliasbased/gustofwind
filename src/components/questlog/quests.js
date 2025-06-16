import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import Quest from "./quest";
import getRandomBorder, {
  getRandomBorderSubtle,
  getRandomBorderSubtleLeftSide,
} from "../../utilities";
import QuestPopup from "./questPopup";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useQuests } from "../../hooks/useQuests";

export default function Quests({ todaysQuests, repeatableQuests, refreshQuests }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const [activeTab, setActiveTab] = useState([]);
  const [todayBorder, setTodayBorder] = useState({});
  const [weeklyBorder, setWeeklyBorder] = useState({});
  const [listBorder, setListBorder] = useState({});

  useEffect(() => {
    setTodayBorder(getRandomBorderSubtle());
    setWeeklyBorder(getRandomBorderSubtle());
    setListBorder(
      todaysQuests.length > 4 ? getRandomBorderSubtleLeftSide() : getRandomBorderSubtle()
    );
    setActiveTab("today");
    setQuests(todaysQuests);
  }, [todaysQuests, repeatableQuests]);

  function closePopup(refresh = false) {
    if (refresh) {
      refreshQuests();
    }
    setCurrentQuest(null);
  }

  function onSelectQuest(quest) {
    setCurrentQuest(quest);
  }

  return (
    <>
      <QuestPopup quest={currentQuest} closePopup={closePopup} />
      <Container className="quests">
        <Row>
          <Col>
            <button
              className={
                activeTab == "today" ? "quest-button-active engraved" : "quest-button engraved"
              }
              style={todayBorder}
              onClick={() => {
                setActiveTab("today");
                setQuests(todaysQuests);
              }}
            >
              Today's Quests
            </button>
          </Col>
          <Col>
            <button
              className={
                activeTab == "week" ? "quest-button-active engraved" : "quest-button engraved"
              }
              style={weeklyBorder}
              onClick={() => {
                setActiveTab("week");
                setQuests(repeatableQuests);
              }}
            >
              Repeatables
            </button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="quest-list pe-0" style={listBorder}>
            <PerfectScrollbar
              className="perfect-scrollbar"
              options={{
                suppressScrollX: true,
              }}
            >
              {quests.map((quest, index) => (
                <Row key={index} className="mt-2 mb-2 px-2">
                  <Col className="me-3">
                    <Quest quest={quest} onSelectQuest={onSelectQuest} />
                  </Col>
                </Row>
              ))}
            </PerfectScrollbar>
          </Col>
        </Row>
      </Container>
    </>
  );
}
