import getRandomBorder from "../utilities";
import { useState, useEffect, useRef } from "react";

export default function HeroSelectButton({ hero }) {
  const [buttonStyle, setButtonStyle] = useState({});
  const buttonRef = useRef(null);

  useEffect(() => {
    setButtonStyle(getRandomBorder());

    if (activateOnEnter) {
      document.addEventListener("keypress", onEnterPressed);
    }
  }, []);

  function onEnterPressed(e) {
    if (buttonRef.current.disabled) return;

    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
    <button
      className="hero-select-button"
      style={borderStyle}
      onClick={() => {
        setNextPage("/hero");
      }}
    >
      <Container>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Row>{hero.name}</Row>
            <Row>{/* gustbar */}</Row>
          </Col>
          <Col xs={4}>
          <Row>
            level
          </Row>
          </Col>
        </Row>
      </Container>
    </button>
  );
}
