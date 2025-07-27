import { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function PlayerGamemaster({ request, onAccept, onDecline }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  function getNameStyle(name) {
    return { fontSize: "25px" };
  }

  return (
    <Container className="h-100 pt-3 player-gm-request" style={borderStyle}>
      <Row className="engraved h-100 justify-content-center mb-3" style={getNameStyle(request.name)}>
        {request.name}
        <span style={{ fontSize: "18px", fontFamily: "Calibri", width: "auto", marginTop: "7px", marginLeft: "-4px" }}>
          has requested to be your GM!
        </span>
      </Row>

      <Row className="mb-4">
        <Col>
          <Row className="justify-content-end me-1 mt-1">
            <button
              className="hero-deletion-yes"
              style={{ width: "150px", height: "50px" }}
              onClick={() => onAccept(request)}
            >
              Accept
            </button>
          </Row>
        </Col>
        <Col>
          <Row className="justify-content-start ms-1 mt-1">
            <button
              className="hero-deletion-no"
              style={{ width: "150px", height: "50px" }}
              onClick={() => onDecline(request)}
            >
              Decline
            </button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
