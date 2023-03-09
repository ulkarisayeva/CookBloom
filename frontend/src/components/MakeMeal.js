import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { GrSave } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'


function MakeMeal() {
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [meal, setMeal] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5005/recipe",
        {
          name: name,
          meal: meal,
          ingredients: ingredients,
          instructions: instructions,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        handleClose();
        navigate('/profile', { replace: true });

      })
      .catch((error) => {
        if (error.response?.data) setError(error.response.data["message"]);
        else setError("Something went wrong");
      });
  };

  const handleMakemeal = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5005/generate-recipe",
        {
          meal: meal,
          ingredients: ingredients,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setInstructions(response.data.instructions);
      })
      .catch((error) => {
        if (error.response?.data) setError(error.response.data["message"]);
        else setError("Something went wrong");
      });
  };

  return (
    <div className="recipes" style={{height: "100vh"}}>
      <div className=" recipes mb-5"></div>
      {error !== "" && (
        <Alert className="mb-3" key={"danger"} variant={"danger"}>
          {error}
        </Alert>
      )}
      <InputGroup
        style={{ width: "70%", margin: "auto" }}
        size="lg"
        className="d-flex justify-content-center align-items-center mb-3"
      >
        <Form.Select
          aria-label="Meal"
          onChange={(e) => setMeal(e.target.value)}
        >
          <option>Select meal</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Dessert">Dessert</option>
          <option value="Salad">Salad</option>
          <option value="Soup">Soup</option>
          <option value="Vegetarian">Vegetarian</option>
        </Form.Select>
        <InputTags
          values={ingredients}
          onTags={(value) => setIngredients(value.values)}
        />
      </InputGroup>
      <Button size="lg" onClick={handleMakemeal}>
        Make meal
      </Button>{" "}
      {instructions !== "" && (
        <>
          <Card className="tailor-recipe mt-5">
            <Card.Header as="h5">
              Tailor-made recipe (eat at your own risk)
            </Card.Header>
            <Card.Body>
              <Card.Text className="display-linebreak">
                {instructions}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Button className="mt-3" size="lg" onClick={handleShow}>
            {" "}
            <GrSave /> {" | "} Save
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Name of your recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                onChange={(event) => setName(event.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Recipe
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default MakeMeal;
