import { Container, Row, Col } from "react-bootstrap";
import Slot from "./slot";

export default function Gear({}) {
  const getName = () => {
    return (
      <Container className="mb-2 my-1 gear-name">
        <Row className="justify-content-center">Norewind</Row>
      </Container>
    );
  };

  const getArmor = () => {
    return (
      <Container className="mb-4">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}></Col>
          <Col xs={3}>
            <Slot type="head" />
          </Col>
          <Col xs={3}></Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="shoulders" />
          </Col>
          <Col xs={3}>
            <Slot type="chest" />
          </Col>
          <Col xs={3}>
            <Slot type="cloak" />
          </Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="belt" />
          </Col>
          <Col xs={3}>
            <Slot type="legs" />
          </Col>
          <Col xs={3}>
            <Slot type="gloves" />
          </Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}></Col>
          <Col xs={3}>
            <Slot type="boots" />
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    );
  };

  const getJewels = () => {
    return (
      <Container className="mb-4">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="necklace" />
          </Col>
          <Col xs={3}>
            <Slot type="earring" />
          </Col>
          <Col xs={3}>
            <Slot type="earring" />
          </Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="bracelet" />
          </Col>
          <Col xs={3}>
            <Slot type="ring" />
          </Col>
          <Col xs={3}>
            <Slot type="ring" />
          </Col>
        </Row>
      </Container>
    );
  };

  const getWeapons = () => {
    return (
      <Container className="mb-4">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="weapon" />
          </Col>
          <Col xs={3}>
            <Slot type="weapon" />
          </Col>
          <Col xs={3}>
            <Slot type="arrow" />
          </Col>
        </Row>
      </Container>
    );
  };

  const getMisc = () => {
    return (
      <Container className="mb-3">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="potion_health" />
          </Col>
          <Col xs={3}>
            <Slot type="potion_mana" />
          </Col>
          <Col xs={3}>
            <Slot type="food" />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container className="gear">
      {getName()}
      {getArmor()}
      {getJewels()}
      {getWeapons()}
      {getMisc()}
    </Container>
  );
}
