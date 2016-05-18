import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { SignOn, Forgotten, SignOut, Verify } from './handlers';

export default [ 
  <Route path='signon' component={SignOn} key='signon' />
, <Route path='forgotten' component={Forgotten} key='forgotten' /> 
, <Route path='verify/:code' component={Verify} key='verify' /> 
];