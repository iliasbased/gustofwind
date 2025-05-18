import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Stats({}) {
  const [mainStats, setMainStats] = useState([]);
  const [secondaryStats, setSecondaryStats] = useState([]);
  const [resistances, setResistances] = useState([]);

  useEffect(() => {
    setMainStats([
      { name: "Strength", value: Math.ceil(Math.random() * 10) },
      { name: "Dexterity", value: Math.ceil(Math.random() * 10) },
      { name: "Intelligence", value: Math.ceil(Math.random() * 10) },
      { name: "Wisdom", value: Math.ceil(Math.random() * 10) },
      { name: "Constitution", value: Math.ceil(Math.random() * 10) },
      { name: "Perception", value: Math.ceil(Math.random() * 10) },
      { name: "Luck", value: Math.ceil(Math.random() * 10) },
    ]);

    setSecondaryStats([
      { name: "Max. Health", value: Math.ceil(Math.random() * 1000) },
      { name: "Max. Mana", value: Math.ceil(Math.random() * 1000) },
      { name: "Health Regen.", value: Math.ceil(Math.random() * 1000) },
      { name: "Mana Regen.", value: Math.ceil(Math.random() * 1000) },
      { name: "Min. Damage", value: Math.ceil(Math.random() * 1000) },
      { name: "Max. Damage", value: Math.ceil(Math.random() * 1000) },
      { name: "Critical Chance", value: Math.ceil(Math.random() * 1000) },
      { name: "Critical Damage", value: Math.ceil(Math.random() * 1000) },
      { name: "Attack Speed", value: Math.ceil(Math.random() * 1000) },
      { name: "Casting Speed", value: Math.ceil(Math.random() * 1000) },
      { name: "Hit Chance", value: Math.ceil(Math.random() * 1000) },
      { name: "Physical Defence", value: Math.ceil(Math.random() * 1000) },
      { name: "Magical Defence", value: Math.ceil(Math.random() * 1000) },
      { name: "Critical Defence", value: Math.ceil(Math.random() * 1000) },
      { name: "Evasion", value: Math.ceil(Math.random() * 1000) },
      { name: "Block Chance", value: Math.ceil(Math.random() * 1000) },
    ]);

    setResistances([
      { name: "Fire Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Ice Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Lightning Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Poison Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Dark Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Light Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Earth Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Wind Resistance", value: Math.ceil(Math.random() * 1000) },
      { name: "Water Resistance", value: Math.ceil(Math.random() * 1000) },
    ]);
  }, []);

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
                <Row className="justify-content-start ps-4">{stat.value}</Row>
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
                <Row className="justify-content-start ps-4">{stat.value}</Row>
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
                <Row className="justify-content-start ps-4">{stat.value}</Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
