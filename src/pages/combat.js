import { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CombatLog from "../components/combat/combatLog";
import { useHero } from "../context/heroContext";
import HeroPortrait from "../components/hero/heroPortrait";
import Combatant from "../components/combat/combatant";
import SkillBar from "../components/combat/skillBar";
import ItemBar from "../components/combat/itemBar";
import Target from "../components/combat/target";
import { useAdventures } from "../context/adventureContext";
import EmptyCombatant from "../components/combat/emptyCombatant";
import EnemyPortrait from "../components/combat/enemyPortrait";
import StartCombatPopup from "../components/combat/startCombatPopup";
import { startCombat } from "../services/combatService";

export default function Combat() {
  const { hero } = useHero();
  const [myCombatant, setMyCombatant] = useState(null);
  const { combat, getActiveCombat, combatLog, isConnected, endTurn } = useAdventures();
  const [target, setTarget] = useState();
  const [turnCombatant, setTurnCombatant] = useState(null);

  const myCombatantRef = useRef(null);
  const turnCombatantRef = useRef(null);
  const targetRef = useRef(null);
  const combatRef = useRef(null);

  useEffect(() => {
    if (!combat) {
      getActiveCombat();
      return;
    }

    const currentTurn = combat.turn_index;
    const combatants = [...combat.team0, ...combat.team1];
    const combatant = combatants.find((c) => c.turn_order === currentTurn);
    const me = combatants.find((c) => c.player_id === hero.id);

    setTurnCombatant(combatant);
    setMyCombatant(me);

    turnCombatantRef.current = combatant;
    myCombatantRef.current = me;
    combatRef.current = combat;

    document.addEventListener("keydown", (e) => onKeyDown(e));

    return () => {
      document.removeEventListener("keydown", (e) => onKeyDown(e));
    };
  }, [combat]);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  function onKeyDown(e) {
    const currentTurnCombatant = turnCombatantRef.current;
    const currentMyCombatant = myCombatantRef.current;
    const currentTarget = targetRef.current;
    const currentCombat = combatRef.current;

    if (currentTurnCombatant && currentTurnCombatant.player_id !== hero.id) {
      return;
    }

    //TARGETING
    if (e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();

      const currentIndex = currentCombat.team1.findIndex((c) => c.id === currentTarget?.id);
      const direction = e.shiftKey ? -1 : 1;

      let nextIndex = (currentIndex + direction) % currentCombat.team1.length;
      if (nextIndex < 0) {
        nextIndex = currentCombat.team1.length - 1;
      }

      setTarget(currentCombat.team1[nextIndex]);
      return;
    }

    if (e.key === "Escape") {
      setTarget(null);
      return;
    }

    if (["F1", "F2", "F3", "F5", "F6", "F7"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    let allies = currentCombat.team0;
    let enemies = currentCombat.team1;

    allies.forEach((c, i) => {
      if (e.key === `F${i + 1}`) {
        setTarget(c);
        return;
      }
    });

    enemies.forEach((c, i) => {
      if (e.key === `F${i + 5}`) {
        setTarget(c);
        return;
      }
    });

    //SKILLS
    for (const skill of currentMyCombatant.skills) {
      if (e.key === skill.hotkey.toLowerCase()) {
        e.preventDefault();
        e.stopPropagation();

        attemptCast(skill);
        return;
      }
    }
  }

  function attemptCast(skill) {
    if (skill.cooldown > 0) {
      alert(`Skill ${skill.name} is on cooldown!`);
      return;
    }

    if (target) {
      // skill.castSkill(target);
    } else {
      alert("No target selected!");
      return;
    }

    endTurn({ type: "cast_skill", skill, targetId: target?.id, casterId: myCombatant.id });
    console.log(`Casting skill: ${skill.name} on target: ${target?.info.name || "No target"}`);
  }

  function onSelectTarget(selectedTarget) {
    setTarget(selectedTarget);
  }

  let log = [
    "Norewind attacks Goblin for 10 damage.",
    "Goblin attacks Norewind for 5 damage.",
    "Norewind heals for 8 health.",
    "Goblin is defeated.",
  ];

  function getTurnText() {
    return (
      <>
        <Col className="me-5">
          <Row className="justify-content-end engraved">
            <span style={{ marginRight: "5px", width: "auto" }}>It's</span>
            {turnCombatant.player_id ? (
              <HeroPortrait hero={turnCombatant.info} />
            ) : (
              <EnemyPortrait enemy={turnCombatant.info} />
            )}
            's Turn
          </Row>
        </Col>
        <Col className="ms-5">
          <Row className="justify-content-start">
            Time Left: <span style={{ fontFamily: "Impact", width: "auto" }}>120</span>
          </Row>
        </Col>
      </>
    );
  }

  function getAdventureName() {
    return (
      <Col className="pt-1">
        <Row className="justify-content-center">{combat.adventureLevel.name}</Row>
      </Col>
    );
  }

  async function attemptStartCombat() {
    await startCombat(combat.id);
    getActiveCombat();
  }

  if (!combat) {
    return (
      <Container className="combat-bg">
        <div className="text-center">
          <h3>Loading combat...</h3>
        </div>
      </Container>
    );
  }

  return (
    <>
      <StartCombatPopup
        showPopup={combat.turn_index == 0}
        adventureLevel={combat.adventureLevel}
        team1={combat.team1}
        startCombat={attemptStartCombat}
      />
      <Container
        className="combat-bg"
        style={{
          background: `url(${combat.adventureLevel.img}) no-repeat left center fixed`,
          backgroundSize: "cover",
        }}
      >
        <Row className="combat">
          <Col xs={3} style={{ marginTop: "120px" }}>
            <Row className="mb-5 justify-content-center">
              {combat.team0[1] ? (
                <Combatant
                  combatant={combat.team0[1]}
                  isTargeted={target == combat.team0[1]}
                  onSelectTarget={() => onSelectTarget(combat.team0[1])}
                />
              ) : (
                <EmptyCombatant />
              )}
            </Row>
            <Row className="mb-5 justify-content-center">
              {combat.team0[0] ? (
                <Combatant
                  combatant={combat.team0[0]}
                  isTargeted={target == combat.team0[0]}
                  onSelectTarget={() => onSelectTarget(combat.team0[0])}
                />
              ) : (
                <EmptyCombatant />
              )}
            </Row>
            <Row className="mb-5 justify-content-center">
              {combat.team0[2] ? (
                <Combatant
                  combatant={combat.team0[2]}
                  isTargeted={target == combat.team0[2]}
                  onSelectTarget={() => onSelectTarget(combat.team0[2])}
                />
              ) : (
                <EmptyCombatant />
              )}
            </Row>
          </Col>
          <Col xs={6}>
            <Row className="engraved" style={{ fontSize: "60px", height: "100px" }}>
              {combat.turn_index === 0 || !turnCombatant ? getAdventureName() : getTurnText()}
            </Row>
            <Row>
              <CombatLog log={log} />
            </Row>
            <Row className="mt-3">
              <Col xs={6}>
                <SkillBar skills={myCombatant?.skills} attemptCast={attemptCast} />
              </Col>
              <Col xs={2}>{/* <ItemBar skills={hero.itemSkills} /> */}</Col>
              <Col xs={4}>
                <Target target={target} />
              </Col>
            </Row>
          </Col>
          <Col xs={3} style={{ marginTop: "120px" }}>
            <Row className="mb-5 justify-content-center">
              {combat.team1[1] ? (
                <Combatant
                  combatant={combat.team1[1]}
                  isTargeted={target == combat.team1[1]}
                  onSelectTarget={() => onSelectTarget(combat.team1[1])}
                />
              ) : (
                <EmptyCombatant />
              )}
            </Row>
            <Row className="mb-5 justify-content-center">
              <Combatant
                combatant={combat.team1[0]}
                isTargeted={target == combat.team1[0]}
                onSelectTarget={() => onSelectTarget(combat.team1[0])}
              />
            </Row>
            <Row className="mb-5 justify-content-center">
              {combat.team1[2] ? (
                <Combatant
                  combatant={combat.team1[2]}
                  isTargeted={target == combat.team1[2]}
                  onSelectTarget={() => onSelectTarget(combat.team1[2])}
                />
              ) : (
                <EmptyCombatant />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
