import React, { useState } from 'react';
import { setUserSession } from '../utils/Common';
import { Form, Container,Header } from 'semantic-ui-react'
import axios from 'axios';

 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState("");
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://api.bybits.co.uk/auth/token', 
    { username: username.value, password: password.value, type:"USER_PASSWORD_AUTH" },
    {headers:
      {environment: 'mock'}
    }).then(response => {
      console.log(response)
      setLoading(false);
      setUserSession(response.data.access_token, response.data);
      console.log(response.data)
      setUserToken(response.data.access_token);
      //console.log(response.data.access_token);
      //its sending the props to private
      props.history.push('/private');
    }).catch(error => {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <>
    <Header as='h2'>Login</Header>
    <Form centered>
      <Form.Field>
        <label>Username</label>
        <input type="text" {...username} autoComplete="new-password" />
      </Form.Field>
      <Form.Field>
        <label style={{ marginTop: 10 }}>
        Password
        </label>
        <input type="password" {...password} autoComplete="new-password" />
      </Form.Field>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      
    </Form>
    </>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;