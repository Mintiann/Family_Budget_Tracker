import { useState, useContext } from 'react';
import { GlobalContext } from '../context/client';

const AddRecord = () => {
  const { addRecord } = useContext(GlobalContext);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);


  const clearInput = () => {
    setItem('');
    setAmount(0);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: Math.floor(Math.random() * 1000000000),
      item,
      amount: +amount,
    };
    clearInput();
    addRecord(newRecord);
    
  };

  return (
    <>
      <h3>Please add a new record here</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="item">Please input item</label>
          <input
            id="item"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Please enter your item..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Please input  +/- (income/expense) and amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Please enter your amount..."
          />
        </div>
        <button className="btn">Add record</button>
      </form>
    </>
  );
};

export default AddRecord;
