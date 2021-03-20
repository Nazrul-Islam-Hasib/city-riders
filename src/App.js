import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const LoggedInContext = createContext();
export const rideContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedRide, setSelectedRide] = useState([]);
  return (
    <LoggedInContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <rideContext.Provider value={[selectedRide, setSelectedRide]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      </rideContext.Provider>
    </ LoggedInContext.Provider>
  );
}

export default App;
