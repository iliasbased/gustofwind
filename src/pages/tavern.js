import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FadeInOut from "../layouts/fade-in-out";
import Adventure from "../components/tavern/adventure";
import AdventurePopup from "../components/tavern/adventurePopup";
import { useAdventures } from "../context/adventureContext";

export default function Tavern() {
  const { adventures, getAdventures } = useAdventures();
  const [currentAdventure, setCurrentAdventure] = useState(null);

  useEffect(() => {
    getAdventures();
  }, []);
  
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
            <Row className="justify-content-center engraved" style={{ paddingTop: "120px", fontSize: '40px' }}>
              T a v e r n
            </Row>
          </Col>
          <Col xs={5} className="adventures-bg " style={{pointerEvents: "none"  }}>
            <Container style={{ overflowY: "auto", height: "100%" }}>
              {adventures.map((adventure) => (
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
