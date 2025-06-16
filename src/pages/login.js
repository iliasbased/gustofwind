import { useState } from "react";
import SFadeInOut from "../layouts/fade-in-out";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SButton from "../components/button";
import SInput from "../components/input";
import AccountService from "../services/account-service";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import SCentered from "../layouts/centered";

export default function Login() {
  const [fadeOut, setFadeOut] = useState(false);
  const [onFadeOutEnd, setOnFadeOutEnd] = useState(() => {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const signIn = useSignIn();

  async function login() {
    // let response = await new AccountService().attemptLogin(email, password);
    if (true/* 
      signIn({
        auth: {
          token: response.token,
          type: "Bearer",
        },
        expiresIn: 3600,
        authState: {
          name: "React User",
          uid: 123456,
        },
      }) */
    ) {
      setOnFadeOutEnd(() => navigate("/choice"));
      setFadeOut(true);
      return;
    }

    //report error
  }

  function signUp() {
    setOnFadeOutEnd(() => navigate("/signup"));
    setFadeOut(true);
  }

  function forgotPassword() {
    setOnFadeOutEnd(() => navigate("/forgotpassword"));
    setFadeOut(true);
  }

  return (
    <SCentered>
      <SFadeInOut fadeOut={fadeOut} onFadeOutEnd={onFadeOutEnd}>
        <Container className="gustofwind-login">
          <Row className="mb-2">
            <Col>
              <SInput placeholder="email..." type="text" onChange={setEmail} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <SInput placeholder="password..." type="password" onChange={setPassword} />
            </Col>
          </Row>
          <Row className="mb-0">
            <Col>
              <SButton
                size="medium"
                disabled={email.trim() === "" || password.trim() === ""}
                onClick={login}
              >
                log in
              </SButton>
            </Col>
          </Row>
          <Row>
            <Col xs={7}>
              <span className="solidarity-undertext m-1">
                don't have an account yet? <span className="solidarity-link" onClick={signUp}>sign up</span>
              </span>
            </Col>
            <Col xs={5} style={{ textAlign: "end" }}>
              <span className="solidarity-undertext solidarity-link-bad m-1" onClick={forgotPassword}>
                forgot my password
              </span>
            </Col>
          </Row>
        </Container>
      </SFadeInOut>
    </SCentered>
  );
}
