import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import EnemyPortrait from "./enemyPortrait";
import ResourceBar from "./resourceBar";
import StatusBar from "./statusBar";

export default function Combatant({ combatant, isTargeted, onSelectTarget }) {
  if (!combatant) {
    return null;
  }

  console.log("Combatant:", combatant);

  const isEnemy = combatant.player_id == null;
  const isAlly = combatant.team_id == 0;

  /* combatant.status = {
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
  }; */

  let style = isAlly ? { outline: "2px solid #4caf50" } : { outline: "2px solid #ff4d4d" };
  if (!isTargeted) {
    style = {};
  }

  return (
    <Container style={{ width: "auto" }}>
      <Row>
        <Col xs={4} className="pe-5 mb-1">
          <Row className="justify-content-end">
            <div
              className={`${combatant.status === "dead" ? "target-button-dead" : "target-button"}`}
              >
              {isEnemy ? (
                <EnemyPortrait
                  enemy={combatant.info}
                  isDead={combatant.status === "dead"}
                  style={style}
                  onSelectTarget={onSelectTarget}
                />
              ) : (
                <HeroPortrait
                  hero={combatant.info}
                  style={style}
                  onSelectTarget={onSelectTarget}
                  isDead={combatant.status === "dead"}
                />
              )}
            </div>
          </Row>
        </Col>
        <Col xs={8}>
          <Row className="justify-content-start mt-1">
            <ResourceBar
              current={combatant.stats.find((stat) => stat.stat_id == "curr_hp").value}
              max={combatant.stats.find((stat) => stat.stat_id == "max_hp").value}
              isHP={true}
              isAlly={isAlly}
            />
          </Row>
          <Row className="justify-content-start">
            <ResourceBar
              current={combatant.stats.find((stat) => stat.stat_id == "curr_mp")?.value || 0}
              max={combatant.stats.find((stat) => stat.stat_id == "max_mp")?.value || 0}
              isHP={false}
              isAlly={isAlly}
            />
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-start">
        <StatusBar effects={combatant.status.buffs} />
      </Row>
      <Row className="justify-content-start">
        <StatusBar effects={combatant.status.debuffs} />
      </Row>
    </Container>
  );
}
