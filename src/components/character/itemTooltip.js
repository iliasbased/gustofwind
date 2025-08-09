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
      <i
        style={{ fontSize: "18px", lineHeight: "10px", color: "darkgray" }}
      >{`"${item.template.description}"`}</i>
    );
  }

  function getMainStats() {
    let minDamage = item.stats.find((s) => s.id === "min_dmg");
    let maxDamage = item.stats.find((s) => s.id === "max_dmg");
    let physicalRes = item.stats.find((s) => s.id === "physical_res");
    let magicRes = item.stats.find((s) => s.id === "magic_res");

    if (minDamage && maxDamage) {
      return (
        <Row className="mb-2 engraved" style={{ fontSize: "19px" }}>
          <Col xs={6} style={{ textAlign: "center" }}>
            <p className="mb-1">{getStatName(stats, minDamage.id)}</p>
            <p className="impact">{minDamage.value}</p>
          </Col>
          <Col xs={6} style={{ textAlign: "center" }}>
            <p className="mb-1">{getStatName(stats, maxDamage.id)}</p>
            <p className="impact">{maxDamage.value}</p>
          </Col>
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
            {`Physical Defence: `}
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
          {`Magic Defence: `}
          <b style={{ color: "white" }}>{magicRes.value}</b>
        </Row>
      );
    }
  }

  function getSecondaryStats() {
    let itemStats = item.stats.filter(
      (s) =>
        s.id !== "min_dmg" && s.id !== "max_dmg" && s.id !== "physical_res" && s.id !== "magic_res"
    );

    if (itemStats.length === 0) {
      return "";
    }

    return (
      <Row className="engraved justify-content-center" style={{ fontSize: "18px", textAlign: "start" }}>
        <Col style={{width: "max-content", flex:'none'}}>
          {itemStats.map((stat) => (
            <Row key={stat.id} className="mb-2 justify-content-start">
              <span className="impact w-auto fs-6" style={{paddingTop:'1px'}}>+{stat.value}</span>
              {getStatName(stats, stat.id)}
            </Row>
          ))}
        </Col>
      </Row>
    );
  }

  function getPrice() {
    return (
      <Row style={{ fontSize: "16px" }} className="mx-1 impact">
        <Col style={{ textAlign: "end", color: "gold" }}>
          <Image src={`assets/images/items/base/coin.png`} style={{ width: "20px" }} />{" "}
          {item.quantity > 1 ? item.template.basePrice * item.quantity : item.template.basePrice}
        </Col>
      </Row>
    );
  }

  console.log(visible, "Item tooltip visibility");

  return (
    <Container className={visible ? "item-tooltip-show" : "item-tooltip-hide"}>
      <Row>
        <Col xs={9} className="align-self-center">
          {item.quantity > 1 ? `${item.quantity} ` : ""}{item.template.name}
        </Col>
        <Col xs={3}>
          <Image src={item.template.icon} className={"slot-icon-large"} />
        </Col>
      </Row>
      <Container className="item-tooltip-stats p-0">
        <Row className="mb-2">
          <Col style={{ textAlign: "end" }}>{getQuality()}</Col>
        </Row>
        <Row className="mb-4">
          <Col>{getDescription()}</Col>
        </Row>
        <Row className="">
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
