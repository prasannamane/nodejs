//const dbConnection = require('./../db');

const AdminModel = require('../models/Admin/AdminModel');
const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

let UserModelObj = new UserModel(dbConnection);



async see() {
  const ObjAdminModel = await new AdminModel();
  return ObjAdminModel.see()

}

router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    const userId = ""; //await new UserModel(req.app.get('dbConnection')).createUser(username, email);
    res.status(201).json({ message: 'User created successfully', id: userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = ""; //await new UserModel(req.app.get('dbConnection')).getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
   
    const users = await AdminModel.see();
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const updated = ""; //await new UserModel(req.app.get('dbConnection')).updateUser(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'User not found or update failed' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = ""; //await new UserModel(req.app.get('dbConnection')).deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
