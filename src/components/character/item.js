import { Container, Row, Col, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDraggable } from "@dnd-kit/core";
import { PlayerDataContext } from "../../pages/character";
import { useState, useRef, useContext } from "react";
import ItemTooltip from "./itemTooltip";
import { changeSlot } from "../../services/itemService";

export default function Item({ type, disabled, item, isLarge }) {
  const { playerItems, refreshItems, refreshStats } = useContext(PlayerDataContext);
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
        zIndex: 1000,
        position: "relative"
      }
    : undefined;

  async function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.button === 2) {
      if (item.equipped) {
        unequipItem();
      } else {
        equipItem();
      }
    }

    await refreshItems();
    refreshStats();
  }

  function equipItem() {
    let alreadyEquippedItem = playerItems.find(
      (i) => i.equipped && i.template.slotType === item.template.slotType
    );
    if (alreadyEquippedItem) {
      alreadyEquippedItem.equipped = false;
      alreadyEquippedItem.slot = item.slot;
      changeSlot(alreadyEquippedItem.id, alreadyEquippedItem.slot);
    }

    item.equipped = true;
    item.slot = item.template.slotType + "0";
    changeSlot(item.id, item.slot);
  }

  function unequipItem() {
    item.equipped = false;
    item.slot = "bag" + getNextAvailableSlot();
    changeSlot(item.id, item.slot);
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
        <Image src={item.template.icon} className={isLarge ? "slot-icon-large" : "slot-icon"} />
      </Container>
      <ItemTooltip item={item} visible={tooltipVisible} setVisible={setTooltipVisible} />
    </>
  );
}
