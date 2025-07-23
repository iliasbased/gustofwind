import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import ResourceBar from "./resourceBar";
import StatusBar from "./statusBar";

export default function Target({ target, isHero, isAlly }) {
  useEffect(() => {}, []);


  return (
    <Container>
      <Row className="justify-content-center engraved mb-3" style={{fontSize: "30px"}}>
        You are targeting:
      </Row>
      <Row className="justify-content-center">
        {
          isHero ? (
            <HeroPortrait hero={target} />
          ) : null /* <EnemyPortrait enemy={participant} /> */
        }
      </Row>
    </Container>
  );
}
