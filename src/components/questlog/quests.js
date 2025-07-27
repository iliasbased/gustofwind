import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Quest from "./quest";
import {
  getRandomBorderSubtle,
  getRandomBorderSubtleLeftSide,
} from "../../utilities/borderUtility";
import QuestPopup from "./questPopup";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export default function Quests({ todaysQuests, dailyQuests, refreshQuests }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const [activeTab, setActiveTab] = useState([]);
  const [todayBorder, setTodayBorder] = useState({});
  const [dailyBorder, setDailyBorder] = useState({});
  const [listBorder, setListBorder] = useState({});

  useEffect(() => {
    setTodayBorder(getRandomBorderSubtle());
    setDailyBorder(getRandomBorderSubtle());
    setListBorder(
      todaysQuests.length > 4 ? getRandomBorderSubtleLeftSide() : getRandomBorderSubtle()
    );
    setActiveTab("today");
    setQuests(todaysQuests);
  }, [todaysQuests, dailyQuests]);

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
                activeTab == "daily" ? "quest-button-active engraved" : "quest-button engraved"
              }
              style={dailyBorder}
              onClick={() => {
                setActiveTab("daily");
                setQuests(dailyQuests);
              }}
            >
              Dailies
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
              {quests.length === 0 ? (
                <Row className="justify-content-center mt-3" style={{fontFamily: "Calibri", color: "#333"}}>
                  Lazy GM, no quests assigned yet.
                </Row>
              ) : (
                quests.map((quest, index) => (
                  <Row key={index} className="mt-2 mb-2 px-2">
                    <Col className="me-3">
                      <Quest quest={quest} onSelectQuest={onSelectQuest} />
                    </Col>
                  </Row>
                ))
              )}
            </PerfectScrollbar>
          </Col>
        </Row>
      </Container>
    </>
  );
}
