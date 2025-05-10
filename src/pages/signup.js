import { useState } from "react";
import SFadeInOut from "../layouts/fade-in-out";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SButton from "../components/button";
import SInput from "../components/input";
import AccountService from "../services/account-service";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import SSpeechBubble from "../components/speech-bubble";

export default function SignUp() {
  const [fadeOut, setFadeOut] = useState(false);
  const [onFadeOutEnd, setOnFadeOutEnd] = useState(() => {});
  const [valid, setValid] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();
  const signIn = useSignIn();

  async function login() {
    let response = await new AccountService().attemptLogin(email, password);
    if (
      signIn({
        auth: {
          token: response.token,
          type: "Bearer",
        },
        // refresh: response.token,
        userState: {
          name: "React User",
          uid: 123456,
        },
      })
    ) {
      setOnFadeOutEnd(() => navigate("/"));
      setFadeOut(true);
      return;
    }

    console.log("errorrrrrasdfads");
  }

  function signUp() {
    console.log(name, surname, email, phoneNo, password, passwordConfirm);
    // setFadeOut(true);
  }

  function checkIsValid() {
    let valid = true;

    if (name.length < 2) {

    }

    setValid(valid);
  }

  return (
    <>
      <SFadeInOut fadeOut={fadeOut} onFadeOutEnd={onFadeOutEnd}>
        <Container>
          <Row className="mb-2">
            <Col>
              <SSpeechBubble />
              <SInput
                placeholder="name..."
                type="text"
                style={{ width: "220px", marginRight: "8px" }}
                onChange={(value) => {
                  setName(value);
                  checkIsValid();
                }}
              />
              <SInput
                placeholder="surname..."
                type="text"
                style={{ width: "220px" }}
                onChange={(value) => {
                  setSurname(value);
                  checkIsValid();
                }}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <SInput
                placeholder="email..."
                type="text"
                onChange={(value) => {
                  setEmail(value);
                  checkIsValid();
                }}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <SInput
                placeholder="password..."
                type="password"
                onChange={(value) => {
                  setPassword(value);
                  checkIsValid();
                }}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <SInput
                placeholder="password again..."
                type="password"
                onChange={(value) => {
                  setPasswordConfirm(value);
                  checkIsValid();
                }}
              />
            </Col>
          </Row>
          <Row className="mb-0">
            <Col>
              <SButton size="medium" disabled={!valid} onClick={signUp} activateOnEnter>
                sign up
              </SButton>
            </Col>
          </Row>
        </Container>
      </SFadeInOut>
    </>
  );
}
