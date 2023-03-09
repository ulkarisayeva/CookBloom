import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Alert } from "react-bootstrap";
import axios from "axios";
import StarRating from "./StarRating";
import { ApiUrl } from "../config";


function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${ApiUrl}/recipes`)
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
    <div>
      <Container className="py-4">
        <Row className="justify-content-center align-items-center">
          <Col>
            <div
              className="allcards"
              style={{ width: "100%", backgroundColor: "#f4eef1" }}
            >
              <h1>Explore CookBloom Recipes</h1>
              <p className="text-align-justify mt-3">
                What's on the menu, today? We believe that cooking and sharing
                food is one of life's greatest pleasures, and we hope that our
                recipes inspire you to try new things and create amazing meals
                for yourself and your loved ones.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="">
          <Card.Body className="text-black p-4">
            <Row className="recipes">
              {error !== "" && (
                <Alert className="mb-3" key={"danger"} variant={"danger"}>
                  {error}
                </Alert>
              )}
              {recipes.map(function (recipe, idx) {
                return (
                  <>
                    <Card
                      className="mb-5 mx-auto"
                      style={{ width: "23rem" }}
                      border="dark"
                    >
                      <Card.Header style={{ backgroundColor: "#fdd3e5" }}>
                        {recipe.meal}
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>{recipe.ingredients}</Card.Text>
                        
                      </Card.Body>
                      <div>
                          <StarRating />
                        </div>
                    </Card>
                  </>
                );
              })}
            </Row>
          </Card.Body>
        </Row>
      </Container>
    </div>
  );
}
export default Recipes;
