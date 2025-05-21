import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CharacterPortait from "../components/combat/character-portait";
import CombatLog from "../components/combat/combat-log";
import Loot from "../components/combat/loot";
import { usePlayerItems } from "../hooks/usePlayerItems";
import { usePlayerStats } from "../hooks/usePlayerStats";

export default function Combat() {
  let { playerItems } = usePlayerItems();
  let { secondaryStats } = usePlayerStats(playerItems);

  const loot = [
    {
      type: "common",
      chance: 1,
      loot: [
        { name: "Gold", amount: 10 },
        { name: "Potion", amount: 1 },
      ],
    },
    {
      type: "rare",
      chance: 0.3,
      loot: [
        { name: "Rare Gem", amount: 1 },
        { name: "Magic Potion", amount: 1 },
      ],
    },
    {
      type: "epic",
      chance: 0.2,
      loot: [
        { name: "Epic Sword", amount: 1 },
        { name: "Epic Shield", amount: 1 },
      ],
    },
  ];

  const [enemies, setEnemies] = useState([
    {
      name: "Goblin",
      currentHealth: 50,
      maxHealth: 50,
      minDamage: 5,
      maxDamage: 6,
    },
    {
      name: "Orc",
      currentHealth: 50,
      maxHealth: 80,
      minDamage: 10,
      maxDamage: 12,
    },
    {
      name: "Troll",
      currentHealth: 120,
      maxHealth: 120,
      minDamage: 15,
      maxDamage: 25,
    },
  ]);
  const [player, setPlayer] = useState({
    name: "Norewind",
    currentHealth: secondaryStats.find((stat) => stat.id === "max_hp").value,
    maxHealth: secondaryStats.find((stat) => stat.id === "max_hp").value,
    minDamage: secondaryStats.find((stat) => stat.id === "min_dmg").value,
    maxDamage: secondaryStats.find((stat) => stat.id === "max_dmg").value,
  });

  const [combatText, setCombatText] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);

  useEffect(() => {
    setPlayer({
      name: "Norewind",
      currentHealth: secondaryStats.find((stat) => stat.id === "max_hp").value,
      maxHealth: secondaryStats.find((stat) => stat.id === "max_hp").value,
      minDamage: secondaryStats.find((stat) => stat.id === "min_dmg").value,
      maxDamage: secondaryStats.find((stat) => stat.id === "max_dmg").value,
    });
    setCombatText([<p>{`You engage combat against ${enemies[0].name}`}</p>]);
  }, [secondaryStats]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={3}>
            <CharacterPortait character={player} />
          </Col>
          <Col xs={6}>
            <Container className="combat-log">
              <Row className="justify-content-center">
                <CombatLog
                  player={player}
                  setPlayer={setPlayer}
                  enemies={enemies}
                  setEnemies={setEnemies}
                  combatText={combatText}
                  setCombatText={setCombatText}
                  playerTurn={playerTurn}
                  setPlayerTurn={setPlayerTurn}
                />
              </Row>
            </Container>
          </Col>
          <Col xs={3}>
            {enemies.length > 0 ? (
              <CharacterPortait character={enemies[0]} />
            ) : (
              <Loot loot={loot} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
