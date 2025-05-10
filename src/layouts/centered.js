import { Container, Row, Col } from "react-bootstrap"

export default function SCentered({children}) {
  return (
    <>
      <Container fluid className="main-container">
        <Col className="align-self-center">
          <Row className="justify-content-center">
            <div className="main-div">
              {children}
            </div>
          </Row>
        </Col>
      </Container>
    </>
  );
}
