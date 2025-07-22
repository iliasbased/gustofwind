import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CharacterPortait from "../components/combat/character-portait";
import CombatLog from "../components/combat/combatLog";
import Loot from "../components/combat/loot";
import { usePlayerItems } from "../hooks/usePlayerItems";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { useHero } from "../context/heroContext";
import HeroPortrait from "../components/hero/heroPortrait";
import CombatParticipant from "../components/combat/combatParticipant";
import SkillBar from "../components/combat/skillBar";
import ItemBar from "../components/combat/itemBar";
import Target from "../components/combat/target";

export default function Combat() {
  const { hero } = useHero();
  useEffect(() => {}, []);

  let log = [
    "Norewind attacks Goblin for 10 damage.",
    "Goblin attacks Norewind for 5 damage.",
    "Norewind heals for 8 health.",
    "Goblin is defeated.",
  ];

  hero.skills = [
    {
      name: "Slash",
      description: "A quick slash with your sword.",
      cooldown: 0,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Shield Bash",
      description: "Bash the enemy with your shield.",
      cooldown: 2,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Heal",
      description: "Heal yourself or an ally.",
      cooldown: 3,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Slash",
      description: "A quick slash with your sword.",
      cooldown: 0,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Shield Bash",
      description: "Bash the enemy with your shield.",
      cooldown: 2,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Heal",
      description: "Heal yourself or an ally.",
      cooldown: 3,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Slash",
      description: "A quick slash with your sword.",
      cooldown: 0,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Shield Bash",
      description: "Bash the enemy with your shield.",
      cooldown: 2,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Heal",
      description: "Heal yourself or an ally.",
      cooldown: 3,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Slash",
      description: "A quick slash with your sword.",
      cooldown: 0,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Shield Bash",
      description: "Bash the enemy with your shield.",
      cooldown: 2,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Heal",
      description: "Heal yourself or an ally.",
      cooldown: 3,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Shield Bash",
      description: "Bash the enemy with your shield.",
      cooldown: 2,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
    {
      name: "Heal",
      description: "Heal yourself or an ally.",
      cooldown: 3,
      icon: "assets/images/skills/pyromancer/fireball.png",
    },
  ];

  hero.itemSkills = [
    {
      name: "Potion",
      description: "A healing potion that restores 50 health.",
      cooldown: 0,
      icon: "assets/images/items/base/potion_health.png",
    },
    {
      name: "Mana Potion",
      description: "A mana potion that restores 30 mana.",
      cooldown: 0,
      icon: "assets/images/items/base/potion_mana.png",
    },
  ]

  return (
    <Container className="combat-bg">
      <Row className="combat">
        <Col xs={3}>
          <Row className="mb-4 justify-content-end">
            <CombatParticipant participant={hero} isHero={true} isAlly={true} />
          </Row>
          <Row className="mb-4">
            <CombatParticipant participant={hero} isHero={true} isAlly={true} />
          </Row>
          <Row className="mb-4">
            <CombatParticipant participant={hero} isHero={true} isAlly={true} />
          </Row>
        </Col>
        <Col xs={6}>
          <Row className="engraved" style={{ fontSize: "60px" }}>
            <Col className="me-5">
              <Row className="justify-content-end engraved">
                It's
                <HeroPortrait hero={hero} style={{ marginLeft: "15px", marginRight: "5px" }} />
                's Turn
              </Row>
            </Col>
            <Col className="ms-5  ">
              <Row className="justify-content-start">
                Time Left: <span style={{ fontFamily: "Impact", width: "auto" }}>120</span>
              </Row>
            </Col>
          </Row>
          <Row>
            <CombatLog log={log} />
          </Row>
          <Row className="mt-3">
            <Col xs={6}>
              <SkillBar skills={hero.skills} />
            </Col>
            <Col xs={2}>
              <ItemBar skills={hero.itemSkills} />
            </Col>
            <Col xs={4}>
              <Target target={hero} isHero={true} isAlly={false} />
            </Col>
          </Row>
        </Col>
        <Col xs={3}>
          <Row className="mb-4">
            <CombatParticipant participant={hero} isHero={true} isAlly={false} />
          </Row>
          <Row className="mb-4">
            <CombatParticipant participant={hero} isHero={true} isAlly={false} />
          </Row>
          <Row className="mb-4">
            <CombatParticipant participant={hero} isHero={true} isAlly={false} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
