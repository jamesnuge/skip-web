import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Dashboard} from './components/results/Results';
import {AddResult} from './components/results/add/AddResults';
import {Login} from './components/login/Login';
import {Col, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {QueryRaceResults} from './components/query/QueryRaceResults';
import {LocationList} from './components/location/LocationList';
import {NewLocation} from './components/location/NewLocation';
import {ChassisSetupList} from './components/chassis/ChassisList';
import {NewChassis} from './components/chassis/AddChassis';
import {NavBar} from './components/navbar/NavBar';
import { VehicleListDisplay } from './components/vehicle/VehicleListDisplay';
import { AddVehicleMultiStageForm } from './components/vehicle/add/AddVehicleForm';

export const fetchTokenFromStorage = () => localStorage.getItem('authToken') || '';

const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
}



const App = () => {
  const storedToken = fetchTokenFromStorage();
  const [token, setToken] = useState<string>(storedToken);
  if (token === '') {
    return <Login onLogin={(token) => {
      setToken(token);
      storeToken(token);
    }} />;
  }
  return <div className='App'>
    <NavBar/>
    <Container fluid>
      <br/>
      <Row>
      {/*<Col xs={2} id='sidebar-wrapper'>*/}
      {/*  <SideBar/>*/}
      {/*</Col>*/}
      <Col xs={12} id={'page-content-wrapper'}>
        <Switch>
          <Route path='/location/create'>
            <NewLocation />
          </Route>
          <Route path='/location/all'>
            <LocationList />
          </Route>
          <Route path='/chassis/all'>
            <ChassisSetupList />
          </Route>
          <Route path='/chassis/create'>
            <NewChassis />
          </Route>
          <Route path='/vehicle/all'>
            <VehicleListDisplay />
          </Route>
          <Route path='/vehicle/create'>
            <AddVehicleMultiStageForm />
          </Route>
          <Route path='/results'>
            <Dashboard />
          </Route>
          <Route path='/query'>
            <QueryRaceResults />
          </Route>
          <Route path='/add'>
            <AddResult />
          </Route>
          <Route path='/'>
            <QueryRaceResults />
          </Route>
        </Switch>
      </Col>
      </Row>
    </Container>
  </div>
}

export default App;
