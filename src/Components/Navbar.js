import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className="px-3">
        <Navbar.Brand>
          <Link to="/" style={{textDecoration: 'none'}}>Movie App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mt-1">
            <Link to="/favourites" style={{textDecoration: 'none'}}>Favourites</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
