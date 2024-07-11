import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/client';
import { ROLE, LOGIN_STATUS } from "../utils/constants"


const Header = () => {
  const { username } = useContext(GlobalContext);
  const { loginStatus } = useContext(GlobalContext);
  

  let role;
  if (username === ROLE.ADMIN){
    role = ROLE.ADMIN;
  }
  else if (username === ROLE.NOT_LOGGED_IN_USER){
    role = ROLE.NOT_LOGGED_IN_USER;
  }
  else{
    role = ROLE.LOGGED_IN_USER;
  }
  
  return (
    <>
      <div>
        <h2>Family Income And Expenditure Management</h2>
      </div>
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && role === ROLE.ADMIN && (
        <div>
          <h4>Welcome {username}! You can add and delete family records.</h4>
        </div>
      )}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && role === ROLE.NOT_LOGGED_IN_USER && (
        <div>
          <h4>Welcome {username}! You can add and delete your records. Your records will not affect family records.</h4>
        </div>
      )}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && role === ROLE.LOGGED_IN_USER && (
        <div>
          <h4>Welcome {username}! You can add and delete your records.</h4>
        </div>
      )}
    </>
  );
};

export default Header;