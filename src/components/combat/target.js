import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import EnemyPortrait from "./enemyPortrait";

export default function Target({ target }) {
  useEffect(() => {}, []);

  if (!target) {
    return (
      <Container>
        <Row className="justify-content-center engraved mb-3" style={{ fontSize: "30px" }}>
          You are targeting:
        </Row>
      </Container>
    );
  }

  const isEnemy = target.player_id == null;
  const isAlly = target.team_id == 0;

  return (
    <Container>
      <Row className="justify-content-center engraved mb-3" style={{ fontSize: "30px" }}>
        You are targeting:
      </Row>
      <Row className="justify-content-center">
        {isEnemy ? (
          <EnemyPortrait
            enemy={target.info}
            style={isAlly ? { outline: "2px solid #4caf50" } : { outline: "2px solid #ff4d4d" }}
          />
        ) : (
          <HeroPortrait
            hero={target.info}
            isTargeted
            style={isAlly ? { outline: "2px solid #4caf50" } : { outline: "2px solid #ff4d4d" }}
          />
        )}
      </Row>
    </Container>
  );
}
