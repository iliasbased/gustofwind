import { Container, Row, Col, Image } from "react-bootstrap";

export default function ItemTooltip({ item, visible }) {
  function getType() {
    switch (item.type) {
      case "head":
        return "Head";
      case "shoulders":
        return "Shoulders";
      case "chest":
        return "Chest";
      case "cloak":
        return "Cloak";
      case "belt":
        return "Belt";
      case "legs":
        return "Legs";
      case "gloves":
        return "Gloves";
      case "boots":
        return "Boots";
      case "ring":
        return "Ring";
      case "amulet":
        return "Amulet";
      default:
        return "";
    }
  }
  function getRarity() {
    let color = "";
    switch (item.rarity) {
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

    return <span style={{ color: color, fontSize: "18px" }}>{`Common ${getType()}`}</span>;
  }

  function getDescription() {
    return <i style={{ fontSize: "18px" }}>{`"${item.description}"`}</i>;
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
    let stats = item.stats.filter(
      (s) =>
        s.id !== "min_damage" &&
        s.id !== "max_damage" &&
        s.id !== "physical_res" &&
        s.id !== "magic_res"
    );

    if (stats.length === 0) {
      return "";
    }

    return (
      <Row style={{ fontSize: "20px", color: "DarkGray", textAlign: "start" }}>
        <Col>
          {stats.map((stat) => (
            <Row key={stat.id}>
              <Col xs={8}>{`${stat.text}: `}</Col>
              <Col xs={4}>
                <b style={{ color: "white" }}>{stat.value}</b>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    );
  }

  return (
    <Container className={visible ? "item-tooltip-show" : "item-tooltip-hide"}>
      <Row>
        <Col xs={9}>{item.name}</Col>
        <Col xs={3}>
          <Image src={item.img} className={"slot-icon"} />
        </Col>
      </Row>
      <Container className="item-tooltip-stats p-0">
        <Row>
          <Col>{getRarity()}</Col>
        </Row>
        <Row>
          <Col>{getDescription()}</Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>{getMainStats()}</Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>{getSecondaryStats()}</Col>
        </Row>
      </Container>
    </Container>
  );
}
