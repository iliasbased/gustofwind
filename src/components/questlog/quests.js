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

export default function Quests() {
  let weeklyQuests = [
    {
      id: 1,
      name: "A kitchen's Tale",
      description: "Please do the dishes, clean the kitchen and take out the trash.",
      reward: 25,
      completed: false,
    },
    {
      id: 2,
      name: "Hungry kitties",
      description:
        "Go to the pet shop and pick up food for the cats and also some cat litter and some treats :)",
      reward: 35,
      completed: false,
    },
  ];
  let todayQuests = [
    {
      id: 1,
      name: "A Long Journey",
      description: "Got to breaking class in Lamprini with your 2001 Citroen Xsara.",
      reward: 25,
      completed: false,
      submitted: true,
      proof_text: "Dishes done, kitchen cleaned, trash taken out.",
      proof_img: "https://example.com/proof-image.jpg",
    },
    {
      id: 2,
      name: "Hungry kitties",
      description:
        "Go to the pet shop and pick up food for the cats and also some cat litter and some treats :)",
      reward: 35,
      completed: true,
    },
    {
      id: 1,
      name: "A kitchen's Tale",
      description: "Please do the dishes, clean the kitchen and take out the trash.",
      reward: 25,
      completed: false,
    },
    {
      id: 3,
      name: "Hungry kitties",
      description:
        "Go to the pet shop and pick up food for the cats and also some cat litter and some treats :)",
      reward: 35,
      completed: false,
    },
    {
      id: 4,
      name: "A kitchen's Tale",
      description: "Please do the dishes, clean the kitchen and take out the trash.",
      reward: 25,
      completed: false,
    },
    {
      id: 5,
      name: "Hungry kitties",
      description:
        "Go to the pet shop and pick up food for the cats and also some cat litter and some treats :)",
      reward: 35,
      completed: false,
    },
  ];
  const [currentQuest, setCurrentQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const [activeTab, setActiveTab] = useState([]);
  const [todayBorder, setTodayBorder] = useState({});
  const [weeklyBorder, setWeeklyBorder] = useState({});
  const [listBorder, setListBorder] = useState({});

  useEffect(() => {
    setTodayBorder(getRandomBorder());
    setWeeklyBorder(getRandomBorder());
    setListBorder(
      todayQuests.length > 4 ? getRandomBorderSubtleLeftSide() : getRandomBorderSubtle()
    );
    setActiveTab("today");
    setQuests(todayQuests);
  }, []);

  quests.sort((a, b) => {
    //submitted quest go to the bottom but above completed quests
    if (a.completed && !b.completed) return 1; // Completed quests go to the end
    if (!a.completed && b.completed) return -1; // Uncompleted quests stay at the top
    if (a.submitted && !b.submitted) return 1; // Submitted quests go to the end
    if (!a.submitted && b.submitted) return -1; // Unsubmitted quests stay at the top

    return 0; // Keep the order for quests with the same completion status
  });

  function closePopup() {
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
                setQuests(todayQuests);
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
                setQuests(weeklyQuests);
              }}
            >
              Weekly Quests
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
