import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LootSlot from "./lootSlot";

export default function Loot({ items }) {
  useEffect(() => {
    
  }, []);

  return (
    <>
      <Container className="">
        <Row className="justify-content-center mb-3" >
          <Col xs="auto" className="text-center" style={{ fontSize: "20px", fontFamily: "Calibri" }}>
            Your Loot:
          </Col>
        </Row>
        <Row className="justify-content-center">
          {items.map((item, i) => (
            <Col xs="auto" key={i}>
              <LootSlot item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
