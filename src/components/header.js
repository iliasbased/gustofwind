import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { useEffect, useState } from "react";

export default function SHeader() {
  const navigate = useNavigate();

  return (
    <SFadeInOut fadeOut={window.location.pathname == "/"}>
      <Container
        style={sessionStorage.getItem("loggedIn") ? { display: "block" } : { display: "none" }}
        className="solidarity-header"
      >
        <Row>
          <Col className="p-1">
            Gust of Wind
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
