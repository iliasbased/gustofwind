import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";

export default function Adventure({ adventure, onClickToEnter }) {
  const [textColor, setTextColor] = useState("white");
  const [textOpacity, setTextOpacity] = useState(0);


  return (
    <Container className="adventure-container" style={{ color: textColor }}>
      <Row className="adventure-name">
        <Col xs={5}></Col>
        <Col xs={7}>
          <Row className="justify-content-center">{adventure.name}</Row>
        </Col>
      </Row>
      <Row className="adventure-description my-2">
        <Col xs={5}></Col>
        <Col xs={7}>{adventure.description}</Col>
      </Row>
      <Row>
        <Col xs={5}></Col>
        <Col xs={7}>
          <Image
            className="adventure-image"
            width="100%"
            src={adventure.img}
            onMouseEnter={() => {
              setTextColor("#50db7f");
              setTextOpacity(1);
            }}
            onClick={()=>onClickToEnter(adventure)}
            onMouseLeave={() => {
              setTextColor("white");
              setTextOpacity(0);
            }}
          />
        </Col>
      </Row>
      <div className="adventure-hover-text engraved" style={{opacity: textOpacity}}>Click to Enter</div>
    </Container>
  );
}
