import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MyNabBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">BookiFy</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/list">Add Listing</Nav.Link>
          <Nav.Link href="/reg">Register</Nav.Link>
          <Nav.Link href="/log">Login</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default MyNabBar;
