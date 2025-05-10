import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { useEffect, useState } from "react";

export default function SHeader() {
  const navigate = useNavigate();

  return (
    <SFadeInOut fadeOut={window.location.pathname == "/"}>
      <Container
        fluid
        style={sessionStorage.getItem("loggedIn") ? { display: "block" } : { display: "none" }}
        className="gustofwind-header"
      >
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={8}>
            <Container>
              <Row className="justify-content-center">
                <button
                  className="header-button"
                  onClick={() => {
                    navigate("/player");
                  }}
                  style={{ backgroundColor: "#50db7f" }}
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
                    navigate("/gamemaster");
                  }}
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
                    navigate("/gamemaster");
                  }}
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
                    navigate("/gamemaster");
                  }}
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
                    navigate("/gamemaster");
                  }}
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
          <Col xs={2}></Col>
        </Row>
      </Container>
    </SFadeInOut>
  );
}
