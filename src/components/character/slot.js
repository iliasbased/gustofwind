import { Container, Row, Col, Image } from "react-bootstrap";
import { useDroppable } from "@dnd-kit/core";
import Item from "./item";

export default function Slot({ id, type, disabled, item, selectedHeader }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      type: type,
      disabled: disabled,
      item: item,
    },
  });

  const getEmptyIcon = () => {
    return <Image src={`/assets/images/items/base/${type}.png`} className="slot-icon-empty" />;
  };


  if (type == "bag") {
    let opacity = 1;
    if (selectedHeader?.key != "all") {
      if (item && item.template.slotType != selectedHeader.key) {
        opacity = 0.2;
      }
    }

    return (
      <Container
        className={disabled ? "slot-bag-disabled" : "slot-bag"}
        style={{opacity: opacity}}
        ref={setNodeRef}
        // style={{ backgroundColor: isOver ? "lightblue" : "" }}
      >
        <Row>
          <Col>{item ? <Item item={item} /> : ""}</Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container
      className="slot"
      ref={setNodeRef}
      style={{ backgroundColor: isOver ? "lightblue" : "" }}
    >
      <Row>
        <Col>{item ? <Item item={item} isLarge /> : getEmptyIcon()}</Col>
      </Row>
    </Container>
  );
}
