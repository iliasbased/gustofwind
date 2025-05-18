import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";
import DropdownContext from "react-bootstrap/esm/DropdownContext";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import Item from "../components/character/item";
import { replace } from "react-router-dom";

export default function Character() {
  const [playerItems, setPlayerItems] = useState([
    {
      id: 0,
      name: "Iron Sword",
      type: "weapon",
      equipped: true,
      img: "/assets/images/items/base/sword.png",
      slot: 0,
    },
    {
      id: 1,
      name: "Leather Belt",
      type: "armor",
      equipped: false,
      img: "/assets/images/items/base/belt.png",
      slot: 1,
    },
    {
      id: 2,
      name: "Health Potion",
      type: "misc",
      equipped: false,
      img: "/assets/images/items/base/potion_health.png",
      slot: 2,
    },
    {
      id: 3,
      name: "Mana Potion",
      type: "misc",
      equipped: false,
      img: "/assets/images/items/base/potion_mana.png",
      slot: 3,
    },
    {
      id: 4,
      name: "Common Helmet",
      type: "armor",
      equipped: false,
      img: "/assets/images/items/base/head.png",
      slot: 4,
    },
    {
      id: 5,
      name: "Leather Boots",
      type: "armor",
      equipped: false,
      img: "/assets/images/items/base/boots.png",
      slot: 5,
    },
  ]);

  // const [activeItem, setActiveItem] = useState(null);

  function handleDragEnd(event) {
    // console.log(event);
    if (event.over) {
      console.log("2", event);
      console.log(event.over);

      let draggableSlot = event.active.data.current.item.slot;
      let droppableSlot = event.over.id;

      playerItems.find((item) => item.id == event.active.data.current.item.id).slot = droppableSlot;
      if (event.over.data.current.item) {
        playerItems.find((item) => item.id == event.over.data.current.item.id).slot = draggableSlot;
      }

      setPlayerItems([...playerItems]);
    }

    // setActiveItem(null);
  }

  function handleDragStart(event) {
    let id = event.active.id.replace("draggable", "");

    // setActiveItem(playerItems.find((item) => item.id === id));
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
          <Col className="pe-0" xs={3}>
            <Stats />
          </Col>
          <Col className="px-0" xs={3}>
            <Gear playerItems={playerItems.filter((item) => item.equipped)} />
          </Col>
          <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            collisionDetection={closestCorners}
          >
            <Col className="ps-0" xs={6}>
              <Inventory playerItems={playerItems.filter((item) => !item.equipped)} />
            </Col>
            {/* <DragOverlay>{activeItem ? <Item id={activeItem} /> : null}</DragOverlay> */}
          </DndContext>
        </Row>
      </Container>
    </>
  );
}
