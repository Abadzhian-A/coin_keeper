import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { About } from './Pages/About';
import { RegisterPage } from './Pages/RegisterPage';
import { LoginPage } from './Pages/LoginPage';
import { CostsPage } from './Pages/CostsPages';
import Header from './components/Header';
import { IncomePage } from './Pages/IncomePage';
import { MainPage } from './Pages/MainPage';


function App() {

  return (
    <BrowserRouter>
    <Header />
    <div className="container pt-4">
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/incomes" exact component={IncomePage}/>
        <Route path="/costs" exact component={CostsPage}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
