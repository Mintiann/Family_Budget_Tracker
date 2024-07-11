import { v4 as uuid } from 'uuid';


function makeHistory () {


  const history = {};

  const records = {

  };

  history.contains = function contains (id) {
    return !!records[id];
  };

  history.getRecords = function getRecords () {
    return records;
  };

  history.addRecord = function addRecord ({ item, amount }) {
    const id = uuid();
    records[id] = {
      item,
      amount
    };

    return id;
  };

  history.addFamilyRecord = function addFamilyRecord ({id, item, amount}) {
    records[id] = {
      item,
      amount
    };

    return id;
  };

  history.getRecord = function getRecord (id) {
    return records[id];
  };


  history.deleteRecord = function deleterecord (id) {
    delete records[id];
  };


  return history;
};

export {makeHistory};