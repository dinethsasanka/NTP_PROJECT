require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const ingestRoute = require('./routes/ingest');
const crowdRoute = require('./routes/crowd');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));

async function start() {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/crowd_db');

  app.use('/api/ingest', ingestRoute);
  app.use('/api/crowd', crowdRoute);

  app.get('/', (req, res) => res.json({ status: 'ok' }));

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch(err => { console.error('Startup error:', err); /* don't exit - let nodemon wait for changes */ });
