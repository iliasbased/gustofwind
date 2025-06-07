import { Container, Row, Col, Image } from "react-bootstrap";
import { getStatName, useStats } from "../../context/statsContext";

export default function ItemTooltip({ item, visible }) {
  const { stats } = useStats();

  function getQuality() {
    let color = "";
    switch (item.template.quality) {
      case "common":
        color = "DarkGray";
        break;
      case "uncommon":
        color = "Green";
        break;
      case "rare":
        color = "Blue";
        break;
      case "epic":
        color = "Purple";
        break;
      case "legendary":
        color = "Yellow";
    }

    return (
      <b style={{ color: color, fontSize: "15px", textAlign: "end" }}>
        {`${item.template.quality} ${item.template.type}`.toUpperCase()}
      </b>
    );
  }

  function getDescription() {
    return (
      <i style={{ fontSize: "18px", lineHeight: "10px", color: 'darkgray' }}>{`"${item.template.description}"`}</i>
    );
  }

  function getMainStats() {
    let minDamage = item.stats.find((s) => s.id === "min_damage");
    let maxDamage = item.stats.find((s) => s.id === "max_damage");
    let physicalRes = item.stats.find((s) => s.id === "physical_res");
    let magicRes = item.stats.find((s) => s.id === "magic_res");

    if (minDamage && maxDamage) {
      return (
        <Row
          className="justify-content-center"
          style={{ fontSize: "20px", color: "DarkGray", textAlign: "center" }}
        >
          {`Damage: `}
          <b style={{ color: "white" }}>{`${minDamage.value} - ${maxDamage.value}`}</b>
        </Row>
      );
    }

    if (physicalRes) {
      return (
        <Row
          className="justify-content-center"
          style={{ fontSize: "20px", color: "DarkGray", textAlign: "center" }}
        >
          <span>
            {`Physical Resistance: `}
            <b style={{ color: "white" }}>{physicalRes.value}</b>
          </span>
        </Row>
      );
    }

    if (magicRes) {
      return (
        <Row
          className="justify-content-center"
          style={{ fontSize: "20px", color: "DarkGray", textAlign: "center" }}
        >
          {`Magic Resistance: `}
          <b style={{ color: "white" }}>{magicRes.value}</b>
        </Row>
      );
    }
  }

  function getSecondaryStats() {
    let itemStats = item.stats.filter(
      (s) =>
        s.id !== "min_damage" &&
        s.id !== "max_damage" &&
        s.id !== "physical_res" &&
        s.id !== "magic_res"
    );

    if (itemStats.length === 0) {
      return "";
    }

    return (
      <Row className="engraved" style={{ fontSize: "20px", textAlign: "start" }}>
        <Col>
          {itemStats.map((stat) => (
            <Row key={stat.id}>
              <Col xs={6} style={{ textAlign: "end", fontWeight:'bold' }}>{getStatName(stats, stat.id)}</Col>
              <Col xs={6} style={{ textAlign: "start" }}>
                <span className="impact" style={{ color: "white" }}>{stat.value}</span>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    );
  }

  function getPrice() {
    return (
      <Row style={{ fontSize: "16px" }} className="mx-1 impact">
        <Col style={{ textAlign: "end" }}>
          <Image src={`assets/images/items/base/coin.png`} style={{ width: "20px" }} />
          {" "}
          {item.template.basePrice}
        </Col>
      </Row>
    );
  }

  return (
    <Container className={visible ? "item-tooltip-show" : "item-tooltip-hide"}>
      <Row>
        <Col xs={9} className="align-self-center">{item.template.name}</Col>
        <Col xs={3}>
          <Image src={item.template.icon} className={"slot-icon-large"} />
        </Col>
      </Row>
      <Container className="item-tooltip-stats p-0">
        <Row className="mb-2">
          <Col style={{ textAlign: "end" }}>{getQuality()}</Col>
        </Row>
        <Row className="mb-3">
          <Col>{getDescription()}</Col>
        </Row>
        <Row className="mb-3">
          <Col>{getMainStats()}</Col>
        </Row>
        <Row className="mb-4">
          <Col>{getSecondaryStats()}</Col>
        </Row>
        <Row className="mb-1">
          <Col>{getPrice()}</Col>
        </Row>
      </Container>
    </Container>
  );
}
