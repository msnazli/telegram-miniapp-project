require('dotenv').config();
require('./bot/telegramBot'); // اجرای بات

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const formRoutes = require('./routes/formRoutes');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const translationsRouter = require('./routes/translations');
app.use('/api/translations', translationsRouter);
