import { Container, Row, Col, Image } from "react-bootstrap";
import { useDraggable } from "@dnd-kit/core";

export default function Item({ type, disabled, item, isLarge}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable'+item.id,
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

  return (
    <Container className="p-0" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Image src={item.img} className={isLarge ? "slot-icon-large" : "slot-icon"} />
    </Container>
  );
}
