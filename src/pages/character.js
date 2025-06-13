import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { usePlayerItems } from "../hooks/usePlayerItems";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { changeSlot } from "../services/itemService";
import FadeInOut from "../layouts/fade-in-out";
import {getRandomBorderLeftOnly} from "../utilities";

export const PlayerDataContext = React.createContext();

export default function Character() {
  const { playerItems, refreshItems, setPlayerItems } = usePlayerItems();
  const { playerStats, refreshStats } = usePlayerStats();
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderLeftOnly());
  }, []);

  async function handleDragEnd(event) {
    if (event.over) {
      if (event.over.data.current.type == "bag") {
        await dropItemInBag(event.active.data.current.item, event.over);
      } else {
        await dropItemInGear(event.active.data.current.item, event.over);
      }

      await refreshItems();
      refreshStats();
    }
  }

  async function dropItemInBag(item, slot) {
    if (slot.data.current.disabled) {
      return;
    }

    if (
      item.equipped &&
      slot.data.current.item &&
      slot.data.current.item.template.slotType != item.template.slotType
    ) {
      return;
    }

    let draggableSlot = item.slot;
    let droppableSlot = slot.id;

    if (slot.data.current.item) {
      slot.data.current.item.slot = draggableSlot;
      changeSlot(slot.data.current.item.id, draggableSlot);
    }

    item.slot = droppableSlot;
    setPlayerItems([...playerItems]);
    await changeSlot(item.id, droppableSlot);
  }

  async function dropItemInGear(item, slot) {
    if (slot.data.current.disabled) {
      return;
    }

    if (
      item.equipped &&
      slot.data.current.item &&
      slot.data.current.item.template.slotType != item.template.slotType
    ) {
      return;
    }

    if (slot.data.current.type != item.template.slotType) {
      return;
    }

    let draggableSlot = item.slot;
    let draggableEquipped = item.equipped;
    let droppableSlot = slot.id;

    if (slot.data.current.item) {
      slot.data.current.item.slot = draggableSlot;
      slot.data.current.item.equipped = draggableEquipped;
      changeSlot(slot.data.current.item.id, slot.data.current.item.slot);
    }

    item.slot = droppableSlot;
    item.equipped = true;
    setPlayerItems([...playerItems]);
    await changeSlot(item.id, item.slot);
  }

  return (
    <>
      <Container style={{paddingTop:'120px'}}>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row className="justify-content-center engraved mb-4" style={{fontSize: '40px'}}>C h a r a c t e r</Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container className="base-ui" style={borderStyle}>
        <PlayerDataContext.Provider
          value={{ playerItems, playerStats, refreshItems, refreshStats, setPlayerItems }}
        >
          <Row>
            <Col className="pe-0" xs={3}>
              <Stats />
            </Col>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <Col className="px-0" xs={3}>
                <Gear />
              </Col>
              <Col className="ps-0" xs={6}>
                <Inventory />
              </Col>
            </DndContext>
          </Row>
        </PlayerDataContext.Provider>
      </Container>
    </>
  );
}
