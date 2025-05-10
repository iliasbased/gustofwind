import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gear from "../components/character/gear";
import Stats from "../components/character/stats";
import Inventory from "../components/character/inventory";

export default function Character() {
  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col xs={3}></Col>
          <Col xs={3}>
            <Container className="ui-header">
              <Row className="justify-content-center">Character</Row>
            </Container>
          </Col>
          <Col xs={3}></Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
      <Container className="character">
        <Row>
          <Col className="pe-0" xs={3}>
            <Stats />
          </Col>
          <Col className="px-0" xs={3}>
            <Gear />
          </Col>
          <Col className="ps-0" xs={6}>
            <Inventory />
          </Col>
        </Row>
      </Container>
    </>
  );
}
