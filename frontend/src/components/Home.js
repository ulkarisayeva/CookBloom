import Card from 'react-bootstrap/Card';
import HomeImg from "../assets/pexels.jpg"
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {GiMeal, GiCookingPot, GiCook}  from 'react-icons/gi';
import {HiOutlineSaveAs} from 'react-icons/hi';


function Home() {


  return (
    <div>
       <Card className=" text-white">
          <Card.Img className="cont-home img-responsive pull-right mh-30 img-fluid " 
          src={HomeImg} alt="Card image" />
          <Card.ImgOverlay className="centered">
            <Card.Title> <h1> BRINGING DELICIOUS RECIPES TO YOUR FINGERTIPS!</h1> </Card.Title>
            <Card.Text>Search recipes with your ingredients</Card.Text>
             <Button   size="lg" className="btn-make" href='./recipes'  variant="light" >

              < GiCook/> {" "} Make your meal
        
             </Button>{' '}
          </Card.ImgOverlay>

        </Card>
    <br />
        <h1>How It Works?</h1>
 <div className='mt-5 mb-5 d-flex  align-items-center justify-content-center position-relative'>
        
        <Row>
          <Col>
          <h1>  <GiMeal /> </h1>
            <Card style={{borderRadius: "30px" }}  className="home p-4">
              <Card.Body >
                <Card.Title></Card.Title>
                <Card.Text>
                Our wide selection of meals gives you plenty of options to choose from.  
                Select a variety of meals, including salad, appetizer etc, to cater to all your daily preferences.                </Card.Text>
              </Card.Body>
            </Card>    
          </Col>
           <Col>
           <h1>  <GiCookingPot /> </h1>
             <Card style={{ borderRadius: "30px"  }} className="home  p-4">
              <Card.Body  >
                <Card.Title></Card.Title>
                <Card.Text className='mx-auto'>
                Discover recipes by simply inputting the ingredients you have in your
              fridge. Our platform guides you through the cooking process with step-by-step instructions.
                </Card.Text>
              </Card.Body>
             </Card>     
           </Col>
            <Col>
            <h1> <HiOutlineSaveAs /> </h1>
             <Card style={{borderRadius: "30px" }} className="home p-4">
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                Click "save" on the recipe page to add it to your personal collection. 
                This feature allows for easy access to your favorite dishes without the need for searching.
                </Card.Text>
              </Card.Body>
             </Card>     
             </Col>
       </Row>
</div>
       

    </div>
    
    
  );
}

export default Home;