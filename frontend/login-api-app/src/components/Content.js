import React, { useState, useEffect } from 'react';
import {getToken, getUser, removeUserSession, getPolicyData, removePolicySession,setPolicySession} from '../utils/Common';
import { Card,  Form} from 'semantic-ui-react'
 
import axios from 'axios';

function Content(props) {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`https://api.bybits.co.uk/policys/details`,
    {headers:
      {environment: 'mock',Authorization:`Bearer ${token}`,'Content-type':'application/json'}
    }).then(response => {
      console.log(response.data.policy)
      setPolicySession(response.data)
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  const user = getUser();
  const data=getPolicyData();
  console.log(user)
  console.log(data)
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/');
  }

  if (!data) {
    return <div className="content">Checking Authentication...</div>
  } return (
   
    <Card centered> 
      <Card.Content>
    
     
      <Card.Header color='green'>Policy Reference</Card.Header>
      <p> {data.policy.policy_reference} </p>
      
      <Card.Header>Cover Type</Card.Header>
 
      <p>{data.policy.cover}</p>
    
      <Card.Header>Car</Card.Header>
      <p>{data.vehicle.make} {data.vehicle.model} {data.vehicle.model} {data.vehicle.reg}</p>
      <Card.Header>Address</Card.Header>
      <p>{data.policy.address.line_1} {data.policy.address.line_3} {data.policy.address.postcode}</p>

      <input type="button" onClick={handleLogout} value="Logout" />
      </Card.Content>
    </Card>
    
  );
}
 
export default Content;