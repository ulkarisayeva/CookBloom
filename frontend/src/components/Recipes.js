import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import StarRating from "./StarRating";
import { ApiUrl } from "../config";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [meal, setMeal] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    let recipe = recipes[e.target.dataset.id];

    setName(recipe.name);
    setMeal(recipe.meal);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);

    setShow(true);
  };

  useEffect(() => {
    axios
      .get(`${ApiUrl}/recipes`)
      .then((response) => {
        let recipes = {};
        for (const recipe of response.data.recipes) {
          recipes[recipe._id] = recipe;
        }
        setRecipes(recipes);
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
              {Object.values(recipes).map(function (recipe, idx) {
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
                        <Card.Title>
                          <Link className="recipe-title" onClick={handleShow} data-id={recipe._id}>
                            {recipe.name}
                          </Link>
                        </Card.Title>
                        <Card.Text>{recipe.ingredients}</Card.Text>
                        <Card.Text>by <i>{recipe.user.fullname}</i></Card.Text>
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="display-linebreak">
            <b>Meal:</b> {meal} <hr />
            <b>Ingredient:</b> {ingredients} <hr />
            <b>Instructions:</b> <br />
            {instructions.replace("\n\n", "\n")}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
export default Recipes;
