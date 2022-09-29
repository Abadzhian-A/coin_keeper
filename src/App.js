import './App.css';
import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Navbar} from "./components/Navbar";
import {Auth} from "./Pages/Auth";
import {Main} from "./Pages/Main";
import {About} from "./Pages/About";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="container pt-4">
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/about" component={About}/>
        <Route path="/auth" component={Auth}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
