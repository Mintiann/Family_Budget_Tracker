import { LOGIN_STATUS } from "../utils/constants"
import { ACTIONS } from '../utils/constants';


export const initialState = {
  username: '',
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  records: {}, 
  familyRecords: {},
  isRecordPending: false,
  error: '',
};


export const reducer = (state, action) => {
  switch (action.type) {

    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isRecordPending: false,
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
      };


      case ACTIONS.START_LOADING_RECORD:
        return {
          ...state,
          error: '',
          isRecordPending: true,
        };

    case ACTIONS.UPDATE_RECORDS:
      return {
        ...state,
        error: '',
        isRecordPending: false,
        records: action.records, 
      };

    case ACTIONS.UPDATE_FAMILY_RECORDS:
      return{
        ...state,
        error: '',
        isRecordPending: false,
        familyRecords: action.familyRecords, 
      }
    

    
    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR',
      };

    default:
      return state
  }
}
