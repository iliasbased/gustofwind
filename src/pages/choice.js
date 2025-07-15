import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import SButton from "../components/button";
import SFadeInOut from "../layouts/fade-in-out";
import SCentered from "../layouts/centered";
import { Container, Row, Col } from "react-bootstrap";
import GButton from "../components/button";
import { useHero } from "../context/heroContext";

export default function Choice() {
  const [nextPage, setNextPage] = useState("");
  const navigate = useNavigate();

  const { clearHero } = useHero();

  useEffect(() => {
    clearHero();
  }, []);

  return (
    <SFadeInOut
      onFadeOutEnd={() => {
        navigate(nextPage);
      }}
      fadeOut={nextPage != ""}
    >
      <Container style={{ paddingTop: "200px" }}>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row className="justify-content-center engraved mb-4" style={{ fontSize: "40px" }}>
              I am a...
            </Row>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <GButton
            size="large"
            onClick={() => {
              setNextPage("/hero");
            }}
          >
            Hero
          </GButton>
          <GButton
            size="large"
            onClick={() => {
              setNextPage("/gamemaster");
            }}
          >
            Game Master
          </GButton>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
