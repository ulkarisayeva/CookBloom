import React from 'react';
import { Button, Container } from "react-bootstrap";
import {BsGithub} from 'react-icons/bs';
import {SiLinkedin} from 'react-icons/si';
import {MdEmail} from 'react-icons/md';
import {AiFillPhone} from 'react-icons/ai';



 function Footer() {
  return (
    <div style={{ backgroundColor: "#fdd3e5"}} className='footer text-center text-white'>
      <Container className='p-5 pb-0'>
        <section className=' mb-4'>
          <Button outline color="light" floating className='btn-footer m-1' href='ulkar.isayeva@gmail.com' role='button'>
             <MdEmail/>
          </Button>

          <Button outline color="light" floating className='btn-footer m-1' href='015226220968' role='button'>
         <AiFillPhone />
          </Button>

          <Button outline color="light" floating className='btn-footer m-1' href='https://github.com/ulkarisayeva' role='button'>
          <BsGithub/>       
          </Button>

          <Button outline color="light" floating className='btn-footer m-1' href='https://www.linkedin.com/in/ulkarisayeva/' role='button'>
          <SiLinkedin/>
          </Button>

        </section>
      </Container>

      <div className='text-center p-3' style={{ backgroundColor: "#000", color: "#fff"}}>
        © 2023 Copyright:
        <a className='text-light text-decoration-none' href= 'https://cookbloom.com/'>{"  "}
CookBloom</a>
      </div>
    </div>
  );
}

export default Footer