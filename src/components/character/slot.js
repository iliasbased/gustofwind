import { Container, Row, Col, Image } from "react-bootstrap";

export default function Slot({ type, disabled }) {
  const empty = true;

  const getEmptyIcon = () => {
    return <Image src={`/assets/images/items/base/${type}.png`} className="slot-icon-empty" />;
  };

  const getEquippedItem = () => {
    // return <Image src={'weapon'} className="slot-icon" />;
  };

  if (type == "bag") {
    return (
      <Container className={disabled ? "slot-bag-disabled" : "slot-bag"}>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="slot">
      <Row>
        <Col>{empty ? getEmptyIcon() : getEquippedItem}</Col>
      </Row>
    </Container>
  );
}
