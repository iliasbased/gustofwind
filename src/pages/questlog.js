import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function QuestLog() {
  useEffect(() => {}, []);

  return <Container fluid className="questlog-bg">
    <Image className="envelope" src={"/assets/images/envelope.png"}/>
    <Row>
      test
    </Row>
  </Container>;
}
