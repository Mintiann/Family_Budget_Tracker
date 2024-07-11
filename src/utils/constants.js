  export const ROLE = {
    ADMIN: 'Admin',
    LOGGED_IN_USER: 'User',
    NOT_LOGGED_IN_USER: 'Guest', 
  }

  export const LOGIN_STATUS = {
      PENDING: 'pending',
      NOT_LOGGED_IN: 'notLoggedIn',
      IS_LOGGED_IN: 'loggedIn',
    };
    
  export const DISPLAY = {
    PENDING: 'pending',
    NOT_DISPLAYED: 'notDisplayed',
    DISPLAYED: 'displayed',
  };

  export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_RECORD: 'required-record',
    RECORD_MISSING: 'noSuchId',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  
  
  export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logOut',
    START_LOADING_RECORD: 'startLoadingRecords',
    UPDATE_RECORDS: 'replaceRecords',
    UPDATE_FAMILY_RECORDS: 'replaceFamilyRecords',
    REPORT_ERROR: 'reportError',
  };

  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]:'Please enter a valid username with 2 to 8 characters (letters and/or numbers only)', 
    [SERVER.REQUIRED_RECORD]: 'Please enter the record to do',
    default: 'Something went wrong.  Please try again',
  };
  