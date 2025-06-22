import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import getRandomBorder, { getRandomBorderLeftOnly } from "../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons/faVolumeHigh";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderLeftOnly());
  }, []);

  let current = 0;
  let max = 100;
  let percentage = Math.min((current / max) * 100, 100) - 1.3;
  if (percentage < 0) {
    percentage = 0;
  }

  return (
    <Container className="menu engraved" style={borderStyle}>
      <Row className="justify-content-end">
        <Image
          src={`/assets/images/items/base/cog.png`}
          className="menu-icon mt-1 mb-1 px-0 mx-0"
        />
      </Row>

      <Row className="justify-content-end pe-2 menu-item" onClick={() => {
        navigate("/settings");
      }}>
        Settings
      </Row>
      <Row className="justify-content-end pe-2 menu-item" onClick={() => {
        navigate("/hero");
      }}>Heroes</Row>
      <Row className="justify-content-end pe-2 menu-item" onClick={() => {
        navigate("/gamemaster");
      }}>Gamemasters</Row>
      <Row className="justify-content-end pe-2 menu-item" onClick={() => {
        navigate("/login");
      }}>Logout</Row>
    </Container>
  );
}
