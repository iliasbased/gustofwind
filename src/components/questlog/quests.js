import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import Quest from "./quest";
import getRandomBorder, { getRandomBorderSubtle, getRandomBorderSubtleLeftSide } from "../../utilities";

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
  const [quests, setQuests] = useState([]);
  const [activeTab, setActiveTab] = useState([]);
  const [todayBorder, setTodayBorder] = useState({});
  const [weeklyBorder, setWeeklyBorder] = useState({});
  const [listBorder, setListBorder] = useState({});

  useEffect(() => {
    setTodayBorder(getRandomBorder());
    setWeeklyBorder(getRandomBorder());
    setListBorder(todayQuests.length > 4 ? getRandomBorderSubtleLeftSide() : getRandomBorderSubtle());
    setActiveTab("today");
    setQuests(todayQuests);
  }, []);

  return (
    <Container className="quests">
      <Row>
        <Col>
          <button
            className={activeTab == "today" ? "quest-button-active engraved" : "quest-button engraved"}
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
            className={activeTab == "week" ? "quest-button-active engraved" : "quest-button engraved"}
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
        <Col className="quest-list" style={listBorder}>
          {quests.map((quest, index) => (
            <Row key={index} className="mt-2 mb-2">
              <Col>
                <Quest quest={quest} />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
