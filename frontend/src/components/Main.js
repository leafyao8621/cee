import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import Editor from './Editor'
import AnswerSheet from './AnswerSheet';
import Results from './Results';
import ResultDetail from './ResultDetail';

const Main = () => {
  return (
    <Switch>
        <Route exact path='/' component={LoginPage}></Route>
        <Route path='/landing' component={LandingPage}></Route>
        <Route path='/editor' component={Editor}></Route>
        <Route path='/answer-sheet' component={AnswerSheet}></Route>
        <Route path='/results' component={Results}></Route>
        <Route path='/result-detail' component={ResultDetail}></Route>
    </Switch>
  );
}

export default Main;
