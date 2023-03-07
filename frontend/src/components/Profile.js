import React from "react";
import { Col, Container, Row, Card, Image, Button } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrSave } from "react-icons/gr";

export default function EditButton() {
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#fdd3e5" }}>
      <Container className="py-5">
        <Row className="justify-content-center align-items-center">
          <Col lg="9" xl="7">
            <Card>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <Image
                    src={`https://ui-avatars.com/api/?background=f4eef1&color=000000&name=${localStorage.getItem(
                      "fullname"
                    )}`}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <Button
                    className="btn-lr"
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Edit profile
                  </Button>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h2 tag="h5">{localStorage.getItem("fullname")}</h2>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">Number</p>
                    <p className="small text-muted mb-0">Recipes</p>
                  </div>
                  {/* <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div> */}
                </div>
              </div>
              <Card.Body className="text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Saved Recipes</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p>
                </div>
                <Row className="recipes">
                  <Card className="mb-2 mx-auto" style={{ width: "40%" }}>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button className="mt-3">
                        {" "}
                        <RiDeleteBin6Line /> {" | "} Delete
                      </Button>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2 mx-auto" style={{ width: "40%" }}>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button className="mt-3">
                        {" "}
                        <RiDeleteBin6Line /> {" | "} Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
