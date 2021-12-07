import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
    return (
      <Navbar bg="light" expand="lg" className="sticky-top box-shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Swapee</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <NavDropdown title="Shop" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">All</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Clothing</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Furniture</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Electronics</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Books</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Profile</Nav.Link>
              {/* <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">All</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Clothing</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Furniture</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Electronics</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Books</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default PublicNavbar
