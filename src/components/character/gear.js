import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import Slot from "./slot";
import { usePlayerItems } from "../../hooks/usePlayerItems";
import { PlayerDataContext } from "../../pages/character";

export default function Gear() {
  const { playerItems } = useContext(PlayerDataContext);

  const getName = () => {
    return (
      <Container className="mb-2 my-1 gear-name">
        <Row className="justify-content-center">Norewind</Row>
      </Container>
    );
  };

  const getArmor = () => {
    return (
      <Container className="mb-4">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}></Col>
          <Col xs={3}>
            <Slot type="head" id={'head0'} item={playerItems.find((item)=>item.slot=='head0')}/>
          </Col>
          <Col xs={3}></Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="shoulders" id={'shoulders0'} item={playerItems.find((item)=>item.slot=='shoulders0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="chest" id={'chest0'} item={playerItems.find((item)=>item.slot=='chest0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="cloak" id={'cloak0'} item={playerItems.find((item)=>item.slot=='cloak0')}/>
          </Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="belt" id={'belt0'} item={playerItems.find((item)=>item.slot=='belt0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="legs" id={'legs0'} item={playerItems.find((item)=>item.slot=='legs0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="gloves" id={'gloves0'} item={playerItems.find((item)=>item.slot=='gloves0')}/>
          </Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}></Col>
          <Col xs={3}>
            <Slot type="boots" id={'boots0'} item={playerItems.find((item)=>item.slot=='boots0')}/>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    );
  };

  const getJewels = () => {
    return (
      <Container className="mb-4">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="necklace" id={'necklace0'} item={playerItems.find((item)=>item.slot=='necklace0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="earring" id={'earring0'} item={playerItems.find((item)=>item.slot=='earring0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="earring" id={'earring1'} item={playerItems.find((item)=>item.slot=='earring1')}/>
          </Col>
        </Row>
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="bracelet" id={'bracelet0'} item={playerItems.find((item)=>item.slot=='bracelet0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="ring" id={'ring0'} item={playerItems.find((item)=>item.slot=='ring0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="ring" id={'ring1'} item={playerItems.find((item)=>item.slot=='ring1')}/>
          </Col>
        </Row>
      </Container>
    );
  };

  const getWeapons = () => {
    return (
      <Container className="mb-4">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="weapon" id={'weapon0'} item={playerItems.find((item)=>item.slot=='weapon0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="weapon" id={'weapon1'} item={playerItems.find((item)=>item.slot=='weapon1')}/>
          </Col>
          <Col xs={3}>
            <Slot type="arrow" id={'arrow0'} item={playerItems.find((item)=>item.slot=='arrow0')}/>
          </Col>
        </Row>
      </Container>
    );
  };

  const getMisc = () => {
    return (
      <Container className="mb-3">
        <Row className="mb-1 justify-content-center">
          <Col xs={3}>
            <Slot type="potion_health" id={'potion_health0'} item={playerItems.find((item)=>item.slot=='potion_health0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="potion_mana" id={'potion_mana0'} item={playerItems.find((item)=>item.slot=='potion_mana0')}/>
          </Col>
          <Col xs={3}>
            <Slot type="misc" id={'misc0'} item={playerItems.find((item)=>item.slot=='misc0')}/>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container className="gear">
      {getName()}
      {getArmor()}
      {getJewels()}
      {getWeapons()}
      {getMisc()}
    </Container>
  );
}
