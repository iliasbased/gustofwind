import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { useEffect, useState } from "react";

export default function GFooter() {
  const navigate = useNavigate();

  return (
    <SFadeInOut fadeOut={window.location.pathname == "/"}>
      <Container
        fluid
        style={sessionStorage.getItem("loggedIn") ? { display: "block" } : { display: "none" }}
        className="gustofwind-footer"
      >
        <Row>
          <Col xs={2} className="pb-1 ps-2">
            Gust of Wind
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
