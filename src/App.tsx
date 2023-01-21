import { useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/results/Results';
import { AddResult } from './components/results/add/AddResults';
import { Login } from './components/login/Login';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryRaceResults } from './components/query/QueryRaceResults';
import { LocationList } from './components/location/LocationList';
import { NewLocation } from './components/location/NewLocation';
import { ChassisSetupList } from './components/chassis/ChassisList';
import { NewChassis } from './components/chassis/AddChassis';


export const fetchTokenFromStorage = () => localStorage.getItem('authToken') || '';

const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
}

const deleteToken = () => {
  localStorage.removeItem('authToken')
}

const App = () => {
  const storedToken = fetchTokenFromStorage();
  const [token, setToken] = useState<string>(storedToken);
  const logout = () => {
    deleteToken();
    window.location.reload();
  }
  if (token === '') {
    return <Login onLogin={(token) => {
      setToken(token);
      storeToken(token);
    }} />;
  }
  return <div className="App">
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>
            Skip Data
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Results" id="results-dropdown">
              <NavDropdown.Item href="/results">All</NavDropdown.Item>
              <NavDropdown.Item href="/query">Ranked search</NavDropdown.Item>
              <NavDropdown.Item href="/add">Add</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Locations" id="locations-dropdown">
              <NavDropdown.Item href="/location/all">View all</NavDropdown.Item>
              <NavDropdown.Item href="/locations/create">Add</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Chassis" id="chassis-dropdown">
              <NavDropdown.Item href="/chassis/all">View all</NavDropdown.Item>
              <NavDropdown.Item href="/chassis/create">Add</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='ml-auto'>
            <Nav.Item>
              <a onClick={() => logout()} className='nav-link ml-auto'>Logout</a>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <div className="wrapper">
        <Switch>
          <Route path="/location/create">
            <NewLocation />
          </Route>
          <Route path="/location/all">
            <LocationList />
          </Route>
          <Route path="/chassis/all">
            <ChassisSetupList />
          </Route>
          <Route path="/chassis/create">
            <NewChassis />
          </Route>
          <Route path="/results">
            <Dashboard />
          </Route>
          <Route path="/query">
            <QueryRaceResults />
          </Route>
          <Route path="/add">
            <AddResult />
          </Route>
          <Route path="/">
            <QueryRaceResults />
          </Route>
        </Switch>
      </div>
  </div>
}

export default App;
