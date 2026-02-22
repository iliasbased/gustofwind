import React, { useEffect, useState, Context } from "react";
import { Container, Row, Col, Fade } from "react-bootstrap";
import Inventory from "../components/character/inventory";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { changeSlot } from "../services/itemService";
import { getRandomBorderLeftOnly } from "../utilities/borderUtility";
import { useHero } from "../context/heroContext";
import ShopInventory from "../components/shop/shopInventory";
import { useItems } from "../context/itemContext";

export default function Shop() {
  const { playerItems, refreshItems, setPlayerItems } = useItems();
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorderLeftOnly());
  }, []);

  async function handleDragEnd(event) {
    if (event.over) {
      if (event.over.data.current.type == "bag") {
        await dropItemInBag(event.active.data.current.item, event.over);
      } else {
        await dropItemShop(event.active.data.current.item, event.over);
      }

      // await refreshItems();
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
      // changeSlot(slot.data.current.item.id, draggableSlot);
    }

    item.slot = droppableSlot;
    setPlayerItems([...playerItems]);
    // await changeSlot(item.id, droppableSlot);
  }

  async function dropItemShop(item, slot) {
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
      // changeSlot(slot.data.current.item.id, slot.data.current.item.slot);
    }

    item.slot = droppableSlot;
    setPlayerItems([...playerItems]);
    // await changeSlot(item.id, item.slot);
  }

  return (
    <>
      <Container style={{ paddingTop: "120px" }}>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row className="justify-content-center engraved mb-4" style={{ fontSize: "40px" }}>
              Shop
            </Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container className="base-ui" style={borderStyle}>
        <Row>
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <Col className="px-0" xs={6}>
              <ShopInventory />
            </Col>
            <Col className="ps-0" xs={6}>
              <Inventory shop/>
            </Col>
          </DndContext>
        </Row>
      </Container>
    </>
  );
}
