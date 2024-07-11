import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/client';
import { LOGIN_STATUS } from '../utils/constants';

const Balance = () => {
  const { records,familyRecords } = useContext(GlobalContext);
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
  const amounts = Object.values(records).map(
    (record) => record.amount
  );

  const familyAmounts = Object.values(familyRecords).map(
    (record) => record.amount
  );

  const personalTotal = amounts.every(amount => !isNaN(parseFloat(amount)))
  ? amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
  : '0.00';
  
  const familyTotal = familyAmounts.every(amount => !isNaN(parseFloat(amount)))
  ? familyAmounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
  : '0.00';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h4>Your Balance</h4>
        <h1>${personalTotal}</h1>
      </div>
      <div>
        <h4>Family Balance</h4>
        <h1>${familyTotal}</h1>
      </div>
    </div>
  );
};

export default Balance;