import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { PlayerDataContext } from "../../pages/character";
import getRandomBorder from "../../utilities";

export default function QuestPopup({ quest, closePopup }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closePopup();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!quest) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <Container className="quest-popup" >
        <Row className="mt-5 ps-3 fs-1 justify-content-left engraved">{quest.name}</Row>
        <Row className="mt-5 justify-content-center">
        </Row>
      </Container>
    </div>
  );
}
