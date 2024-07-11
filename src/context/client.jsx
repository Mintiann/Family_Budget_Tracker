import { createContext, useReducer, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchRecords,
  fetchFamilyRecords,
  fetchAddRecords,  
  fetchDeleteRecords,
  
} from '../utils/services';
import { ACTIONS, CLIENT, SERVER } from '../utils/constants';

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING_RECORD });
    fetchLogin(username)
      .then(() => {
        return fetchRecords();
      })
      .then((records) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({
          type: ACTIONS.UPDATE_RECORDS,
          records: records,
        });
      })
      .then(() => {
        return fetchFamilyRecords();
      })
      .then((familyRecords) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({
          type: ACTIONS.UPDATE_FAMILY_RECORDS,
          familyRecords: familyRecords,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout().catch((err) => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_RECORD });
    fetchRecords()
      .then((records) => {
        dispatch({ 
          type: ACTIONS.UPDATE_RECORDS, 
          records: records });
      })
      .then(() => {
        return fetchFamilyRecords();
      })
      .then((familyRecords) => {
        dispatch({
          type: ACTIONS.UPDATE_FAMILY_RECORDS,
          familyRecords: familyRecords,
        });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
    
  }
  function addRecord(record) {
    fetchAddRecords(record)
      .then(() => {
        return fetchRecords();
      })
      .then((records) => {
        dispatch({ type: ACTIONS.UPDATE_RECORDS, records });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }
  function deleteRecord(id) {
    dispatch({ type: ACTIONS.START_LOADING_RECORD });
    fetchDeleteRecords(id)
      .then(() => {
        return fetchRecords();
      })
      .then((records) => {
        dispatch({ type: ACTIONS.UPDATE_RECORDS, records });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  

  function checkForSession() {
    fetchSession()
      .then((session) => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchRecords();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((records) => {
        dispatch({ type: ACTIONS.UPDATE_RECORDS, records });
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        if (err?.error === SERVER.AUTH_MISSING) {
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        onLogin,
        onLogout,
        onRefresh,
        addRecord,
        deleteRecord,
        checkForSession,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};