//why session storage
// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }

export const getPolicyData = () => {
    const dataStr = sessionStorage.getItem('data');
    if (dataStr) return JSON.parse(dataStr);
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }

  
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  export const removePolicySession = () => {
    sessionStorage.removeItem('data');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  export const setPolicySession = (data) => {
    sessionStorage.setItem('data', JSON.stringify(data));
  }