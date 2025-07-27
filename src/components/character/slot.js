import { Container, Row, Col, Image } from "react-bootstrap";
import { useDroppable } from "@dnd-kit/core";
import Item from "./item";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useEffect, useState } from "react";

export default function Slot({ id, type, disabled, item, selectedHeader }) {
  const [borderStyleSubtle, setBorderStyleSubtle] = useState({});
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyleSubtle(getRandomBorderSubtle());
    setBorderStyle(getRandomBorder());
  }, []);

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
        style={{ opacity: opacity, ...borderStyleSubtle }}
        ref={setNodeRef}
      >
        <Row>
          <Col>{item ? <Item item={item} /> : ""}</Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="slot" ref={setNodeRef} style={borderStyle}>
      <Row>
        <Col>{item ? <Item item={item} isLarge /> : getEmptyIcon()}</Col>
      </Row>
    </Container>
  );
}
