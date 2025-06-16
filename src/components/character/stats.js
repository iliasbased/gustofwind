import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { PlayerDataContext } from "../../pages/character";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export default function Stats() {
  let { playerStats } = useContext(PlayerDataContext);

  if (!playerStats || playerStats.length === 0) {
    return "";
  }

  return (
    <Container className="stats p-0">
      <PerfectScrollbar className="perfect-scrollbar py-3">
        <Container>
          <Row>
            <Col>
              {getStatRow("str", playerStats)}
              {getStatRow("dex", playerStats)}
              {getStatRow("int", playerStats)}
              {getStatRow("wis", playerStats)}
              {getStatRow("con", playerStats)}
              {getStatRow("per", playerStats)}
              {getStatRow("luc", playerStats)}
              <hr />
              {getStatRow("max_hp", playerStats)}
              {getStatRow("max_mp", playerStats)}
              {getStatRow("hp_regen", playerStats)}
              {getStatRow("mp_regen", playerStats)}
              <hr />
              {getStatRow("min_dmg", playerStats)}
              {getStatRow("max_dmg", playerStats)}
              {getStatRow("phys_dmg", playerStats)}
              {getStatRow("magic_dmg", playerStats)}
              <hr />
              {getStatRow("crit_chance", playerStats)}
              {getStatRow("crit_dmg", playerStats)}
              {getStatRow("hit_chance", playerStats)}
              {getStatRow("block_pen", playerStats)}
              <hr />
              {getStatRow("phys_def", playerStats)}
              {getStatRow("magic_def", playerStats)}
              {getStatRow("evasion", playerStats)}
              {getStatRow("block_chance", playerStats)}
              {getStatRow("crit_def", playerStats)}
              <hr />
              {getStatRow("fire_res", playerStats)}
              {getStatRow("frost_res", playerStats)}
              {getStatRow("light_res", playerStats)}
              {getStatRow("dark_res", playerStats)}
              {getStatRow("poison_res", playerStats)}
            </Col>
          </Row>
        </Container>
      </PerfectScrollbar>
    </Container>
  );
}

function getStatRow(statId, stats) {
  return (
    <Row className="mb-1">
      <Col xs={7} className="pe-0">
        <Row className="justify-content-end pe-4 engraved">{stats.find((e) => e.id == statId).name}</Row>
      </Col>
      <Col xs={5} className="ps-0">
        <Row className="justify-content-start ps-4 engraved" style={{ fontFamily: "Impact" }}>
          {Math.round((stats.find((e) => e.id == statId).value + Number.EPSILON) * 100) / 100}
        </Row>
      </Col>
    </Row>
  );
}
