import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import ResourceBar from "./resourceBar";
import StatusBar from "./statusBar";

export default function CombatParticipant({ participant, isHero, isAlly }) {

  participant.stats = participant.stats || {
    currentHealth: 50,
    maxHealth: 100,
    currentMana: 50,
    maxMana: 50,
  };

  participant.status = {
    buffs: [
      {
        name: "Healing Touch",
        duration: 3,
        icon: "/assets/images/effects/buffs/hot.png",
        isBuff: true,
      },
      {
        name: "Healing Touch",
        duration: 3,
        icon: "/assets/images/effects/buffs/hot.png",
        isBuff: true,
      },
      {
        name: "Healing Touch",
        duration: 3,
        icon: "/assets/images/effects/buffs/hot.png",
        isBuff: true,
      },
    ],
    debuffs: [
      {
        name: "Bite",
        duration: 2,
        icon: "/assets/images/effects/debuffs/bite.png",
        isBuff: false,
      },
      {
        name: "Bite",
        duration: 2,
        icon: "/assets/images/effects/debuffs/bite.png",
        isBuff: false,
      },
    ],
  };

  return (
    <Container className="combat-participant">
      <Row>
        <Col xs={4} className="pe-5 mb-1">
          <Row className="justify-content-end">
            <div className="target-button">
              {
                isHero ? (
                  <HeroPortrait hero={participant} />
                ) : null /* <EnemyPortrait enemy={participant} /> */
              }
            </div>
          </Row>
        </Col>
        <Col xs={8}>
          <Row className="justify-content-start mt-1">
            <ResourceBar
              current={participant.stats.currentHealth}
              max={participant.stats.maxHealth}
              isHP={true}
              isAlly={isAlly}
            />
          </Row>
          <Row className="justify-content-start">
            <ResourceBar
              current={participant.stats.currentMana}
              max={participant.stats.maxMana}
              isHP={false}
              isAlly={isAlly}
            />
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-start">
        <StatusBar effects={participant.status.buffs} />
      </Row>
      <Row className="justify-content-start">
        <StatusBar effects={participant.status.debuffs} />
      </Row>
    </Container>
  );
}
