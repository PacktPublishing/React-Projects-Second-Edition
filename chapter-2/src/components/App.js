import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './App.css';
import Header from './Header';
import Profile from './Profile';
import Projects from './Projects';
import Project from './Project';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header logo={logo} />
        <Switch>
          <Route exact path='/'>
            <Profile userName='octocat' />
          </Route>
          <Route path='/projects/:name'>
            <Project userName='octocat' />
          </Route>
          <Route path='/projects'>
            <Projects userName='octocat' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
