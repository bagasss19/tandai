import React, { useState } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
// import Sidebar from './components/Sidebar';

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
// import Register from './pages/Register'
import Model from './pages/Model'
import Faq from './pages/Faq'
import Package from './pages/Package'
// import Test from './pages/Test'
// import Train from './pages/Train'
import Trainid from './pages/Trainid'
import Testid from './pages/Testid'
import Detailid from './pages/Detailid'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import LinkChangePassword from './pages/LinkChangePassword'

function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  // const [sideNavExpanded, setSideNavExpanded] = useState(false);

  const contentStyle = {
    // marginLeft: sideNavExpanded ? "150px" : "2px", // arbitrary values
    transition: "margin 0.2s ease"
};

  return (
      <div className="App">
        <Router>
            <Navbar/>
            {/* <Sidebar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded}/> */}
              <Switch>
                <div style={contentStyle}><PrivateRoute exact path="/" component={Home} auth={isAutheticated}/>
                <PrivateRoute path="/profile" component={Profile} auth={isAutheticated}/>
                <PrivateRoute path="/model" component={Model} auth={isAutheticated}/>
                <PrivateRoute path="/change-password" component={ChangePassword} auth={isAutheticated}/>
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Route path="/link-changes-password/:email" component={LinkChangePassword}/>
                {/* <Route path="/register" component={Register} /> */}
                <PrivateRoute path="/faq" component={Faq} auth={isAutheticated}/>
                {/* <PrivateRoute exact path="/train" component={Train} auth={isAutheticated}/> */}
                <PrivateRoute path="/package" component={Package} auth={isAutheticated}/>
                {/* <PrivateRoute exact path="/test" component={Test} auth={isAutheticated}/> */}
                <PrivateRoute path="/train/:id" component={Trainid} auth={isAutheticated}/>
                <PrivateRoute path="/test/:id" component={Testid} auth={isAutheticated}/>
                <PrivateRoute path="/detail/:id" component={Detailid} auth={isAutheticated}/></div>
              </Switch>
            </Router>
          </div>
  );
}

export default App;
