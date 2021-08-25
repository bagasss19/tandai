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
import Model from './pages/Model'
import Faq from './pages/Faq'
import Package from './pages/Package'
import Test from './pages/Test'
import Train from './pages/Train'

function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  const [sideNavExpanded, setSideNavExpanded] = useState(false);

  const contentStyle = {
    marginLeft: sideNavExpanded ? "150px" : "20px", // arbitrary values
    transition: "margin 0.2s ease"
};

  return (
    <div className="App">
  <Router>
      <Navbar/>
      <Sidebar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded}/>
        <Switch>
          <div style={contentStyle}><PrivateRoute exact path="/" component={Home} auth={isAutheticated}/>
          <PrivateRoute path="/profile" component={Profile} auth={isAutheticated}/>
          <PrivateRoute path="/model" component={Model} auth={isAutheticated}/>
          <Route path="/login" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
          <PrivateRoute path="/faq" component={Faq} auth={isAutheticated}/>
          <PrivateRoute path="/train" component={Train} auth={isAutheticated}/>
          <PrivateRoute path="/package" component={Package} auth={isAutheticated}/>
          <PrivateRoute path="/test" component={Test} auth={isAutheticated}/></div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
