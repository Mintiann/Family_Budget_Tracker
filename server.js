import express from 'express';
import cookieParser from 'cookie-parser';
import { addSession, deleteSession, getSessionUser } from './sessions.js';
import { ROLE, isValid, getUserData, addUserData} from './users.js';
import { makeHistory} from './records.js';

const getSessions = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    if (!sid || !isValid(username)) {
      return null;
    }
    return username;
  }
  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('dist'));
app.use(express.json());

app.get("/api/sessions", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : "";
    if (!sid || !isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    res.json({ username });
});

app.post("/api/sessions", (req, res) => {
    const { username } = req.body;
    if (!isValid(username)) {
        res.status(400).json({ error: "required-username" });
        return;
    }
    if (username === "dog") {
        res.status(403).json({ error: "auth-insufficient" });
        return;
    }
    const sid = addSession(username);
    const existingUserData = getUserData(username);

    if (!existingUserData) {
        addUserData(username, makeHistory());
    }

    res.cookie('sid', sid);
    const history = getUserData(username);
    const list = history.getRecords();
    
    res.json({ list });
});

app.delete("/api/sessions", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : "";
    if (sid) {
        res.clearCookie("sid");
    }
    if (username) {
        deleteSession(sid);
    }
    res.json({ username });
});


app.get("/api/records", (req, res) => {
    const username = getSessions(req, res);
    if (!username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    res.json(getUserData(username).getRecords());
});

app.get("/api/familyRecords", (req, res) => {
  const admin = ROLE.ADMIN;
  const existingAdminData = getUserData(admin);
  if (!existingAdminData) {
      addUserData(admin, makeHistory());
  }
  res.json(getUserData(admin).getRecords());
});


app.post("/api/records", (req, res) => {
    const username = getSessions(req, res);
    if (!username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const { item, amount } = req.body;
  
    if (!item || !amount) {
      res.status(400).json({ error: 'required-record' });
      return;
    }
  
    const history = getUserData(username);
    const id = history.addRecord({ item, amount });
    if (username!==ROLE.ADMIN && username!==ROLE.NOT_LOGGED_IN_USER){
      const existingAdminData = getUserData(ROLE.ADMIN);
      if (!existingAdminData) {
          addUserData(ROLE.ADMIN, makeHistory());
      }
      const familyHistory = getUserData(ROLE.ADMIN);
      const id_ = familyHistory.addFamilyRecord({id, item, amount})
    }

    res.json(history.getRecord(id));
});

app.delete("/api/records/:id", (req, res) => {
    const username = getSessions(req, res);
    if (!username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const { id } = req.params;
    const history = getUserData(username);
    const exists = history.contains(id);
    if (exists) {
      history.deleteRecord(id);
      if (username!==ROLE.ADMIN && username!==ROLE.NOT_LOGGED_IN_USER){
        const familyHistory = getUserData(ROLE.ADMIN);
        familyHistory.deleteRecord(id)
      }
    }
    res.json({ message: exists ? `record ${id} sucessfully deleted` : `record ${id} does not exist` });
});



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
