import { Container, Row, Col, Image } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Slot from "./slot";
import { usePlayerItems } from "../../hooks/usePlayerItems";
import { PlayerDataContext } from "../../pages/character";
import {getRandomBorderTopOnly} from "../../utilities";

export default function Inventory() {
  const { playerItems } = useContext(PlayerDataContext);
  const [borderStyle, setBorderStyle] = useState({});
  useEffect(() => {
    setBorderStyle(getRandomBorderTopOnly());
  }, []);
  console.log("Inventory items:", playerItems);

  const [headers, setHeaders] = useState([
    { id: 0, name: "All", key: "all", selected: true, style: { borderWidth: "2px 1px 0px 0px" } },
    { id: 1, name: "Weapons", key: "weapon", selected: false },
    { id: 2, name: "Armor", key: "armor", selected: false },
    { id: 3, name: "Jewels", key: "jewel", selected: false },
    { id: 4, name: "Misc.", key: "misc", selected: false },
    { id: 5, name: "Materials", key: "material", selected: false, style: { borderWidth: "2px 0px 4px 1px" } },
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
          <Col className="px-0" xs={2} key={header.id}>
            <button
              onClick={() => selectHeader(header.id)}
              className={header.selected ? "bag-button-pressed" : "bag-button"}
              style={{...header.style, ...borderStyle}}
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
      <Container className="bag" >
        <Col>
          <Row className="justify-content-center pt-1" style={{paddingBottom:'2px'}}>{getBagSlots()}</Row>
        </Col>
      </Container>
    );
  };

  const getBagSlots = () => {
    const slots = [];
    for (let i = 0; i < availableSlots; i++) {
      slots.push(
        <Slot
          key={i}
          id={"bag" + i}
          type="bag"
          item={playerItems.find((item) => item.slot == "bag" + i)}
          selectedHeader={headers.find((e) => e.selected)}
        />
      );
    }
    for (let i = availableSlots; i < totalSlots; i++) {
      slots.push(<Slot key={i} id={"bag" + i} type="bag" disabled />);
    }
    return slots;
  };

  return (
    <Container className="inventory" style={{paddingBottom:'4px'}}>
      <Row className="justify-content-center my-2 pt-1">
        I N V E N T O R Y
      </Row>
      <Row>{getHeaders()}</Row>
      <Row style={{/* overflow:'auto', */ maxHeight:'600px'}}>{getBag()}</Row>
    </Container>
  );
}
