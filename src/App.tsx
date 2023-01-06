import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/dashboard/Dashboard';
import { Login } from './components/login/Login';
import { Preferences } from './components/preferences/Preferences';

const fetchTokenFromStorage = () => localStorage.getItem('authToken') || '';

const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
}

const App = () => {
  const storedToken = fetchTokenFromStorage();
  const [token, setToken] = useState<string>(storedToken);
  if (token == '') {
    return <Login onLogin={(token) => {
      setToken(token);
      storeToken(token);
    }}/>;
  }
  return <div className="App">
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  </div>
}

export default App;
