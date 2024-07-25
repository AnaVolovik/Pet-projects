const express = require('express');
const db = require('./db');
const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});