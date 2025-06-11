import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FadeInOut from "../layouts/fade-in-out";
import Adventure from "../components/tavern/adventure";
import AdventurePopup from "../components/tavern/adventurePopup";

export default function Tavern() {
  const [currentAdventure, setCurrentAdventure] = useState(null);
  let availableAdventures = [
    {
      id: 1,
      name: "Ice Kingdom",
      img: "/assets/images/adventures/ice_kingdom.png",
      description:
        "Once a thriving empire, now entombed in silence. Cracked towers and frozen battlements pierce the sky, their glory buried beneath centuries of ice. The wind howls through hollow halls, echoing the last breath of a kingdom long forgotten. Only frost endures.",
    },
    {
      id: 2,
      name: "Rotten Fairyland",
      img: "/assets/images/adventures/rotten_fairyland.png",
      description:
        "Once a realm of wonder, now twisted by decay. The air reeks of sweet rot, and the trees whisper with malice. Here, fairy tales fester—and nothing is as harmless as it seems.",
    },
  ];

  function closePopup() {
    setCurrentAdventure(null);
  }

  function onClickToEnter(adventure) {
    setCurrentAdventure(adventure);
  }

  return (
    <>
      <AdventurePopup adventure={currentAdventure} closePopup={closePopup} />
      <Container fluid className="tavern-bg">
        <Row className="h-100">
          <Col xs={5}></Col>
          <Col xs={2}>
            <Row className="justify-content-center fs-1 engraved" style={{ paddingTop: "120px" }}>
              T a v e r n
            </Row>
          </Col>
          <Col xs={5} className="adventures-bg ">
            <Container style={{ overflowY: "auto", height: "100%" }}>
              {availableAdventures.map((adventure) => (
                <Row
                  className="justify-content-end"
                  style={{ paddingTop: "30px" }}
                  key={"adventure" + adventure.id}
                >
                  <Adventure adventure={adventure} onClickToEnter={onClickToEnter} />
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
