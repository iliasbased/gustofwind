import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Skill from "./skill";
import { height } from "@fortawesome/free-solid-svg-icons/faVolumeHigh";

export default function ItemBar({ skills }) {
  useEffect(() => {}, []);

  return (
    <Container className="item-bar">
      <Row>
        {skills.map((skill) => (
          <Col xs="auto" key={skill.name} className="p-0">
            <Skill skill={skill} style={{ width: "50px", height: "50px" }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
