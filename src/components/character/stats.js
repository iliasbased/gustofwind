import { Container, Row, Col } from "react-bootstrap";

export default function Stats({}) {
  const mainStats = [
    { name: "Strength", value: 0 },
    { name: "Dexterity", value: 0 },
    { name: "Intelligence", value: 0 },
    { name: "Wisdom", value: 0 },
    { name: "Constitution", value: 0 },
    { name: "Perception", value: 0 },
    { name: "Luck", value: 0 },
  ];

  const secondaryStats = [
    { name: "Max. Health", value: 0 },
    { name: "Max. Mana", value: 0 },
    { name: "Health Regen.", value: 0 },
    { name: "Mana Regen.", value: 0 },
    { name: "Min. Damage", value: 0 },
    { name: "Max. Damage", value: 0 },
    { name: "Critical Chance", value: 0 },
    { name: "Critical Damage", value: 0 },
    { name: "Attack Speed", value: 0 },
    { name: "Casting Speed", value: 0 },
    { name: "Hit Chance", value: 0 },
    { name: "Physical Defence", value: 0 },
    { name: "Magical Defence", value: 0 },
    { name: "Critical Defence", value: 0 },
    { name: "Evasion", value: 0 },
    { name: "Block Chance", value: 0 },
  ];

  const resistances = [
    { name: "Fire Resistance", value: 0 },
    { name: "Ice Resistance", value: 0 },
    { name: "Lightning Resistance", value: 0 },
    { name: "Poison Resistance", value: 0 },
    { name: "Dark Resistance", value: 0 },
    { name: "Light Resistance", value: 0 },
    { name: "Earth Resistance", value: 0 },
    { name: "Wind Resistance", value: 0 },
    { name: "Water Resistance", value: 0 },
  ];

  return (
    <Container className="stats">
      <Row>
        <Col>
          {mainStats.map((stat, index) => (
            <Row key={index} className="mb-1">
              <Col xs={7} className="pe-0">
                <Row className="justify-content-end pe-4">{stat.name}</Row>
              </Col>
              <Col xs={5} className="ps-0">
                <Row className="justify-content-start ps-4">{Math.ceil(Math.random() * 10)}</Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-center my-1">
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          {secondaryStats.map((stat, index) => (
            <Row key={index} className="mb-1">
              <Col xs={7} className="pe-0">
                <Row className="justify-content-end pe-4">{stat.name}</Row>
              </Col>
              <Col xs={5} className="ps-0">
                <Row className="justify-content-start ps-4">{Math.ceil(Math.random() * 1000)}</Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          {resistances.map((stat, index) => (
            <Row key={index} className="mb-1">
              <Col xs={7} className="pe-0">
                <Row className="justify-content-end pe-4">{stat.name}</Row>
              </Col>
              <Col xs={5} className="ps-0">
                <Row className="justify-content-start ps-4">{Math.ceil(Math.random() * 1000)}</Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
