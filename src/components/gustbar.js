import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder from "../utilities";

export default function GustBar() {
  const [borderStyle, setBorderStyle] = React.useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorder());
  }, []);

  let current = 30;
  let max = 100;
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <Container className="gust-bar mt-2">
      <Row>
        <Col xs={3} className="dusty" style={{ textAlign: "end" }}>
          Gust
        </Col>
        <Col xs={6} className="align-self-center mt-1">
          <Row className="gust-bar-wrapper" style={borderStyle}>
            <Col className="gust-bar-fill" style={{ width: `${percentage}%`, flex: "none", ...borderStyle }}></Col>
            <span className="gust-bar-value">
              {current} / {max}
            </span>
          </Row>
        </Col>
        <Col xs={3} style={{ textAlign: "start" }}></Col>
      </Row>
    </Container>
  );
}
