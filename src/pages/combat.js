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
import EndCombatPopup from "../components/combat/endCombatPopup";
import { useNavigate } from "react-router-dom";

export default function Combat() {
  const { hero } = useHero();
  const [myCombatant, setMyCombatant] = useState(null);
  const { combat, getActiveCombat, combatLog, endTurn, getLoot, acceptLoot } = useAdventures();
  const [target, setTarget] = useState();
  const [turnCombatant, setTurnCombatant] = useState(null);
  const [pressedSkill, setPressedSkill] = useState(null);
  const [noTargetAlert, setNoTargetAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(combat, 'combat');
    if (!combat || combat.error) {
      navigate("/tavern");
      return;
    }

    const currentTurn = combat.turn_index;
    const combatants = [...combat.team0, ...combat.team1];
    setTurnCombatant(combatants.find((c) => c.turn_order === currentTurn));
    setMyCombatant(combatants.find((c) => c.player_id === hero.id));
    const myTarget = combatants.find((c) => c.id === target?.id);
    if (myTarget?.status === "dead") {
      setTarget(null);
    }

    function onKeyDown(e) {
      const currentCombatants = [...combat.team0, ...combat.team1];
      const currentMe = currentCombatants.find((c) => c.player_id === hero.id);

      //TARGETING
      if (e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();

        const currentIndex = combat.team1
          .filter((c) => c.status !== "dead")
          .findIndex((c) => c.id === target?.id);
        const direction = e.shiftKey ? -1 : 1;

        let nextIndex = (currentIndex + direction) % combat.team1.length;
        if (nextIndex < 0) {
          nextIndex = combat.team1.length - 1;
        }

        const nextTarget = combat.team1.filter((c) => c.status !== "dead")[nextIndex];
        setTarget(nextTarget);
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

      let allies = combat.team0;
      let enemies = combat.team1;

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
      if (currentMe && currentMe.skills) {
        for (const skill of currentMe.skills) {
          if (e.key === skill.hotkey.toLowerCase()) {
            e.preventDefault();
            e.stopPropagation();

            attemptCast(skill);
            return;
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [combat, target]);

  function attemptCast(skill) {
    setPressedSkill(skill);
    setTimeout(() => setPressedSkill(null), 100);

    const currentCombatants = [...combat.team0, ...combat.team1];
    const currentTurnCombatant = currentCombatants.find((c) => c.turn_order === combat.turn_index);
    const currentMe = currentCombatants.find((c) => c.player_id === hero.id);

    if (currentTurnCombatant && currentTurnCombatant.player_id !== hero.id) {
      console.log("It's not your turn!");
      return;
    }

    if (skill.cooldown > 0) {
      alert(`Skill ${skill.name} is on cooldown!`);
      return;
    }

    if (!target && skill.target_type !== "none") {
      if (!noTargetAlert) {
        setNoTargetAlert(true);
        setTimeout(() => setNoTargetAlert(false), 500);
      }
      return;
    }

    endTurn({ type: "cast_skill", skill, targetId: target?.id, casterId: currentMe.id });
    console.log(`Casting skill: ${skill.name} on target: ${target?.info.name || "No target"}`);
  }

  function onSelectTarget(selectedTarget) {
    setTarget(selectedTarget);
  }

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

      <EndCombatPopup
        showPopup={combat.status == "finished"}
        adventureLevel={combat.adventureLevel}
        getLoot={getLoot}
        acceptLoot={acceptLoot}
        isVictory={combat.victory_team_id == myCombatant?.team_id}
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
                  isTargeted={target?.id == combat.team0[1]?.id}
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
                  isTargeted={target?.id == combat.team0[0]?.id}
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
                  isTargeted={target?.id == combat.team0[2]?.id}
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
              <CombatLog log={combatLog} />
            </Row>
            <Row className="mt-3">
              <Col xs={6}>
                <SkillBar
                  skills={myCombatant?.skills}
                  attemptCast={attemptCast}
                  pressedSkill={pressedSkill}
                />
              </Col>
              <Col xs={2}>{/* <ItemBar skills={hero.itemSkills} /> */}</Col>
              <Col xs={4}>
                <Target target={target} noTargetAlert={noTargetAlert} />
              </Col>
            </Row>
          </Col>
          <Col xs={3} style={{ marginTop: "120px" }}>
            <Row className="mb-5 justify-content-center">
              {combat.team1[1] ? (
                <Combatant
                  combatant={combat.team1[1]}
                  isTargeted={target?.id == combat.team1[1]?.id}
                  onSelectTarget={() => onSelectTarget(combat.team1[1])}
                />
              ) : (
                <EmptyCombatant />
              )}
            </Row>
            <Row className="mb-5 justify-content-center">
              <Combatant
                combatant={combat.team1[0]}
                isTargeted={target?.id == combat.team1[0]?.id}
                onSelectTarget={() => onSelectTarget(combat.team1[0])}
              />
            </Row>
            <Row className="mb-5 justify-content-center">
              {combat.team1[2] ? (
                <Combatant
                  combatant={combat.team1[2]}
                  isTargeted={target?.id == combat.team1[2]?.id}
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
