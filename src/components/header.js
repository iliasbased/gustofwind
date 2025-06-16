import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ProgressBar } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { useEffect, useState } from "react";
import GustBar from "./gustbar";

export default function GHeader() {
  const navigate = useNavigate();
  // sessionStorage.setItem("loggedIn", "true");
  return (
    <SFadeInOut fadeOut={window.location.pathname == "/"}>
      <Container
        style={sessionStorage.getItem("loggedIn") ? { display: "block" } : { display: "none" }}
        className="gustofwind-header"
      >
        <Row>
          <Col>
            <GustBar />
          </Col>
          <Col>
            <Container>
              <Row className="justify-content-center">
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/character");
                  }}
                  style={
                    window.location.pathname == "/character" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="35px"
                    src={`/assets/images/items/header/character.png`}
                    className="mt-1 mb-2"
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
                    width="35px"
                    src={`/assets/images/items/header/questlog.png`}
                    className="mt-1 mb-2"
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
                    width="35px"
                    src={`/assets/images/items/header/abilities.png`}
                    className="mt-1 mb-2"
                  />
                </button>
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/tavern");
                  }}
                  style={
                    window.location.pathname == "/tavern" ? { backgroundColor: "#50db7f" } : {}
                  }
                >
                  <Image
                    width="35px"
                    src={`/assets/images/items/header/tavern.png`}
                    className="mt-1 mb-2"
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
                    width="35px"
                    src={`/assets/images/items/header/crafting.png`}
                    className="mt-1 mb-2"
                  />
                </button>
              </Row>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
