import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { PlayerDataContext } from "../../pages/character";
import getRandomBorder from "../../utilities";

export default function AdventurePopup({ adventure, closePopup }) {
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
                //create a new combat row
                //move to combat page
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
                //create a new combat row
                //move to combat page
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
                //create a new combat row
                //move to combat page
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
