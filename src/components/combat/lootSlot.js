import { Container, Row, Col, Image } from "react-bootstrap";
import getRandomBorder, { getRandomBorderSubtle } from "../../utilities/borderUtility";
import { useEffect, useState } from "react";
import LootItem from "./lootItem";

export default function LootSlot({ item }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorder());
  }, []);

  return (
    <>
      <Container className="slot-bag" style={borderStyle}>
        <Row>
          <Col>
            <LootItem item={item} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
