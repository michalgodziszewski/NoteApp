import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoteState from './context/note/NoteState';
import AlertState from './context/alert/AlertState';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Alert from './components/layout/Alert';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  });

  return (
    <NoteState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />

            <div className='container my'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </NoteState>
  );
};

export default App;
