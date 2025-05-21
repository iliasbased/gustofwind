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
      stats: [
        { id: "min_damage", value: 10 },
        { id: "critical_chance", value: 0.05 },
        { id: "critical_damage", value: 1.5 },
        { id: "str", value: 2 },
        { id: "dex", value: 1 },
      ],
    },
    {
      id: 1,
      name: "Leather Belt",
      type: "belt",
      equipped: false,
      img: "/assets/images/items/base/belt.png",
      slot: "bag0",
      stats: [
        { id: "min_damage", value: 10 },
        { id: "critical_chance", value: 0.05 },
        { id: "critical_damage", value: 1.5 },
        { id: "str", value: 2 },
        { id: "dex", value: 1 },
      ],
    },
    {
      id: 2,
      name: "Health Potion",
      type: "potion_health",
      equipped: false,
      img: "/assets/images/items/base/potion_health.png",
      slot: "bag1",
      stats: [],
    },
    {
      id: 3,
      name: "Mana Potion",
      type: "potion_mana",
      equipped: false,
      img: "/assets/images/items/base/potion_mana.png",
      slot: "bag2",
      stats: [],
    },
    {
      id: 4,
      name: "Common Helmet",
      type: "head",
      equipped: false,
      img: "/assets/images/items/base/head.png",
      slot: "bag3",
      stats: [
        { id: "min_damage", value: 10 },
        { id: "critical_chance", value: 0.05 },
        { id: "critical_damage", value: 1.5 },
        { id: "str", value: 2 },
        { id: "dex", value: 1 },
      ],
    },
    {
      id: 5,
      name: "Leather Boots",
      type: "boots",
      equipped: false,
      img: "/assets/images/items/base/boots.png",
      slot: "bag4",
      stats: [
        { id: "min_damage", value: 10 },
        { id: "critical_chance", value: 0.05 },
        { id: "critical_damage", value: 1.5 },
        { id: "str", value: 2 },
        { id: "dex", value: 1 },
      ],
    },
  ]);

  return {
    playerItems,
    setPlayerItems,
  };
}
