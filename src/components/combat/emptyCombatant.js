import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroPortrait from "../hero/heroPortrait";
import ResourceBar from "./resourceBar";
import StatusBar from "./statusBar";

export default function EmptyCombatant({ }) {

  return (
    <Container style={{width:'auto'}}>
      <Row>
        <Col xs={4} className="pe-5 mb-1">
          <Row className="justify-content-end">
            <div className="target-button">
              <HeroPortrait isEmpty />
            </div>
          </Row>
        </Col>
        <Col xs={8}>
          <Row className="justify-content-start mt-1">
            <ResourceBar
              isEmpty
            />
          </Row>
          <Row className="justify-content-start">
            <ResourceBar
              isEmpty
            />
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-start">
        <StatusBar />
      </Row>
      <Row className="justify-content-start">
        <StatusBar />
      </Row>
    </Container>
  );
}
