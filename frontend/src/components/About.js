import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Fimage from "../assets/about3.jpg";
import Simage from "../assets/about4jpg.jpg";
import Timage from "../assets/about5.jpg";
import "./about.css";

function About() {
  return (
    <Container>
      <Row className="about mt-5 mb-5">
        <Col>
          <h1 className="mb-5">About CookBloom</h1>
          <p className="text">
            Welcome to our website!CookBloom is a platform dedicated to
            providing you with delicious and easy-to-follow recipes based on the
            ingredients you have on hand. Our mission is to make cooking
            accessible and enjoyable for everyone, regardless of their level of
            culinary expertise.
            <br />
            At our website, you can search for recipes using the ingredients you
            already have in your kitchen. Simply enter the ingredients you have
            on hand, and we will provide you with a recipe that you can make
            with those ingredients.
            <br />
            Thank you for choosing our website as
            your go-to source for recipe inspiration. We are excited to help you
            discover new and delicious ways to use the ingredients in your
            kitchen.
          </p>
        </Col>
      </Row>

      <Row className="images mt-3">
        <Image
          style={{ width: "31%", height: "10%" }}
          src={Fimage}
          fluid
          thumbnail
          className="image1 img-curve "
        />

        <Image
          style={{ width: "29%", height: "15%" }}
          src={Timage}
          fluid
          thumbnail
          className="image3  img-curve"
        />

        <Image
          style={{ width: "30%", height: "10%" }}
          src={Simage}
          fluid
          thumbnail
          className="image2  img-curve"
        />
      </Row>

      <Row className="about mt-5 mb-5">
        <Col>
          <h2>Meet the Owner</h2>
           <p className="text">
            <br /> Hi there, I'm Ulkar! I started CookBloom as a way to share my passion for cooking
            with others. I've always loved experimenting with new ingredients
            and flavors, and I believe that cooking is a great way to bring
            people together. My goal with CookBloom is to help others discover
            the joy of cooking and to inspire them to create delicious and
            healthy meals at home.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
