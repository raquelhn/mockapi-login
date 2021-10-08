import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Content from './components/Content';
import PrivateRoute from './utils/Privateroute';
import PublicRoute from './utils/Publicroute';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './utils/Common';



function App() {

  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/content">Dashboard</NavLink>
          </div>
          <div>
            <Switch>
              <PublicRoute path="/" component={Login} />
              <PrivateRoute path="/content" component={Content}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;