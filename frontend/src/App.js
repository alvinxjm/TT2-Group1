import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpensesPage from "./components/pages/ExpensesPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">Home Page</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/projects">Projects</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route exact path="/"></Route>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
