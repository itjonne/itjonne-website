import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import HomePage from '../Home';

import { ROUTES } from '../../constants/';

const App = () => {
  return(
    <Router>
        <Navigation />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    </Router>   
  )
}

export default App;