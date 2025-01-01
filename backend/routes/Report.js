// communicationFrequencyRoute.js

const express = require("express");
const router = express.Router();
const Company = require("../models/Company"); // Assuming Company model is already defined
const Communication = require("../models/Communication"); // Assuming Communication model is already defined

// Route to get communication frequency
router.get("/communication-frequency", async (req, res) => {
  try {
    const companies = await Company.find();
    const scheduledCommunications = await Communication.find();

    // Frequency count object for each communication type
    const communicationFrequency = {
        "LinkedIn Post": 0,
        "Phone Call": 0,
        "Email": 0,
        "LinkedIn": 0,
        "Message": 0,
        "Other": 0,
      };

    // Count communications in last communications (completed)
    companies.forEach((company) => {
      if (company.lastCommunications) {
        company.lastCommunications.forEach((comm) => {
          if (communicationFrequency.hasOwnProperty(comm.type)) {
            communicationFrequency[comm.type]++;
          }
        });
      }
    });

    // Count communications in scheduled communications (future)
    for (const comm of scheduledCommunications) {
      if (communicationFrequency.hasOwnProperty(comm.type)) {
        communicationFrequency[comm.type]++;
      }
    }

    // Return the frequency data
    res.json(communicationFrequency);
  } catch (error) {
    console.error("Error fetching communication frequency:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
