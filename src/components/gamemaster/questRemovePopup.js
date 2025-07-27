import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { removeQuest } from "../../services/questService";

export default function QuestRemovePopup({ quest, player, closePopup }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorderSubtle());

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closePopup(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quest]);

  if (!quest) {
    return null;
  }

  const handleRemove = async () => {
    await removeQuest(quest.id, player.id);
    closePopup(true);
  };

  return (
    <>
      <div
        className="popup-overlay"
        onClick={() => {
          closePopup(false);
        }}
      />
      <Container className="hero-creation-popup p-3" style={{ height: "280px", ...borderStyle }}>
        <Row className="px-3 justify-content-center mb-4 engraved" style={{ fontSize: "30px" }}>
          {`<< ${quest.name} >>`}
        </Row>
        <Row
          className="mt-2 px-3 mx-4 mb-3 justify-content-center engraved"
          style={{ fontFamily: "Calibri", fontSize: "20px" }}
        >
          Are you sure you want to remove this quest from
          <span
            className="w-auto pe-0"
            style={{ fontFamily: "BeyondWonderland", fontSize: "20px" }}
          >
            {player.name}
          </span>
          's {quest.repeatable ? "daily" : "current"} tasks?
        </Row>
        <Row className="mt-5 px-3 justify-content-center">
          <Col>
            <Row className="justify-content-center">
              <button
                className="quest-done"
                style={{ width: "200px", ...buttonBorder }}
                onClick={handleRemove}
              >
                Remove it!
              </button>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <button
                className="quest-done"
                style={{ width: "200px", ...buttonBorder }}
                onClick={closePopup}
              >
                Nevermind!
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
