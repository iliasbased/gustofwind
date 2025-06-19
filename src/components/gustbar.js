import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../utilities";

export default function GustBar() {
  const [borderStyle, setBorderStyle] = React.useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  let current = 0;
  let max = 100;
  let percentage = Math.min((current / max) * 100, 100) -1.3;
  if (percentage < 0) {
    percentage = 0;
  }

  return (
    <Container className="gust-bar mt-2">
      <Row className="justify-content-center">
        <Col xs={6} className="align-self-center mt-1">
          <Row className="gust-bar-wrapper" style={borderStyle}>
            <Col className="gust-bar-fill" style={{ width: `${percentage}%`, flex: "none", ...borderStyle }}></Col>
            <span className="dusty" style={{ position: "absolute", top:'-8%' }}>
              Gust
            </span>
            <span className="gust-bar-value">
              {current} / {max}
            </span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
