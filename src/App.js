import React from 'react';
import './style.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Movies} />
        <Route path="/favourites" component={Favourites} />
      </Switch>
    </Router>
  );
}
