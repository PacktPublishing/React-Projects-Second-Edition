import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './App.css';
import Header from '../components/Header';
import Profile from '../pages/Profile';
import Projects from '../pages/Projects';
import Project from '../pages/Project';

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
