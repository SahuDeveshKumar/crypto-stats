const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const routes = require('./routes/route');
const fetchCryptoData = require('./controllers/fetchData');
const cron = require('node-cron');
const app = express();

dotenv.config();

app.use('/',routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
   console.log(`Server running on port ${PORT}`);
   try {
      await mongoose.connect(process.env.DB_URI);
      console.log('MongoDB connected successfully.');
   } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
   } 
});

cron.schedule(process.env.FETCH_INTERVAL_CRON, () => {
   console.log('Running the background job to fetch cryptocurrency data...');
   fetchCryptoData();
});

fetchCryptoData();















