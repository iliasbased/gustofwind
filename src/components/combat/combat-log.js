import { useEffect, useState } from "react";

export default function CombatLog({
  player,
  setPlayer,
  enemies,
  setEnemies,
  combatText,
  setCombatText,
  playerTurn,
  setPlayerTurn,
}) {
  useEffect(() => {
    if (player.currentHealth <= 0) {
      setCombatText((prevLog) => [...prevLog, <p>{`YOU DIED!`}</p>]);
      return;
    }

    if (enemies.length === 0) {
      setCombatText((prevLog) => [...prevLog, <p>{`YOU WON!`}</p>]);
      return;
    }

    setTimeout(() => {
      if (playerTurn) {
        playerAttack();
        return;
      }

      enemyAttack();
    }, 1000);
  }, [player, enemies]);

  console.log(player);

  const playerAttack = () => {
    let enemy = enemies[0];
    let newCombatLog = [];

    let playerDamage = Math.floor(
      Math.random() * (player.maxDamage - player.minDamage + 1) + player.minDamage
    );

    let enemyHealth = enemy.currentHealth - playerDamage;
    newCombatLog.push(<p>{`${player.name} attacks ${enemy.name} for ${playerDamage} damage!`}</p>);

    if (enemyHealth <= 0) {
      newCombatLog.push(<p>{`${enemy.name} has been defeated!`}</p>);
      setEnemies((prevEnemies) => { 
        prevEnemies.shift();
        return [...prevEnemies];
      });
    } else {
      setEnemies((prevEnemies) => {
        prevEnemies[0].currentHealth = enemyHealth;
        return [...prevEnemies];
      });
      setPlayerTurn(false);
    }

    setCombatText((prevLog) => [...prevLog, ...newCombatLog]);
  };

  const enemyAttack = () => {
    let enemy = enemies[0];

    let enemyDamage = Math.floor(
      Math.random() * (enemy.maxDamage - enemy.minDamage + 1) + enemy.minDamage
    );

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      currentHealth: prevPlayer.currentHealth - enemyDamage,
    }));

    setCombatText((prevLog) => [
      ...prevLog,
      <p>{`${enemy.name} attacks ${player.name} for ${enemyDamage} damage!`}</p>,
    ]);

    setPlayerTurn(true);
  };

  return <>{combatText}</>;
}
