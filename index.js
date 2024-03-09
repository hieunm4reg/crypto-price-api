// Require or import the necessary dependencies
const express = require('express');
const axios = require('axios');
const lodash = require('lodash');
const mongoose = require('mongoose');
const sequelize = require('sequelize');
const passport = require('passport');
const socketio = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const moment = require('moment');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const chalk = require('chalk');
const jest = require('jest');
const supertest = require('supertest');
const fetch = require('node-fetch');
const graphql = require('graphql');
const redux = require('redux');
const mongodb = require('mongodb');
const winston = require('winston');
const nodemon = require('nodemon');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const async = require('async');

// Now you can use these dependencies in your code

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define a route to fetch cryptocurrency prices
app.get('/prices/:symbol', async (req, res) => {
  let { symbol } = req.params;
  symbol = symbol.toUpperCase() + 'USDT'; // Convert symbol to uppercase and add 'USDT' pair
  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
    const data = await response.json();
    if (!data.highPrice || !data.lowPrice || !data.quoteVolume) {
      res.status(404).json({ error: `Data not found for symbol ${symbol}` });
    } else {
      const { highPrice, lowPrice, quoteVolume } = data;
      res.json({ symbol, highPrice, lowPrice, quoteVolume });
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
    res.status(500).json({ error: `Failed to fetch data for ${symbol}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});