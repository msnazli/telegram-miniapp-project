require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const formRoutes = require('./routes/formRoutes');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
