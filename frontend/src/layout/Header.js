import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from './../assets/black-logo.png'

function Header() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/', { replace: true });
  }

  return (
    <Navbar className='navbar' variant="light" expand="lg" >
      <Container>
        <Navbar.Brand href={'/'}> 
            <img
              src={Logo}
              height="55"
              className="d-inline-block align-top"
              alt="CookBloom"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/make-meal">Make meal</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
          </Nav>
          <Nav>
            { localStorage.getItem('fullname') ? (
              <NavDropdown title={localStorage.getItem('fullname')} id="basic-nav-dropdown">
                <NavDropdown.Item href={'/profile'}>Profile</NavDropdown.Item>
                <NavDropdown.Item href={'/'} onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;