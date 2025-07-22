import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import Skill from "./skill";

export default function ItemBar({ skills }) {
  useEffect(() => {}, []);

  return (
    <Container className="item-bar">
      {skills.map((skill) => (
        <Row key={skill.name} className="p-0">
          <Col>
            <Skill effect={skill} style={{width: '50px'}}/>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
