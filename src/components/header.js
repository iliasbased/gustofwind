import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ProgressBar } from "react-bootstrap";
import SFadeInOut from "../layouts/fade-in-out";
import { useEffect, useState } from "react";
import GustBar from "./gustbar";
import Menu from "./menu";
import { getRandomBorderBottomOnly } from "../utilities/borderUtility";
import { useHero } from "../context/heroContext";
import BackButton from "./backButton";

export default function GHeader() {
  const navigate = useNavigate();
  const { hero } = useHero();

  const [characterBorder, setCharacterBorder] = useState({});
  const [questLogBorder, setQuestLogBorder] = useState({});
  const [skillBookBorder, setSkillBookBorder] = useState({});
  const [shopBorder, setShopBorder] = useState({});
  const [tavernBorder, setTavernBorder] = useState({});
  const [craftingBorder, setCraftingBorder] = useState({});

  sessionStorage.setItem("loggedIn", "true");
  useEffect(() => {
    setCharacterBorder(getRandomBorderBottomOnly());
    setQuestLogBorder(getRandomBorderBottomOnly());
    setSkillBookBorder(getRandomBorderBottomOnly());
    setShopBorder(getRandomBorderBottomOnly());
    setTavernBorder(getRandomBorderBottomOnly());
    setCraftingBorder(getRandomBorderBottomOnly());
  }, []);

  return (
    <SFadeInOut fadeOut={window.location.pathname == "/"}>
      {hero ? (
        <Container className="gustofwind-header">
          <Row>
            <Col>
              <GustBar />
            </Col>
            <Col>
              <Container>
                <Row className="justify-content-center">
                  <button
                    className={
                      window.location.pathname == "/character"
                        ? "header-button-active"
                        : "header-button"
                    }
                    onClick={() => {
                      navigate("/character");
                    }}
                    style={characterBorder}
                  >
                    <Image
                      width="35px"
                      src={`/assets/images/items/header/character.png`}
                      className="mt-1 mb-2"
                    />
                  </button>
                  <button
                    className={
                      window.location.pathname == "/questlog"
                        ? "header-button-active"
                        : "header-button"
                    }
                    onClick={() => {
                      navigate("/questlog");
                    }}
                    style={questLogBorder}
                  >
                    <Image
                      width="35px"
                      src={`/assets/images/items/header/questlog.png`}
                      className="mt-1 mb-2"
                    />
                  </button>
                  <button
                    className={
                      window.location.pathname == "/skillbook"
                        ? "header-button-active"
                        : "header-button"
                    }
                    onClick={() => {
                      navigate("/skillbook");
                    }}
                    style={skillBookBorder}
                  >
                    <Image
                      width="35px"
                      src={`/assets/images/items/header/abilities.png`}
                      className="mt-1 mb-2"
                    />
                  </button>
                  <button
                    className={
                      window.location.pathname == "/shop"
                        ? "header-button-active"
                        : "header-button"
                    }
                    onClick={() => {
                      navigate("/shop");
                    }}
                    style={shopBorder}
                  >
                    <Image
                      width="35px"
                      src={`/assets/images/items/header/shop.png`}
                      className="mt-1 mb-2"
                    />
                  </button>
                  <button
                    className={
                      window.location.pathname == "/tavern"
                        ? "header-button-active"
                        : "header-button"
                    }
                    onClick={() => {
                      navigate("/tavern");
                    }}
                    style={tavernBorder}
                  >
                    <Image
                      width="35px"
                      src={`/assets/images/items/header/tavern.png`}
                      className="mt-1 mb-2"
                    />
                  </button>
                  <button
                    className={
                      window.location.pathname == "/crafting"
                        ? "header-button-active"
                        : "header-button"
                    }
                    onClick={() => {
                      navigate("/crafting");
                    }}
                    style={craftingBorder}
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
            <Col className="pe-0"></Col>
          </Row>
        </Container>
      ) : (
        <BackButton style={{margin: '10px'}}/>
      )}
      <Menu />
    </SFadeInOut>
  );
}
