import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle, getRandomBorderSubtleLeftSide } from "../../utilities";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMPlayerQuest from "./gmPlayerQuest";

export default function GMPlayerQuests({ quests, player, onRemoveQuest, onApproveQuest }) {
  const [selectedQuests, setSelectedQuests] = useState([]);
  const [borderStyle, setBorderStyle] = useState({});
  const [activeTab, setActiveTab] = useState("today");
  const [todayTab, setTodayTab] = useState("today");
  const [availableGust, setAvailableGust] = useState(0);
  const [awardedGust, setAwardedGust] = useState(0);

  function getSelectedQuests() {
    if (activeTab != "today") {
      return sortQuests(quests.daily);
    }

    if (todayTab == "yesterday") {
      return sortQuests(quests.yesterday);
    }

    if (todayTab == "tomorrow") {
      return sortQuests(quests.tomorrow);
    }

    return sortQuests(quests.today);
  }

  function sortQuests(quests) {
    if (!quests) {
      return [];
    }

    quests = quests.sort((a, b) => {
      let aOrder = a.completed ? 1 : 3;
      let bOrder = b.completed ? 1 : 3;

      aOrder = a.submitted && !a.completed ? 2 : aOrder;
      bOrder = b.submitted && !b.completed ? 2 : bOrder;

      return aOrder - bOrder;
    });

    return quests;
  }

  function getDateText() {
    if (activeTab != "today") {
      return `${player.name}'s daily quests`;
    }

    if (todayTab == "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return `${player.name}'s quests yesterday - ` + yesterday.toLocaleDateString();
    }

    if (todayTab == "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return `${player.name}'s quests for tomorrow - ` + tomorrow.toLocaleDateString();
    }

    const today = new Date();
    return `${player.name}'s quests for today - ` + today.toLocaleDateString();
  }

  useEffect(() => {
    if (selectedQuests.length > 3) {
      setBorderStyle(getRandomBorderSubtleLeftSide());
    } else {
      setBorderStyle(getRandomBorderSubtle());
    }
  }, []);

  useEffect(() => {
    setSelectedQuests(getSelectedQuests());

    let available = 0;
    let awarded = 0;
    selectedQuests.today?.forEach((quest) => {
      available += quest.reward;
      if (quest.completed) {
        awarded += quest.reward;
      }
    });
    setAvailableGust(available);
    setAwardedGust(awarded > 100 ? 100 : awarded);
  }, [quests, activeTab, todayTab]);

  function getTodayClassName(tab) {
    if (activeTab != "today" || todayTab != tab) {
      return "day-button";
    }

    return "day-button-active";
  }

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <Row className="px-2">
            <Col className="mx-1">
              <Row className="justify-content-center">
                <button
                  className={getTodayClassName("yesterday")}
                  onClick={() => {
                    setActiveTab("today");
                    setTodayTab("yesterday");
                  }}
                  style={borderStyle}
                >
                  Yesterday
                </button>
              </Row>
            </Col>
            <Col className="mx-1">
              <Row className="justify-content-center">
                <button
                  className={getTodayClassName("today")}
                  onClick={() => {
                    setActiveTab("today");
                    setTodayTab("today");
                  }}
                  style={borderStyle}
                >
                  Today
                </button>
              </Row>
            </Col>
            <Col className="mx-1">
              <Row className="justify-content-center">
                <button
                  className={getTodayClassName("tomorrow")}
                  onClick={() => {
                    setActiveTab("today");
                    setTodayTab("tomorrow");
                  }}
                  style={borderStyle}
                >
                  Tomorrow
                </button>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
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
              <Row className="justify-content-end engraved">{`Gust Available Today:`}</Row>
            </Col>
            <Col className="gust-text">
              <Row className="justify-content-end">{`${availableGust}/100`}</Row>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col xs={9}>
              <Row className="justify-content-end engraved">{`Gust Awarded Today:`}</Row>
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
          style={{ height: "575px", ...borderStyle }}
        >
          <PerfectScrollbar
            className="perfect-scrollbar"
            options={{
              suppressScrollX: true,
            }}
          >
            {" "}
            {selectedQuests.length === 0 ? (
              <Row className="mt-3 justify-content-center" style={{ fontFamily: "Calibri" }}>
                No quests have been set here.
              </Row>
            ) : (
              selectedQuests.map((quest, index) => (
                <Row key={index} className="mt-2 mb-2 px-2">
                  <Col className="me-3">
                    <GMPlayerQuest
                      quest={quest}
                      onRemoveQuest={onRemoveQuest}
                      onApproveQuest={onApproveQuest}
                    />
                  </Col>
                </Row>
              ))
            )}
          </PerfectScrollbar>
        </Container>
      </Row>
      <Row
        className="justify-content-center mt-2 engraved"
        style={{ fontSize: "15px", fontFamily: "Calibri" }}
      >
        {getDateText()}
      </Row>
    </Container>
  );
}
