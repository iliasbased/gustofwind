import getRandomBorder, { getRandomBorderSubtle } from "../../utilities";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import StatusCircle from "../statusCircle";

export default function GMPlayer({ player }) {
  useEffect(() => {}, []);

  return (
    <Container>
      <Row className="gm-player">
        <Col xs={1} className="align-self-center">
          <StatusCircle status={"online"} />
        </Col>
        <Col className="align-self-center">{player.name}</Col>
      </Row>
    </Container>
  );
}
