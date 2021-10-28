import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './../../pages/Dashboard';
import { Redirect } from 'react-router-dom';

export const Routes = () =>
  <Switch>
    <Route exact path='/'><Redirect to='/dashboard' /></Route>
    <Route exact path='/dashboard'>
      <Dashboard />
    </Route>
    <Route path='*'><Redirect to='/dashboard' /></Route>
  </Switch>;