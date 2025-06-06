import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { usePlayerItems } from "../hooks/usePlayerItems";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { changeSlot } from "../services/itemService";

export const PlayerDataContext = React.createContext();

export default function Character() {
  const { playerItems, refreshItems } = usePlayerItems();
  const { playerStats, refreshStats } = usePlayerStats();

  async function handleDragEnd(event) {
    if (event.over) {
      console.log(event);

      if (event.over.data.current.type == "bag") {
        dropItemInBag(event.active.data.current.item, event.over);
      } else {
        dropItemInGear(event.active.data.current.item, event.over);
      }

      await refreshItems();
      refreshStats();
    }
  }

  function dropItemInBag(item, slot) {
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
    changeSlot(item.id, droppableSlot);
  }

  function dropItemInGear(item, slot) {
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

    item.slot = droppableSlot;
    item.equipped = true;
    changeSlot(item.id, item.slot);

    if (slot.data.current.item) {
      slot.data.current.item.slot = draggableSlot;
      slot.data.current.item.equipped = draggableEquipped;
      changeSlot(slot.data.current.item.id, slot.data.current.item.slot);
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
              <Row className="justify-content-center">C H A R A C T E R</Row>
            </Container>
          </Col>
          <Col xs={3}></Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
      <Container className="character">
        <PlayerDataContext.Provider value={{ playerItems, playerStats, refreshItems, refreshStats }}>
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
