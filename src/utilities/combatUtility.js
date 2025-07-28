export function formatEnemyAction(action) {
  switch (action.type) {
    case "enemy_attack":
      return {
        id: Date.now() + Math.random(),
        text: `${action.casterName} attacks ${action.targetName} for ${action.damage} damage.`,
        type: "enemy_action",
        timestamp: action.timestamp,
      };
    default:
      return {
        id: Date.now() + Math.random(),
        text: `${action.casterName} uses ${action.type}.`,
        type: "enemy_action",
        timestamp: action.timestamp,
      };
  }
}

export function formatPlayerAction(action) {
  return {
    id: Date.now() + Math.random(),
    text: `${action.casterName} attacks ${action.targetName} for ${action.damage} damage.`,
    type: "player_action",
    timestamp: action.timestamp,
  };
}
