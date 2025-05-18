import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";
import { DndContext, closestCorners } from "@dnd-kit/core";

export const PlayerItemsContext = React.createContext();

export default function Character() {
  const [playerItems, setPlayerItems] = useState([
    {
      id: 0,
      name: "Iron Sword",
      type: "weapon",
      equipped: true,
      img: "/assets/images/items/base/weapon.png",
      slot: "weapon0",
    },
    {
      id: 1,
      name: "Leather Belt",
      type: "belt",
      equipped: false,
      img: "/assets/images/items/base/belt.png",
      slot: "bag0",
    },
    {
      id: 2,
      name: "Health Potion",
      type: "potion_health",
      equipped: false,
      img: "/assets/images/items/base/potion_health.png",
      slot: "bag1",
    },
    {
      id: 3,
      name: "Mana Potion",
      type: "potion_mana",
      equipped: false,
      img: "/assets/images/items/base/potion_mana.png",
      slot: "bag2",
    },
    {
      id: 4,
      name: "Common Helmet",
      type: "head",
      equipped: false,
      img: "/assets/images/items/base/head.png",
      slot: "bag3",
    },
    {
      id: 5,
      name: "Leather Boots",
      type: "boots",
      equipped: false,
      img: "/assets/images/items/base/boots.png",
      slot: "bag4",
    },
  ]);

  function handleDragEnd(event) {
    if (event.over) {
      console.log(event);

      if (event.over.data.current.type == "bag") {
        dropItemInBag(event.active.data.current.item, event.over);
      } else {
        dropItemInGear(event.active.data.current.item, event.over);
      }

      setPlayerItems([...playerItems]);
    }
  }

  function dropItemInBag(item, slot) {
    if (slot.data.current.disabled) {
      return;
    }

    if (item.equipped && slot.data.current.item && slot.data.current.item.type != item.type) {
      return;
    }

    let draggableSlot = item.slot;
    let draggableEquipped = item.equipped;
    let droppableSlot = slot.id;

    item.slot = droppableSlot;
    item.equipped = false;

    if (slot.data.current.item) {
      slot.data.current.item.slot = draggableSlot;
      slot.data.current.item.equipped = draggableEquipped;
    }
  }

  function dropItemInGear(item, slot) {
    if (slot.data.current.disabled) {
      return;
    }

    if (item.equipped && slot.data.current.item && slot.data.current.item.type != item.type) {
      return;
    }

    if (slot.data.current.type != item.type) {
      return;
    }

    let draggableSlot = item.slot;
    let draggableEquipped = item.equipped;
    let droppableSlot = slot.id;

    item.slot = droppableSlot;
    item.equipped = true;

    if (slot.data.current.item) {
      slot.data.current.item.slot = draggableSlot;
      slot.data.current.item.equipped = draggableEquipped;
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col xs={3}></Col>
          <Col xs={3}>
            <Container className="ui-header">
              <Row className="justify-content-center">CHARACTER</Row>
            </Container>
          </Col>
          <Col xs={3}></Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
      <Container className="character">
        <Row>
          <PlayerItemsContext.Provider value={[playerItems, setPlayerItems]}>
            <Col className="pe-0" xs={3}>
              <Stats />
            </Col>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <Col className="px-0" xs={3}>
                <Gear playerItems={playerItems.filter((item) => item.equipped)} />
              </Col>
              <Col className="ps-0" xs={6}>
                <Inventory playerItems={playerItems.filter((item) => !item.equipped)} />
              </Col>
            </DndContext>
          </PlayerItemsContext.Provider>
        </Row>
      </Container>
    </>
  );
}
