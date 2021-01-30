import React from 'react';
import { Navbar } from 'react-bootstrap';

export function Header () {
  return (
    <Navbar className="headerLogin" bg="dark" variant="dark">
      <Navbar.Brand>Basic Login</Navbar.Brand>
    </Navbar>
  );
}
