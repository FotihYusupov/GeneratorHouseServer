/* eslint-disable no-console */
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router');

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.use(cors());

app.use(express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT || 3002, () => console.log('server is run')))
  .catch((err) => console.log('db error', err.message));
