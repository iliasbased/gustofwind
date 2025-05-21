import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";
import { DndContext, closestCorners } from "@dnd-kit/core";

const baseStats = [
  {
    id: "max_hp",
    value: 200,
  },
  {
    id: "max_mana",
    value: 100,
  },
  {
    id: "hp_regen",
    value: 5,
  },
  {
    id: "mana_regen",
    value: 2,
  },
  {
    id: "min_dmg",
    value: 10,
  },
  {
    id: "max_dmg",
    value: 20,
  },
  {
    id: "crit_chance",
    value: 0.05,
  },
  {
    id: "crit_dmg",
    value: 1.5,
  },
  {
    id: "hit_chance",
    value: 0.95,
  }
];

export function usePlayerStats(playerItems) {
  const [mainStats, setMainStats] = useState([
    { id: "str", text: "Strength", value: 0 },
    { id: "dex", text: "Dexterity", value: 0 },
    { id: "int", text: "Intelligence", value: 0 },
    { id: "wis", text: "Wisdom", value: 0 },
    { id: "con", text: "Constitution", value: 0 },
    { id: "perc", text: "Perception", value: 0 },
    { id: "luck", text: "Luck", value: 0 },
  ]);
  const [secondaryStats, setSecondaryStats] = useState([
    { id: "max_hp", text: "Max. Health", value: 0 },
    { id: "max_mana", text: "Max. Mana", value: 0 },
    { id: "hp_regen", text: "Health Regen.", value: 0 },
    { id: "mana_regen", text: "Mana Regen.", value: 0 },
    { id: "min_dmg", text: "Min. Damage", value: 0 },
    { id: "max_dmg", text: "Max. Damage", value: 0 },
    { id: "crit_chance", text: "Critical Chance", value: 0 },
    { id: "crit_dmg", text: "Critical Damage", value: 0 },
    { id: "hit_chance", text: "Hit Chance", value: 0 },
    { id: "physical_def", text: "Physical Defence", value: 0 },
    { id: "magic_def", text: "Magical Defence", value: 0 },
    { id: "crit_def", text: "Critical Defence", value: 0 },
    { id: "evasion", text: "Evasion", value: 0 },
    { id: "block_chance", text: "Block Chance", value: 0 },
  ]);
  const [resistances, setResistances] = useState([
    { id: "fire_res", text: "Fire Resistance", value: 0 },
    { id: "frost_res", text: "Frost Resistance", value: 0 },
    { id: "light_res", text: "Light Resistance.", value: 0 },
    { id: "dark_res", text: "Dark Resistance", value: 0 },
    { id: "poison_res", text: "Poison Resistance", value: 0 },
  ]);

  useEffect(() => {
    setMainStats((prevStats) => {
      const newStats = [...prevStats];
      newStats.forEach((stat) => {
        stat.value = baseStats.find((s) => s.id === stat.id)?.value || 0;
      });
      return newStats;
    });

    setSecondaryStats((prevStats) => {
      const newStats = [...prevStats];
      newStats.forEach((stat) => {
        stat.value = baseStats.find((s) => s.id === stat.id)?.value || 0;
      });
      return newStats;
    });

    setResistances((prevStats) => {
      const newStats = [...prevStats];
      newStats.forEach((stat) => {
        stat.value = baseStats.find((s) => s.id === stat.id)?.value || 0;
      });
      return newStats;
    });

    playerItems.forEach((equippedItem) => {
      equippedItem.stats.forEach((stat) => {
        if (mainStats.find((s) => s.id === stat.id)) {
          setMainStats((prevStats) => {
            const newStats = [...prevStats];
            const index = newStats.findIndex((s) => s.id === stat.id);
            newStats[index].value += stat.value;
            return newStats;
          });
        } else if (secondaryStats.find((s) => s.id === stat.id)) {
          setSecondaryStats((prevStats) => {
            const newStats = [...prevStats];
            const index = newStats.findIndex((s) => s.id === stat.id);
            newStats[index].value += stat.value;
            return newStats;
          });
        } else if (resistances.find((s) => s.id === stat.id)) {
          setResistances((prevStats) => {
            const newStats = [...prevStats];
            const index = newStats.findIndex((s) => s.id === stat.id);
            newStats[index].value += stat.value;
            return newStats;
          });
        }
      });
    });

    mainStats.forEach((stat) => {
      switch (stat.id) {
        case "str":
          setSecondaryStats((prevStats) => {
            const newStats = [...prevStats];
            let index = newStats.findIndex((s) => s.id == "min_dmg");
            newStats[index].value += stat.value * 2;

            index = newStats.findIndex((s) => s.id == "max_dmg");
            newStats[index].value += stat.value;

            index = newStats.findIndex((s) => s.id == "crit_dmg");
            newStats[index].value += stat.value;

            index = newStats.findIndex((s) => s.id == "physical_def");
            newStats[index].value += stat.value * 5;

            return newStats;
          });
          break;
        case "dex":
          setSecondaryStats((prevStats) => {
            const newStats = [...prevStats];
            let index = newStats.findIndex((s) => s.id == "max_dmg");
            newStats[index].value += stat.value * 4;

            index = newStats.findIndex((s) => s.id == "crit_chance");
            newStats[index].value += stat.value * 0.01;

            index = newStats.findIndex((s) => s.id == "crit_dmg");
            newStats[index].value += stat.value;

            index = newStats.findIndex((s) => s.id == "evasion");
            newStats[index].value += stat.value * 0.01;

            return newStats;
          });
          break;
        case "int":
          break;
        case "wis":
          break;
        case "con":
          break;
        case "perc":
          break;
        case "luck":
      }
    });
  }, [playerItems]);

  return {
    mainStats,
    secondaryStats,
    resistances,
  };
}
