import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";
import { DndContext, closestCorners } from "@dnd-kit/core";

export function usePlayerItems() {
  const [playerItems, setPlayerItems] = useState([
    {
      id: 0,
      name: "Iron Sword",
      type: "weapon",
      equipped: true,
      img: "/assets/images/items/base/weapon.png",
      slot: "weapon0",
      rarity: "common",
      description: "A basic iron sword.",
      detailedDescription:
        "A sturdy iron sword that deals moderate damage. It is well-balanced and suitable for beginners.",
      stats: [
        { id: "min_damage", value: 10, text: "Min. Damage" },
        { id: "max_damage", value: 20, text: "Max. Damage" },
        { id: "hit_chance", value: 0.95, text: "Hit Chance" },
        { id: "critical_chance", value: 0.05, text: "Critical Chance" },
        { id: "critical_damage", value: 1.5, text: "Critical Damage" },
        { id: "str", value: 2, text: "Strength" },
        { id: "dex", value: 1, text: "Dexterity" },
      ],
    },
    {
      id: 1,
      name: "Leather Belt",
      type: "belt",
      equipped: false,
      img: "/assets/images/items/base/belt.png",
      slot: "bag0",
      rarity: "common",
      description: "A sturdy leather belt.",
      detailedDescription:
        "A durable leather belt that provides additional protection and minor stat boosts. It is comfortable and flexible, making it ideal for adventurers.",
      stats: [
        { id: "physical_res", value: 10, text: "Physical Resistance" },
        { id: "critical_chance", value: 0.05, text: "Critical Chance" },
        { id: "critical_damage", value: 1.5, text: "Critical Damage" },
        { id: "str", value: 2, text: "Strength" },
        { id: "dex", value: 1, text: "Dexterity" },
      ],
    },
    {
      id: 2,
      name: "Health Potion",
      type: "potion_health",
      equipped: false,
      img: "/assets/images/items/base/potion_health.png",
      slot: "bag1",
      rarity: "common",
      description: "A potion that restores health.",
      stats: [],
    },
    {
      id: 3,
      name: "Mana Potion",
      type: "potion_mana",
      equipped: false,
      img: "/assets/images/items/base/potion_mana.png",
      slot: "bag2",
      rarity: "common",
      description: "A potion that restores mana.",
      stats: [],
    },
    {
      id: 4,
      name: "Common Helmet",
      type: "head",
      equipped: false,
      img: "/assets/images/items/base/head.png",
      slot: "bag3",
      rarity: "common",
      description: "A common helmet.",
      stats: [
        { id: "magic_res", value: 10, text: "Magic Resistance" },
        { id: "critical_chance", value: 0.05, text: "Critical Chance" },
        { id: "critical_damage", value: 1.5, text: "Critical Damage" },
        { id: "str", value: 2, text: "Strength" },
        { id: "dex", value: 1, text: "Dexterity" },
      ],
    },
    {
      id: 5,
      name: "Leather Boots",
      type: "boots",
      equipped: false,
      img: "/assets/images/items/base/boots.png",
      slot: "bag4",
      rarity: "common",
      description: "A pair of sturdy leather boots.",
      stats: [
        { id: "min_damage", value: 10, text: "Min. Damage" },
        { id: "critical_chance", value: 0.05, text: "Critical Chance" },
        { id: "critical_damage", value: 1.5, text: "Critical Damage" },
        { id: "str", value: 2, text: "Strength" },
        { id: "dex", value: 1, text: "Dexterity" },
      ],
    },
    {
      id: 5,
      name: "Mithril the Cat",
      type: "pet",
      equipped: false,
      img: "/assets/images/items/base/mithril.png",
      slot: "bag5",
      rarity: "common",
      description: "A flufferly companion that follows you around.",
      stats: [
        { id: "min_damage", value: 10, text: "Min. Damage" },
        { id: "critical_chance", value: 0.05, text: "Critical Chance" },
        { id: "critical_damage", value: 1.5, text: "Critical Damage" },
        { id: "str", value: 2, text: "Strength" },
        { id: "dex", value: 1, text: "Dexterity" },
      ],
    },
  ]);

  return {
    playerItems,
    setPlayerItems,
  };
}
