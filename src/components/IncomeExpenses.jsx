import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/client';
import { LOGIN_STATUS } from '../utils/constants';

const IncomeExpenses = () => {
  const { records, familyRecords } = useContext(GlobalContext);
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

  const userAmounts = Object.values(records).map(
    (record) => record.amount
  );

  const familyAmounts = Object.values(familyRecords).map(
    (record) => record.amount
  );

  const userIncome = (
    userAmounts.filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);

  const familyIncome = (
    familyAmounts.filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);

  const userExpense = (
    userAmounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const familyExpense = (
    familyAmounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  
return (
  <div style={{ display: 'flex', justifyContent: 'space-between'}}> 
    <div className="inc-exp-container">
      <div>
        <h4>Your Income</h4>
        <p className="money plus">{userIncome}</p>
      </div>
      <div>
        <h4>Your Expense</h4>
        <p className="money minus">{userExpense}</p>
      </div>
    </div>
    <div className="inc-exp-container">
      <div>
        <h4>Family Income</h4>
        <p className="money plus">{familyIncome}</p>
      </div>
      <div>
        <h4>Family Expense</h4>
        <p className="money minus">{familyExpense}</p>
      </div>
    </div>
  </div>
);
};


export default IncomeExpenses;

