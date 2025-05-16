import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function Loot({ loot }) {
  let lootItems = [];
  let lootQuality = "common";

  useEffect(() => {
    loot.forEach((e) => {
      let roll = Math.random();
      if (roll <= e.chance) {
        lootItems.push(e.loot);
        lootQuality = e.type;
      }
    });
  }, []);

  return (
    <>
      <Container className="loot">
        <Row className="align-items-center" style={{ height: "80%" }}>
          <Col>
            <Row className="justify-content-center">
              <Image
                style={{ width: "40%" }}
                src={`/assets/images/items/base/loot_${lootQuality}.png`}
                className="m-2"
              />
            </Row>

            <Row className="justify-content-center">
              <button style={{ width: "60%" }}>Claim</button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
