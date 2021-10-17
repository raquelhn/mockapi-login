import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import {Container } from 'semantic-ui-react'
import Login from './components/Login';
import Content from './components/Content';


import axios from 'axios';

import { getToken, removeUserSession, setUserSession, setPolicySession} from './utils/Common';



function App() {

  const [authLoading, setAuthLoading] = useState(true);
 
  
  return (
    <div className="wrapper">
    <Container>
      <BrowserRouter>
             <Route exact path='/' exact={true} component={Login}/>
             <Route path='/private' exact={true} component={Content}/>
      </BrowserRouter>
    </Container>
    </div>
  );
}
 
export default App;