import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";

export default function Quest({ quest }) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorder());
  }, []);

  return (
    <Container className="quest" style={borderStyle}>
      <Row>
        <Col xs={8}>
          <Row className="mb-2">
            <Col className="quest-name engraved">
              {quest.name}
            </Col>
          </Row>
          <Row >
            <Col className="quest-description engraved">
              {quest.description}
            </Col>
          </Row>
        </Col>
        <Col xs={4} className="text-end">
          <Row className="mb-1">
            <Col className="quest-reward engraved" >
              {quest.reward}  <span style={{fontFamily:"BeyondWonderland", fontSize:'22px', fontWeight:'500'}}>Gust</span>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <button className="quest-done" disabled={quest.completed} style={buttonBorder} >
                {quest.completed ? "Done!" : "Done?"}
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
