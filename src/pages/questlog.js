import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Quests from "../components/questlog/quests";

export default function QuestLog() {
  useEffect(() => {}, []);

  return (
    <Container fluid className="questlog-bg">
      <Image className="book" src={"/assets/images/book2.png"} />
      <Row>
        <Col>
          <Row className="justify-content-center engraved" style={{ paddingTop: "120px", fontSize: '40px' }}>
            Q u e s t   L o g
          </Row>
        </Col>
      </Row>
      <Row className="mt-5"style={{marginLeft:'400px', marginRight:'400px'}}>
        <Col>
          <Quests />
        </Col>
        <Col>
          Calendar
        </Col>
      </Row>
    </Container>
  );
}
