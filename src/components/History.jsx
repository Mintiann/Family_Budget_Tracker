import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/client';
import Loading from './Loading';
import { DISPLAY,LOGIN_STATUS } from '../utils/constants';


const Record = ({ record, id }) => {
  const { deleteRecord } = useContext(GlobalContext);

  return (
    <li className={`record-item ${record.amount < 0 ? 'minus' : 'plus'}`}>
  <span className="item">Item: {record.item}</span>
  <span className="separator">|</span>
  <span className="amount">Amount: {record.amount}</span>
  <button onClick={() => deleteRecord(id)} className="delete-btn">
    Delete
  </button>
</li>

  );
};


export const History = () => {
  const { username, records, isRecordPending } = useContext(GlobalContext);
  const { loginStatus, onRefresh } = useContext(GlobalContext);

  useEffect(() => {
    let intervalId;
    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      intervalId = setInterval(onRefresh, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loginStatus]);


  let display;
  if (isRecordPending) {
    display = DISPLAY.PENDING;
  } else if (!Object.keys(records).length) {
    display = DISPLAY.NOT_DISPLAYED;
  } else {
    display = DISPLAY.DISPLAYED;
  }
  
 
  return (
    <>
      {display === DISPLAY.PENDING && <Loading>Loading Records...</Loading>}
      {username ==='Admin'&&<h3>Family History</h3>}
      {username !=='Admin'&&<h3>Your History</h3>}
      {display === DISPLAY.NOT_DISPLAYED && <p>No items in the history, please add one.</p>}
      {display === DISPLAY.DISPLAYED && (
        <ul className="list">
          
          {Object.entries(records).map(([id, record]) => (
            <Record key={id} id={id} record={record} />
          ))}
          
        </ul>
      )}
    </>
  );
  
  
};


export default History;