import { Container, Row, Col, Image } from "react-bootstrap";
import { useDraggable } from "@dnd-kit/core";
import { PlayerItemsContext } from "../../pages/character";
import { useContext } from "react";

export default function Item({ type, disabled, item, isLarge }) {
  const [playerItems, setPlayerItems] = useContext(PlayerItemsContext);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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

  return (
    <Container
      className="p-0"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onContextMenu={handleClick}
    >
      <Image src={item.img} className={isLarge ? "slot-icon-large" : "slot-icon"} />
    </Container>
  );
}
