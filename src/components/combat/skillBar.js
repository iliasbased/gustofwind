import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Skill from "./skill";

export default function SkillBar({ skills, attemptCast }) {
  useEffect(() => {}, []);

  if (!skills || skills.length === 0) {
    return ( <div>No skills available</div>);
  }

  const skillSlots = [];
  for (let i = 0; i < 12; i++) {
    let skill = skills.find((skill) => skill.slot === i);
    if (skill) {
      skillSlots.push(
        <Skill
          key={"skill-" + i}
          skill={skill}
          imageStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
          attemptCast={attemptCast}
        />
      );
      continue;
    }

    skillSlots.push(<Skill key={"skill-" + i} isEmpty />);
  }

  return (
    <Container className="skill-bar">
      <Row>
        {skillSlots.map((slot, index) => (
          <Col xs="auto" key={index} className="p-0">
            {slot}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
