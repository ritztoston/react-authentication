const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
   .connect(db)
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server running on ${port}`);