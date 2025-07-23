import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder from "../../utilities";
import { useAdventures } from "../../context/adventureContext";
import { useHero } from "../../context/heroContext";

export default function AdventurePopup({ adventure, closePopup }) {
  const { startAdventure } = useAdventures();
  const { hero } = useHero();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!adventure) {
    return null;
  }

  return (
    <>
      <div className="popup-overlay" onClick={closePopup}></div>
      <Container
        className="adventure-popup"
        style={{ backgroundImage: `url(${adventure.img})`, ...getRandomBorder() }}
      >
        <Row className="mt-5 ps-3 fs-1 justify-content-center engraved">{adventure.name}</Row>
        <Row className="mt-5 justify-content-center">
          <Col xs={4} className="d-flex justify-content-center">
            <button
              className="adventure-difficulty-button"
              style={{ backgroundColor: "#40c057", ...getRandomBorder() }}
              onClick={() => {
                startAdventure(adventure, 1, [hero.id]);
              }}
            >
              Easy
            </button>
          </Col>
          <Col xs={4} className="d-flex justify-content-center">
            <button
              className="adventure-difficulty-button"
              style={{ backgroundColor: "#ffd43b", ...getRandomBorder() }}
              onClick={() => {
                startAdventure(adventure, 2, [hero.id]);
              }}
            >
              Medium
            </button>
          </Col>
          <Col xs={4} className="d-flex justify-content-center">
            <button
              className="adventure-difficulty-button"
              style={{ backgroundColor: "#fa5252", ...getRandomBorder() }}
              onClick={() => {
                startAdventure(adventure, 3, [hero.id]);
              }}
            >
              Hard
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
