import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { approveQuest } from "../../services/questService";

export default function QuestApprovePopup({ quest, player, closePopup, refreshPlayer }) {
  const [borderStyleLeft, setBorderStyleLeft] = useState({});
  const [borderStyleRight, setBorderStyleRight] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});

  useEffect(() => {
    setBorderStyleLeft(getRandomBorder());
    setBorderStyleRight(getRandomBorder());
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

  const handleApprove = async () => {
    await approveQuest(quest.id, player.id);
    refreshPlayer();
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
      <Container>
        <Row>
          <Col>
            <Container className="quest-popup-left p-3" style={borderStyleLeft}>
              <Row className="px-3 justify-content-center mb-4" style={{ fontSize: "35px" }}>
                {`<< ${quest.name} >>`}
              </Row>
              <Row
                className="mt-2 px-5 justify-content-center"
                style={{ flex: "1", fontSize: "17px", fontFamily: "Calibri" }}
              >
                {quest.description}
              </Row>
              <Row className="mt-4 px-3 justify-content-center" style={{ marginTop: "auto" }}>
                <Col>
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      fontSize: "20px",
                      fontFamily: "Calibri",
                      color: "#47c0f0",
                      textShadow: "0 0 5px rgba(103, 205, 245, 0.5)",
                    }}
                  >
                    Gust Reward:{" "}
                    <span style={{ fontFamily: "Impact", color: "#4d4242" }}>{quest.reward}</span>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <Container className="quest-popup-right p-3" style={borderStyleRight}>
              <Row className="px-3 justify-content-center mb-2" style={{ fontSize: "30px" }}>
                {`Proof of Completion`}
              </Row>
              <Row
                className="mt-2 px-5 mb-2 me-2 justify-content-center proof-text"
              >
                {quest.proof_txt}
              </Row>
              {quest.proof_img ? (
                <Row className="mt-2 px-3 justify-content-center">
                  <Image
                    src={"/assets/images/mithrilai.png"}
                    alt="Proof"
                    style={{ maxHeight: "270px", width: "auto" }}
                  />
                </Row>
              ) : null}
              <Row className="px-3 justify-content-center" style={{ marginTop: "auto" }}>
                <button
                  className="quest-approve"
                  style={buttonBorder}
                  onClick={handleApprove}
                >
                  Award Gust!
                </button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
