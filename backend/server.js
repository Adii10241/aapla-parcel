// 1. Import what we need
require('dotenv').config();   // loads your .env file into process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. Create the app
const app = express();

// 3. Middleware — code that runs on EVERY request before it reaches your routes
app.use(cors());              // allows your Expo app to call this API
app.use(express.json());      // lets Express read JSON request bodies (req.body)

// 4. A simple test route — proves the server is alive
app.get('/', (req, res) => {
  res.send('Aapla Parcel API is running');
});

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const parcelRoutes = require('./routes/parcelRoutes');
const requestRoutes = require('./routes/requestRoutes');
const chatRoutes = require('./routes/chatRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/ratings', ratingRoutes);

// 5. Start server immediately, connect to MongoDB in parallel
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));