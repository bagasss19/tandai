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
import Multiple from './pages/Multiple'
import File from './pages/File'
import PrivateRoute from './components/PrivateRoute'
import Sidebar from './components/Sidebar';

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
          <Route path="/login" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
          <PrivateRoute path="/add" component={Add} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
