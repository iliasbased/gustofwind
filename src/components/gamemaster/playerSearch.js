import { getRandomBorderSubtle } from "../../utilities";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { faRotate, faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getPlayerByName, sendGamemasterInvite } from "../../services/playerService";

export default function PlayerSearch({}) {
  const [borderStyle, setBorderStyle] = useState({});
  const [buttonBorder, setButtonBorder] = useState({});
  const [textColor, setTextColor] = useState({});
  const [status, setStatus] = useState("idle");
  const [searchValue, setSearchValue] = useState("");
  const [foundPlayer, setFoundPlayer] = useState(null);
  const [buttonText, setButtonText] = useState("+");
  const [buttonWidth, setButtonWidth] = useState({});
  const debounceRef = useRef(null);

  useEffect(() => {
    setBorderStyle(getRandomBorderSubtle());
    setButtonBorder(getRandomBorderSubtle());
  }, []);

  function getStatusIcon() {
    if (status === "loading") {
      return (
        <FontAwesomeIcon
          className="search-status"
          icon={faRotate}
          size="lg"
          spin
          style={{ color: "#f78c00" }}
        />
      );
    }

    if (status === "success") {
      return (
        <FontAwesomeIcon
          className="search-status"
          icon={faCheck}
          size="lg"
          style={{ color: "rgb(80, 219, 127)" }}
        />
      );
    }

    if (status === "fail") {
      return (
        <FontAwesomeIcon
          className="search-status"
          icon={faXmark}
          size="lg"
          style={{ color: "rgb(219, 110, 106)" }}
        />
      );
    }

    return (
      <FontAwesomeIcon
        className="search-status"
        icon={faRotate}
        size="lg"
        spin
        style={{ opacity: 0 }}
      />
    );
  }

  function onUserTyping(e) {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z]/g, "");
    value = value.substring(0, 20);
    setSearchValue(value);

    setFoundPlayer(null);
    setTextColor({});
    setStatus("loading");
    setButtonText("+");
    setButtonWidth({});

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (value.trim() === "") {
        setStatus("idle");
        return;
      }

      findPlayer(value);
    }, 1000);
  }

  async function findPlayer(name) {
    let player = await getPlayerByName(name);

    if (player.id) {
      setStatus("success");
      setTextColor({ color: "rgb(80, 219, 127)" });
      setFoundPlayer(player);
    } else {
      setStatus("fail");
      setTextColor({ color: "rgb(219, 110, 106)" });
    }
  }

  async function sendInvite() {
    let result = await sendGamemasterInvite(foundPlayer.id);
    setButtonText(result.status);
    setButtonWidth({ width: "90px", fontSize: "16px", fontWeight: "normal" });

    setTimeout(() => {
      setButtonText("+");
      setButtonWidth({});
    }, 1500);
  }

  return (
    <Container>
      <Row className="px-3 justify-content-center mb-4">
        <input
          style={{ ...textColor, ...borderStyle }}
          className="search-input"
          type="text"
          value={searchValue}
          maxLength={20}
          placeholder="Find a new player..."
          onChange={onUserTyping}
          spellCheck="false"
        />
        {getStatusIcon()}
        <button
          style={{...buttonWidth, ...buttonBorder}}
          className="search-button"
          disabled={status != "success"}
          onClick={() => sendInvite()}
        >
          {buttonText}
        </button>
      </Row>
    </Container>
  );
}
