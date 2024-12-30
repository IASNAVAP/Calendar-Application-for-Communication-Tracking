const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const companyRoutes = require('./routes/company');
const communicationMethodRoutes = require('./routes/communicationMethod');
const communicationRoutes = require("./routes/communications");
const calenderRoutes = require('./routes/Calender');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/communications", communicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/communication-methods', communicationMethodRoutes);
app.use("/api/calendar", calenderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
