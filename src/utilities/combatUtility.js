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
  if (action.type === "wait") {
    return {
      id: Date.now() + Math.random(),
      text: `${action.casterName} waits around and skips their turn.`,
      type: "player_action",
      timestamp: action.timestamp,
    };
  }

  return {
    id: Date.now() + Math.random(),
    text: `${action.casterName} attacks ${action.targetName} for ${action.damage} damage.`,
    type: "player_action",
    timestamp: action.timestamp,
  };
}


export function formatEnvironmentAction(action) {
  return {
    id: Date.now() + Math.random(),
    text: `${action.targetInfo.name} has been defeated!`,
    type: "combatant_died",
    timestamp: action.timestamp,
  };
}