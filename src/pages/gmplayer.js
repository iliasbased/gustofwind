import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SFadeInOut from "../layouts/fade-in-out";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle } from "../utilities";
import { useGamemaster } from "../context/gmContext";
import HeroPortrait from "../components/hero/heroPortrait";
import GMPlayerQuests from "../components/gamemaster/gmPlayerQuests";
import GMQuests from "../components/gamemaster/gmQuests";
import QuestCreatePopup from "../components/gamemaster/questCreatePopup";
import { useGMQuests } from "../hooks/useGMQuests";
import { usePlayerQuests } from "../hooks/usePlayerQuests";
import QuestEditPopup from "../components/gamemaster/questEditPopup";
import QuestDeletePopup from "../components/gamemaster/questDeletePopup";
import QuestAssignPopup from "../components/gamemaster/questAssignPopup";
import QuestRemovePopup from "../components/gamemaster/questRemovePopup";
import QuestApprovePopup from "../components/gamemaster/questApprovePopup";

export default function GMPlayer() {
  const { gmPlayer, refreshPlayer } = useGamemaster();
  const { playerQuests, refreshPlayerQuests } = usePlayerQuests(gmPlayer.id);
  const { gmQuests, refreshGmQuests } = useGMQuests();
  const [borderStyle, setBorderStyle] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [showCreateQuest, setShowCreateQuest] = useState(false);
  const [questEdited, setQuestEdited] = useState(null);
  const [questDeleted, setQuestDeleted] = useState(null);
  const [questAssigned, setQuestAssigned] = useState(null);
  const [questRemoved, setQuestRemoved] = useState(null);
  const [questApproved, setQuestApproved] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    refreshPlayer(gmPlayer.id);
  }, []);

  function onNewQuest() {
    setShowCreateQuest(true);
  }

  function onEditQuest(quest) {
    setQuestEdited(quest);
  }

  function onDeleteQuest(quest) {
    setQuestDeleted(quest);
  }

  function onAssignQuest(quest) {
    setQuestAssigned(quest);
  }

  function onRemoveQuest(quest) {
    setQuestRemoved(quest);
  }

  function onApproveQuest(quest) {
    setQuestApproved(quest);
  }

  function closePopup(refresh = false) {
    setShowCreateQuest(false);
    setQuestEdited(null);
    setQuestDeleted(null);
    setQuestAssigned(null);
    setQuestRemoved(null);
    setQuestApproved(null);

    if (refresh) {
      refreshPlayerQuests();
      refreshGmQuests();
    }
  }

  return (
    <Container fluid className="questlog-bg">
      <SFadeInOut
        onFadeOutEnd={() => {
          navigate(nextPage);
        }}
        fadeOut={nextPage != ""}
      >
        <QuestCreatePopup show={showCreateQuest} closePopup={closePopup} />
        <QuestEditPopup quest={questEdited} closePopup={closePopup} />
        <QuestDeletePopup quest={questDeleted} closePopup={closePopup} />
        <QuestAssignPopup quest={questAssigned} player={gmPlayer} closePopup={closePopup} />
        <QuestRemovePopup quest={questRemoved} player={gmPlayer} closePopup={closePopup} />
        <QuestApprovePopup quest={questApproved} player={gmPlayer} closePopup={closePopup} refreshPlayer={refreshPlayer}/>
        <Container className="mt-5 pt-5">
          <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
              <Container className="h-100 p-4 gm-player-container" style={borderStyle}>
                <Row>
                  <Col xs={4}>
                    <HeroPortrait hero={gmPlayer} />
                  </Col>
                  <Col xs={5} className="ps-4">
                    <Row className="hero-name engraved">{gmPlayer.name}</Row>
                    <Row>
                      <Container className="gust-bar ms-0 mt-2">
                        <Row className="justify-content-center">
                          <Col xs={6} className="align-self-end w-100">
                            <Row
                              className="gust-bar-wrapper"
                              style={{ height: "10px", ...borderStyle }}
                            >
                              <Col
                                className="gust-bar-fill"
                                style={{
                                  width: `${gmPlayer.gust == 0 ? 0 : gmPlayer.gust - 1.3}%`,
                                  flex: "none",
                                  height: "6.5px",
                                  ...borderStyle,
                                }}
                              ></Col>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </Row>
                  </Col>
                  <Col xs={3}>
                    <Row className="h-100">
                      <Col className="align-self-center engraved ps-5">
                        lvl{" "}
                        <b style={{ fontSize: "55px", fontFamily: "Impact" }}>{gmPlayer.level}</b>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs={4}></Col>
          </Row>
          <Row className="m-5">
            <Col>
              <GMPlayerQuests
                quests={playerQuests}
                player={gmPlayer}
                onRemoveQuest={onRemoveQuest}
                onApproveQuest={onApproveQuest}
              />
            </Col>
            <Col>
              <GMQuests
                quests={gmQuests}
                onNewQuest={onNewQuest}
                onEditQuest={onEditQuest}
                onDeleteQuest={onDeleteQuest}
                onAssignQuest={onAssignQuest}
              />
            </Col>
          </Row>
        </Container>
      </SFadeInOut>
    </Container>
  );
}
