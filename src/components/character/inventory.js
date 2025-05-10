import { Container, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import Slot from "./slot";

export default function Inventory({}) {
  const [headers, setHeaders] = useState([
    { id: 0, name: "All", selected: true, style: { borderWidth: "2px 1px 0px 0px" } },
    { id: 1, name: "Weapons", selected: false },
    { id: 2, name: "Armor", selected: false },
    { id: 3, name: "Jewels", selected: false },
    { id: 4, name: "Misc.", selected: false },
    { id: 5, name: "Materials", selected: false, style: { borderWidth: "2px 0px 4px 1px" } },
  ]);

  const availableSlots = 52;
  const totalSlots = 132;

  const selectHeader = (id) => {
    headers.forEach((header) => {
      if (header.id === id) {
        header.selected = true;
        header.style = {};

        if (id === 0) {
          header.style = { borderWidth: "2px 1px 0px 0px" };
        }

        if (id === 5) {
          header.style = { borderWidth: "2px 0px 0px 1px" };
        }
      } else {
        header.selected = false;
        header.style = {};

        if (id === 0) {
          header.style = { borderWidth: "2px 1px 4px 0px" };
        }

        if (id === 5) {
          header.style = { borderWidth: "2px 0px 4px 1px" };
        }
      }
    });

    setHeaders([...headers]);
  };

  const getHeaders = () => {
    return (
      <>
        {headers.map((header) => (
          <Col className="px-0" xs={2}>
            <button
              onClick={() => selectHeader(header.id)}
              className={header.selected ? "bag-button-pressed" : "bag-button"}
              style={header.style}
              key={header.id}
            >
              {header.name}
            </button>
          </Col>
        ))}
      </>
    );
  };

  const getBag = () => {
    return (
      <Container className="bag">
        <Col>
          <Row className="justify-content-center pt-1">{getBagSlots()}</Row>
        </Col>
      </Container>
    );
  };

  const getBagSlots = () => {
    const slots = [];
    for (let i = 0; i < availableSlots; i++) {
      slots.push(<Slot key={i} type="bag" />);
    }
    for (let i = 0; i < totalSlots - availableSlots; i++) {
      slots.push(<Slot key={i} type="bag" disabled />);
    }
    return slots;
  };

  return (
    <Container className="inventory">
      <Row>
        <Col className="align-self-center text-end">Inventory</Col>
        <Col className="text-start">
          <Image width="40px" src={`/assets/images/items/base/bag.png`} className="m-2" />
        </Col>
      </Row>
      <Row>{getHeaders()}</Row>
      <Row>{getBag()}</Row>
    </Container>
  );
}
