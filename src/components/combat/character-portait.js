import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function CharacterPortait({ character }) {
  useEffect(() => {}, [character]);

  const getHpBar = () => {
    const hpPercentage = (character.currentHealth / character.maxHealth) * 100;
    const hpBarStyle = {
      height: "5px",
      borderRadius: "5px",
      width: `${hpPercentage}%`,
      backgroundColor: hpPercentage > 50 ? "green" : hpPercentage > 20 ? "yellow" : "red",
    };

    return (
      <div className="hp-bar">
        <div className="hp-bar-fill" style={hpBarStyle}></div>
      </div>
    );
  };

  const getStats = () => {
    return (
      <>
        <Row className="justify-content-start px-3">
          {`❤️ ${character.currentHealth}/${character.maxHealth}`}
        </Row>
        <Row className="justify-content-start px-3">{`⚔️ ${character.minDamage} - ${character.maxDamage}`}</Row>
      </>
    );
  };

  return (
    <>
      <Container className="character-portrait">
        <Row className="justify-content-center mb-2">{character.name}</Row>
        <Row className="justify-content-center">{getHpBar()}</Row>
        <hr />
        {getStats()}
      </Container>
    </>
  );
}
