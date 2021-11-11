import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import ProjectPage from "./components/ProjectPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ExpensesPage from "./components/pages/ExpensesPage";

function App() {

  
  const [user,setUser] = useState(undefined)
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(() => {
    const getUser =  () => {
        console.log(isLoggedIn)
        console.log(user)
        console.log(isLoggedIn && user)
        var currentUser = JSON.parse(localStorage.getItem('user'));
        if(currentUser){
            setUser(currentUser)
            setIsLoggedIn(true)
        }
    }
    getUser()
  }, [user])

  let history = useHistory()



  useEffect(() => {
    const interval = setInterval(() => {
      var currentUser = JSON.parse(localStorage.getItem('user'));
      if(!currentUser){
          setIsLoggedIn(false)
      }
    }, 1000);
 
    return () => clearInterval(interval);
  }, []); 


    const isUserLoggedIn =  () => {
        var currentUser = JSON.parse(localStorage.getItem('user'));
        if(currentUser){
            setUser(currentUser)
            setIsLoggedIn(true)
        }
    }


    useEffect(() => {
      setInterval(() => {
                var currentUser = JSON.parse(localStorage.getItem('user'));
                
                if(!currentUser){
                  setIsLoggedIn(false)
                };
                }, [])
        }, 1000);
    const Logout = () => {
      console.log("Logging out~")
      localStorage.removeItem("user");
      setUser(undefined)
      setIsLoggedIn(false)

    };
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };


  return (
    <div className="App">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Home Page</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/projects">Projects</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {
                isLoggedIn ?
                <Nav.Link onClick = {Logout} >Logout</Nav.Link> :
                <Nav.Link href="/login" >Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/login" component={LoginPage } />
          <Route exact path="/projects" component={ProjectPage } />
          <Route path="/expenses/:id" component={ExpensesPage } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
