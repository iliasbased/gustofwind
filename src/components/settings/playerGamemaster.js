import { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function PlayerGamemaster({ gamemaster, onRemove }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
  }, []);

  function getNameStyle(name) {
    if (name.length >= 13) {
      return { fontSize: "35px" };
    } else if (name.length > 10) {
      return { fontSize: "40px" };
    }
    return {};
  }

  return (
    <Container className="h-100 pt-2 player-gm" style={borderStyle}>
      <Row className="h-100">
        <Col xs={11} className="ps-5 align-self-center">
          <Row
            className="gm-name engraved h-100 justify-content-center"
            style={getNameStyle(gamemaster.name)}
          >
            {gamemaster.name}
          </Row>
        </Col>
        <Col xs={1}>
          <Row className="justify-content-end me-1 mt-1">
            <FontAwesomeIcon
              className="hero-delete-icon"
              icon={faTrash}
              size="xs"
              onClick={() => {
                onRemove(gamemaster);
              }}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
