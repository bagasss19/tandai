import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Sidebar from './components/Sidebar';

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
// import Register from './pages/Register'
import Add from './pages/Add'
import Multiple from './pages/Multiple'
import File from './pages/File'
import Model from './pages/Model'
import Faq from './pages/Faq'
import Package from './pages/Package'

function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  return (
    <div className="App">
  <Router>
      <Navbar/>
      <Sidebar/>
        <Switch>
          <PrivateRoute exact path="/" component={Home} auth={isAutheticated}/>
          <PrivateRoute path="/multiple" component={Multiple}/>
          <PrivateRoute path="/file" component={File}/>
          <PrivateRoute path="/profile" component={Profile}/>
          <PrivateRoute path="/model" component={Model}/>
          <Route path="/login" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
          <PrivateRoute path="/add" component={Add} />
          <PrivateRoute path="/faq" component={Faq} />
          <PrivateRoute path="/package" component={Package} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
