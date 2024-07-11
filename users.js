const users = {};

export const ROLE = {
  ADMIN: 'Admin',
  LOGGED_IN_USER: 'User',
  NOT_LOGGED_IN_USER: 'Guest', 
}


function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && /^[A-Za-z0-9_]+$/.test(username); 
  isValid = isValid && (username.length>1) && (username.length<9);
  return isValid;
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, userData) {
  users[username] = userData;
}


export { isValid, getUserData, addUserData };
