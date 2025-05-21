import { use } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";

export default function Stats({equippedItems}) {
  let {mainStats, secondaryStats, resistances} = usePlayerStats(equippedItems);

  return (
    <Container className="stats">
      <Row>
        <Col>
          {mainStats.map((stat, index) => (
            <Row key={index} className="mb-1">
              <Col xs={7} className="pe-0">
                <Row className="justify-content-end pe-4">{stat.text}</Row>
              </Col>
              <Col xs={5} className="ps-0">
                <Row className="justify-content-start ps-4">{Math.round((stat.value + Number.EPSILON) * 100) / 100}</Row>
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
                <Row className="justify-content-end pe-4">{stat.text}</Row>
              </Col>
              <Col xs={5} className="ps-0">
                <Row className="justify-content-start ps-4">{Math.round((stat.value + Number.EPSILON) * 100) / 100}</Row>
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
                <Row className="justify-content-end pe-4">{stat.text}</Row>
              </Col>
              <Col xs={5} className="ps-0">
                <Row className="justify-content-start ps-4">{Math.round((stat.value + Number.EPSILON) * 100) / 100}</Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
