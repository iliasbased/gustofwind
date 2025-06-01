import { Container, Row, Col, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDraggable } from "@dnd-kit/core";
import { PlayerItemsContext } from "../../pages/character";
import { useContext, useState, useRef } from "react";
import ItemTooltip from "./item_tooltip";

export default function Item({ type, disabled, item, isLarge }) {
  const [playerItems, setPlayerItems] = useContext(PlayerItemsContext);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: "draggable" + item.id,
    data: {
      type: "item",
      item: item,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.button === 2) {
      if (item.equipped) {
        unequipItem();
      } else {
        equipItem();
      }
    }

    setPlayerItems([...playerItems]);
  }

  function equipItem() {
    let alreadyEquippedItem = playerItems.find((i) => i.equipped && i.type === item.type);
    if (alreadyEquippedItem) {
      alreadyEquippedItem.equipped = false;
      alreadyEquippedItem.slot = item.slot;
    }

    item.equipped = true;
    item.slot = item.type + "0";
  }

  function unequipItem() {
    item.equipped = false;
    item.slot = "bag" + getNextAvailableSlot();
  }

  function getNextAvailableSlot() {
    let nextAvailableSlot = 0;
    while (playerItems.find((i) => i.slot === "bag" + nextAvailableSlot)) {
      nextAvailableSlot++;
    }
    return nextAvailableSlot;
  }

  const tooltipTimeout = useRef();

  function handleMouseEnter() {
    tooltipTimeout.current = setTimeout(() => {
      setTooltipVisible(true);
    }, 500);
  }

  function handleMouseLeave() {
    clearTimeout(tooltipTimeout.current);
    setTooltipVisible(false);
  }

  // Hide tooltip immediately when dragging starts
  if (isDragging && tooltipVisible) {
    setTooltipVisible(false);
  }

  return (
    <>
      <Container
        fluid
        className="p-0"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onContextMenu={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image src={item.img} className={isLarge ? "slot-icon-large" : "slot-icon"} />
        <ItemTooltip item={item} visible={tooltipVisible} setVisible={setTooltipVisible} />
      </Container>
    </>
  );
}
