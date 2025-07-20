import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder, {
  getRandomBorderSubtle,
  getRandomBorderSubtleLeftSide,
} from "../../utilities";
import PerfectScrollbar from "react-perfect-scrollbar";
import GMQuest from "./gmQuest";

export default function GMQuests({
  quests,
  onNewQuest,
  onEditQuest,
  onDeleteQuest,
  onAssignQuest,
}) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder1, setButtonBorder1] = useState({});
  const [buttonBorder2, setButtonBorder2] = useState({});
  const [filteredQuests, setFilteredQuests] = useState([]);
  const [sortType, setSortType] = useState("gust");

  useEffect(() => {
    if (quests.length > 4) {
      setBorderStyle(getRandomBorderSubtleLeftSide());
    } else {
      setBorderStyle(getRandomBorderSubtle());
    }

    setButtonBorder1(getRandomBorder());
    setButtonBorder2(getRandomBorder());

    setFilteredQuests(quests);
  }, [quests]);

  function filterQuests(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredQuests = quests.filter((quest) => quest.name.toLowerCase().includes(searchTerm));
    setFilteredQuests(filteredQuests);
  }

  function sortQuests(type) {
    if (sortType == type) {
      setFilteredQuests((prevQuests) => [...prevQuests].reverse());
      return;
    }

    if (type == "name") {
      setFilteredQuests((prevQuests) =>
        [...prevQuests].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    
    if (type == "gust") {
      setFilteredQuests((prevQuests) =>
        [...prevQuests].sort((a, b) => a.reward - b.reward)
      );
    }

    setSortType(type);
  }

  return (
    <Container>
      <Row className="mb-2">
        <Col> </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4} className="engraved" style={{ fontSize: "41px" }}>
          Quest List
        </Col>
        <Col xs={4}>
          <Row className="pt-3">
            <input
              type="text"
              className="quest-search-input"
              placeholder="Search quest..."
              onChange={filterQuests}
            />
          </Row>
        </Col>
        <Col xs={4}>
          <Row className="justify-content-end h-100">
            <button
              className="add-quest-button engraved"
              style={borderStyle}
              onClick={() => {
                onNewQuest();
              }}
            >
              <span style={{ fontFamily: "Impact", fontSize: "25px" }}>+</span> New Quest
            </button>
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
            {filteredQuests.map((quest, index) => (
              <Row key={index} className="mt-2 mb-2 px-2">
                <Col className="me-3" style={{ marginTop: "11px" }}>
                  <GMQuest
                    quest={quest}
                    onEditQuest={onEditQuest}
                    onDeleteQuest={onDeleteQuest}
                    onAssignQuest={onAssignQuest}
                  />
                </Col>
              </Row>
            ))}
          </PerfectScrollbar>
        </Container>
      </Row>
      <Row
        style={{ fontFamily: "Calibri", fontSize: "15px" }}
        className=" justify-content-end mt-2 engraved"
      >
        Sort by:
        <button
          className={`${sortType == "name" ? "sort-button-active" : "sort-button"} mx-2`}
          style={buttonBorder1}
          onClick={() => sortQuests("name")}
        >
          Name
        </button>
        <button
          className={`${sortType == "gust" ? "sort-button-active" : "sort-button"}`}
          style={buttonBorder2}
          onClick={() => sortQuests("gust")}
        >
          Gust
        </button>
      </Row>
    </Container>
  );
}
