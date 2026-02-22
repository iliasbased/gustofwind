import { Container, Row, Col, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDraggable } from "@dnd-kit/core";
import { useState, useRef, useContext } from "react";
import ItemTooltip from "./itemTooltip";
import { changeSlot } from "../../services/itemService";
import { useItems } from "../../context/itemContext";
import { useStats } from "../../context/statsContext";

export default function Item({ type, disabled, item, isLarge, shop, sell }) {
  const { playerItems, setPlayerItems, refreshItems, setShopItems } = useItems();
  const { refreshStats } = useStats();

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
        zIndex: 9999,
        position: "relative",
        cursor: "url('cursors/cursor-grab.png'), grab !important",
      }
    : undefined;

  async function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (sell) {
      sellItem();
      return;
    }

    if (e.button === 2) {
      if (item.equipped) {
        await unequipItem();
      } else {
        await equipItem();
      }
    }

    await refreshItems();
    refreshStats();
  }

  function sellItem() {
    setShopItems((prevItems) => [...prevItems, item]);
    setPlayerItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    item.slot = "sold";
  }

  async function equipItem() {
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
    setPlayerItems([...playerItems]);
    await changeSlot(item.id, item.slot);
  }

  async function unequipItem() {
    item.equipped = false;
    item.slot = "bag" + getNextAvailableSlot();
    setPlayerItems([...playerItems]);
    await changeSlot(item.id, item.slot);
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
        className="slot-drag-container p-0"
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
