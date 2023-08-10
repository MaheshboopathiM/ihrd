import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
  
  const handleLogout =() =>{
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <>
      {/* <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">IHRD,Muttom Thodupuzha</Navbar.Brand>
        </Container>
      </Navbar> */}
      <Navbar key={false} expand={false} className="bg-light mb-3 card-5 " >
        <Container fluid>
          <Navbar.Brand style={{ color: "#333333",fontWeight:'bold' }}>IHRD,Muttom Thodupuzha</Navbar.Brand>
          <img src='http://casthodupuzha.ihrd.ac.in/images/logo.png' className='imglogo' />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                MORE OPTIONS
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Button variant="primary" size="lg" className='me-4 mt-4' style={{width:'100%'}}
              onClick={handleLogout}
              >
               Log Out
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default Header