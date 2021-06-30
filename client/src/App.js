import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
// import Register from './pages/Register'
import Add from './pages/Add'
import Edit from './pages/Edit'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  return (
    <div className="App">
  <Router>
      <Navbar/>
        <Switch>
          <PrivateRoute exact path="/" component={Home} auth={isAutheticated}/>
          <Route exact path="/" component={Add}/>
          <Route path="/login" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
          <PrivateRoute path="/add" component={Add} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
