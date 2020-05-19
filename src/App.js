import React from 'react';
import './css/App.css';
import Home from "./components/Home"
import Navbar from "./components/Navbar";
import Main from  "./components/Main";
import Error from "./components/Error";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/"component={Home} />
        {/* <Route exact path="/play/" component={play} /> */}
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
