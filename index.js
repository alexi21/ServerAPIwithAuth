// Main starting point of the server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// App Set Up

// Morgan provides logging of incoming requests
app.use(morgan('combined'));

// Body Parser parses incoming requests to json
app.use(bodyParser.json({ type: '*/*' }));

// Server Set Up

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server listening on port: ', port);
});
