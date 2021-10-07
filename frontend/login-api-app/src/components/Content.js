import React from 'react';
import { removeUserSession} from '../utils/Common';

 
function Content(props) {
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/');
  }
 
  return (
    <div>
      Welcome User!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Content;