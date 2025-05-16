import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CharacterPortait from "../components/combat/character-portait";
import CombatLog from "../components/combat/combat-log";
import Loot from "../components/combat/loot";

export default function Combat() {
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
      damage: 5,
    },
    {
      name: "Orc",
      currentHealth: 50,
      maxHealth: 80,
      damage: 10,
    },
    {
      name: "Troll",
      currentHealth: 120,
      maxHealth: 120,
      damage: 15,
    },
  ]);
  const [player, setPlayer] = useState({
    name: "Norewind",
    currentHealth: 200,
    maxHealth: 200,
    damage: 200,
  });
  const [combatText, setCombatText] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);

  useEffect(() => {
    setCombatText([<p>{`You engage combat against ${enemies[0].name}`}</p>]);
  }, []);

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
