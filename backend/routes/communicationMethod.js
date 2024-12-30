const express = require('express');
const CommunicationMethod = require('../models/CommunicationMethod');
const router = express.Router();

// Add a new communication method
router.post('/add', async (req, res) => {
  try {
    const method = new CommunicationMethod(req.body);
    await method.save();
    res.status(201).json(method);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all communication methods
router.get('/', async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort({ sequence: 1 });
    res.json(methods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
