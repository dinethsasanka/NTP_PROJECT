const mongoose = require('mongoose');
let inMemoryServer = null;

/**
 * Connect to MongoDB with simple retry logic.
 * If no external MongoDB is available and we're in development, start an in-memory server.
 */
async function connectDB(uri, { retries = 5, delayMs = 2000 } = {}) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      attempt++;
      await mongoose.connect(uri);
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, err.message || err);
      if (attempt >= retries) break; // fall through to fallback behavior
      await new Promise(r => setTimeout(r, delayMs));
    }
  }

  // Fallback: if in development, use an in-memory MongoDB server so the app can start.
  if (process.env.NODE_ENV !== 'production') {
    try {
      console.log('Starting in-memory MongoDB for development...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      inMemoryServer = await MongoMemoryServer.create();
      const memUri = inMemoryServer.getUri();
      await mongoose.connect(memUri);
      console.log('Connected to in-memory MongoDB');
      return;
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr.message || memErr);
    }
  }

  console.error('MongoDB connection failed and no in-memory fallback available.');
}

module.exports = connectDB;
