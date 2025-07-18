import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import GMPlayerStatus from "./gmPlayerStatus";

export default function GMSelectButton({ gamemaster, onDelete, onSelectGamemaster }) {
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
    <button
      className="gm-select-button"
      style={borderStyle}
      onClick={() => {
        onSelectGamemaster(gamemaster);
      }}
    >
      <Container className="h-100 pt-2">
        <Row className="h-100">
          <Col xs={7} className="ps-4 align-self-center">
            <Row className="gm-name engraved h-100 justify-content-center" style={getNameStyle(gamemaster.name)}>
              {gamemaster.name}
            </Row>
          </Col>
          <Col xs={5}>
            <Row className="justify-content-end pe-0">
              <FontAwesomeIcon
                className="hero-delete-icon"
                icon={faTrash}
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(gamemaster);
                }}
              />
            </Row>
            <Row className="h-100">
              <Col className="engraved">
                {gamemaster.players.length > 0 ? (
                  gamemaster.players.map((player) => (
                    <Row>
                      <GMPlayerStatus player={player} key={player.id} />
                    </Row>
                  ))
                ) : (
                  <Row>No players</Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </button>
  );
}
