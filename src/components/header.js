import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ProgressBar } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { useEffect, useState } from "react";
import GustBar from "./gustbar";

export default function SHeader() {
  const navigate = useNavigate();
  sessionStorage.setItem("loggedIn", "true");
  return (
    <SFadeInOut fadeOut={window.location.pathname == "/"}>
      <Container
        fluid
        style={sessionStorage.getItem("loggedIn") ? { display: "block" } : { display: "none" }}
        className="gustofwind-header"
      >
        <Row>
          <Col xs={5}>
            <GustBar />
          </Col>
          <Col xs={7}>
            <Container>
              <Row className="justify-content-start">
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/player");
                  }}
                  style={
                    window.location.pathname == "/player" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="40px"
                    src={`/assets/images/items/header/character.png`}
                    className="my-1"
                  />
                </button>
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/skillbook");
                  }}
                  style={
                    window.location.pathname == "/skillbook" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="40px"
                    src={`/assets/images/items/header/abilities.png`}
                    className="my-1"
                  />
                </button>
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/questlog");
                  }}
                  style={
                    window.location.pathname == "/questlog" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="40px"
                    src={`/assets/images/items/header/questlog.png`}
                    className="my-1"
                  />
                </button>
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/combat");
                  }}
                  style={
                    window.location.pathname == "/combat" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="40px"
                    src={`/assets/images/items/header/tavern.png`}
                    className="my-1"
                  />
                </button>
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/crafting");
                  }}
                  style={
                    window.location.pathname == "/crafting" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="40px"
                    src={`/assets/images/items/header/crafting.png`}
                    className="my-1"
                  />
                </button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
