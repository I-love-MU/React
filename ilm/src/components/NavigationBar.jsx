import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { routes } from '../route/Router';


const NavigationBar = () => {
    
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">I love mu</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto d-flex gap-5 mb-2 mb-lg-0">
              {routes[0].children &&
                routes[0].children.map((child) => (
                  <Nav.Item key={child.path} className="nav-item dropdown">
                    <Link
                      to={child.path}
                      className="nav-link" 
                      id="navbarDropdown"
                      role="button"
                    >
                    {child.loader()}
                    </Link>
                  </Nav.Item>
                ))
              }
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default NavigationBar