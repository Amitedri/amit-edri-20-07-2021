import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Favourites from "./components/favourites";
import dotenv from 'dotenv';
const res = dotenv.config({path:'./.env'})
function App() {
  
  return (
    <Router>
      <div className='App'>
        <Navbar />
          <Route  exact path='/' component={Home} />
          <Route exact path='/favourites' component={Favourites} />
      </div>
    </Router>
  );
}

export default App;
