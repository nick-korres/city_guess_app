import React from 'react';
import './css/App.css';

import Navbar from "./components/Navbar";
import Main from  "./components/Main";
import Error from "./components/Error";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/"component={Main} />
        {/* <Route exact path="/play/" component={play} /> */}
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
