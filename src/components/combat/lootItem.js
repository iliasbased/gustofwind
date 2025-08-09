import { Container, Image, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import ItemTooltip from "../character/itemTooltip";

export default function LootItem({ item }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipTimeout = useRef();

  function handleMouseEnter() {
    tooltipTimeout.current = setTimeout(() => {
      setTooltipVisible(true);
    }, 300);
  }

  function handleMouseLeave() {
    clearTimeout(tooltipTimeout.current);
    setTooltipVisible(false);
  }

  return (
    <>
      <Container style={{ position: "relative" }}>
        <Row>
          {item.quantity > 1 && (
            <span className="item-quantity">
              {item.quantity}
            </span>
          )}
        </Row>
      </Container>
      <Container
        fluid
        className="slot-drag-container p-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image src={item.template.icon} className={"slot-icon"} />
      </Container>
      <ItemTooltip item={item} visible={tooltipVisible} />
    </>
  );
}
