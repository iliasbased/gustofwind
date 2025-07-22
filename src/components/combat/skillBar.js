import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Skill from "./skill";

export default function SkillBar({ skills }) {
  useEffect(() => {}, []);

  return (
    <Container className="skill-bar">
      <Row>
        {skills.map((skill) => (
          <Col xs="auto" key={skill.name} className="p-0">
            <Skill effect={skill} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
