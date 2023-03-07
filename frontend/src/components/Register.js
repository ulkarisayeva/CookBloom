import { useState } from "react";
import { Alert, Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5005/register', {
      "fullname": fullname,
      "email": email,
      "password": password
    }).then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('fullname', response.data.user.fullname);
      navigate('/', { replace: true });
    }).catch(error => {
      if (error.response?.data) setError(error.response.data["message"]);
      else setError("Something went wrong");
    });
  };

  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col md={8} lg={4} xs={12}>
            <div className="border border-3"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-4 text-uppercase ">Register</h2>
                  { error !== "" &&
                    <Alert key={'danger'} variant={'danger'}>
                      {error}
                    </Alert>
                  }
                  
                  <div className="mb-3">
                    <Form onSubmit={registerSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicFullname">
                        <Form.Label className="text-left">
                          Fullname
                        </Form.Label>
                        <Form.Control type="text" required onChange={(event) => setFullname(event.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" required onChange={(event) => setEmail(event.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" minLength="6" required onChange={(event) => setPassword(event.target.value)} />
                      </Form.Group>
                      <div className="d-grid">
                        <Button   className="btn-lr" variant="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className=" link mb-0  text-center">
                        Do you have an account?{" "}
                        <a href={'/login'} className="text-primary fw-bold">
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Register