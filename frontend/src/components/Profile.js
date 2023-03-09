import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Image,
  Button,
  Alert,
} from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

export default function EditButton() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5005/recipe/${e.target.dataset.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setRecipes(
          recipes.filter(function (recipe) {
            return recipe._id !== e.target.dataset.id;
          })
        );
        setError("");
      })
      .catch((error) => {
        if (error.response?.data) setError(error.response.data["message"]);
        else setError("Something went wrong");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5005/saved-recipes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setRecipes(response.data.recipes);
        setError("");
      })
      .catch((error) => {
        if (error.response?.data) setError(error.response.data["message"]);
        else setError("Something went wrong");
      });
  }, []);

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
                    <p className="mb-1 h5">{recipes.length}</p>
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
                </div>
                <Row className="recipes">
                  {error !== "" && (
                    <Alert className="mb-3" key={"danger"} variant={"danger"}>
                      {error}
                    </Alert>
                  )}
                  {recipes.map(function (recipe, idx) {
                    return (
                      <>
                        <Card className="mb-2 mx-auto" style={{ width: "40%" }}>
                          <Card.Body>
                            <Card.Title>{recipe.name}</Card.Title>
                            <Card.Text>{recipe.ingredients}</Card.Text>
                            <Button
                              className="mt-3"
                              data-id={recipe._id}
                              onClick={handleDelete}
                            >
                              {" "}
                              <RiDeleteBin6Line /> {" | "} Delete
                            </Button>
                          </Card.Body>
                        </Card>
                      </>
                    );
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
