import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { useStarterWeapons } from "../../hooks/useStarterWeapons";
import { createPlayer } from "../../services/accountService";
import { useGMQuests } from "../../hooks/useGMQuests";
import Quests from "../questlog/quests";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMQuest from "./gmQuest";

export default function GMQuests({ gamemaster, onSelectQuest }) {
  const { quests, loading, refreshQuests } = useGMQuests();

  const [borderStyle, setBorderStyle] = useState({});
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  return (
    <Container>
      <Row className="mb-2">
        <Col className="engraved" style={{ fontSize: "43px" }}>
          My Quests
        </Col>
        <Col></Col>
        <Col>
          <Row className="justify-content-end h-100">
            <button
              className="add-quest-button engraved"
              style={borderStyle}
              onClick={() => {
                //addquest
              }}
            >
              + New Quest
            </button>
          </Row>
        </Col>
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
            {quests.map((quest, index) => (
              <Row key={index} className="mt-2 mb-2 px-2">
                <Col className="me-3">
                  <GMQuest quest={quest} onSelectQuest={onSelectQuest} />
                </Col>
              </Row>
            ))}
          </PerfectScrollbar>
        </Container>
      </Row>
    </Container>
  );
}
