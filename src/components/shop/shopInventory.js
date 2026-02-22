import { Container, Row, Col, Image } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Slot from "../character/slot";
import getRandomBorder from "../../utilities/borderUtility";
import { useItems } from "../../context/itemContext";

export default function ShopInventory() {
  const { shopItems } = useItems();
  const [totalValue, setTotalValue] = useState(0);
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    setBorderStyle(getRandomBorder());
  }, []);

  useEffect(() => {
    shopItems.forEach((item) => {
      if (item && item.template && item.template.value) {
        setTotalValue((prevValue) => prevValue + item.template.value);
      }
    });
  }, [shopItems]);

  const totalSlots = 55;

  const getBag = () => {
    return (
      <Container className="bag-shop">
        <Col>
          <Row className="justify-content-center pt-1" style={{ paddingBottom: "2px" }}>
            {getBagSlots()}
          </Row>
        </Col>
      </Container>
    );
  };

  const getBagSlots = () => {
    const slots = [];
    for (let i = 0; i < totalSlots; i++) {
      slots.push(<Slot key={i} id={"shop" + i} type="shop" />);
    }
    return slots;
  };

  return (
    <Container className="inventory" style={{ paddingBottom: "4px", borderColor: "rgba(0,0,0,0)" }}>
      <Row className="justify-content-center mt-5 pt-1">Total Value:</Row>
      <Row className="justify-content-center mb-5 pt-1 total-value">
        {totalValue}
        <Image
          src="assets/images/items/base/coin.png"
          style={{ width: "60px"}}
        />
      </Row>
      <Row style={{ maxHeight: "600px" }}>{getBag()}</Row>
      <Row className="justify-content-center mt-5">
        <button className="sell-button" disabled={shopItems.length === 1} style={borderStyle}>Sell</button>
      </Row>
    </Container>
  );
}
