const express = require("express");
const router = express.Router();
const Communication = require("../models/Communication");

// POST /api/communications/add
router.post("/:companyId/next-meeting", async (req, res) => {
  try {
    const { companyId } = req.params;

    const { date,type, notes } = req.body;

    // Validate input
    if (!companyId || !type || !date) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Create a new communication record
    const newCommunication = new Communication({
      companyId,
      type,
      date,
      notes,
    });

    const savedCommunication = await newCommunication.save();
    res.status(201).json(savedCommunication);
  } catch (error) {
    console.error("Error adding communication:", error);
    res.status(500).json({ message: "Server error. Unable to add communication." });
  }
});

router.get('/', async (req, res) => {
  try {
    const communications = await Communication.find();
    res.json(communications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:companyId/meetings", async (req, res) => {
  const { companyId } = req.params;

  try {
    const meetings = await Communication.find({ companyId }).sort({ date: 1 });
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching scheduled meetings:", error);
    res.status(500).json({ message: "Server error. Unable to fetch meetings." });
  }
});

router.put("/:communicationId", async (req, res) => {
  const { communicationId } = req.params;
  const { date, type, notes } = req.body;

  if (!date || !type) {
    return res.status(400).json({ message: "Date and type are required." });
  }

  try {
    const updatedCommunication = await Communication.findByIdAndUpdate(
      communicationId,
      { date, type, notes },
      { new: true }
    );

    if (!updatedCommunication) {
      return res.status(404).json({ message: "Communication not found." });
    }

    res.status(200).json(updatedCommunication);
  } catch (error) {
    console.error("Error updating communication:", error);
    res.status(500).json({ message: "Server error. Unable to update communication." });
  }
});

module.exports = router;
