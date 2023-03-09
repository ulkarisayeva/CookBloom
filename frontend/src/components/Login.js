import { Alert, Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { ApiUrl } from "../config";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${ApiUrl}/login`, {
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
      <Container  className="py-5" >
        <Row className="d-flex justify-content-center align-items-center mb-5">
          <Col md={8} lg={4} xs={12}>
            <div className="border border-3 "></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">CookBloom</h2>
                  { error !== "" &&
                    <Alert key={'info'} variant={'info'}>
                      {error}
                    </Alert>
                  }
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
                        <Form.Label className="text-left">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required onChange={(event) => setEmail(event.target.value)}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={(event) => setPassword(event.target.value)} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className= "d-grid">
                        <Button  className="btn-lr" variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="link mb-0  text-center">
                        Don't have an account?{" "}
                        <a href={'/register'} className="text-primary fw-bold">
                          Sign Up
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