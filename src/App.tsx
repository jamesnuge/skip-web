import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/results/Results';
import { Login } from './components/login/Login';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryRaceResults } from './components/query/QueryRaceResults';


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
    }}/>;
  }
  return <div className="App">
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          Skip Data
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/results">All Results</Nav.Link>
          <Nav.Link href="/query">Search Results</Nav.Link>
        </Nav>
        <Nav className='ml-auto'>
          <Nav.Item>
            <a onClick={() => logout()}className='nav-link ml-auto'>Logout</a>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/results">
            <Dashboard />
          </Route>
          <Route path="/query">
            <QueryRaceResults />
          </Route>
          <Route path="/">
            <QueryRaceResults />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  </div>
}

export default App;
