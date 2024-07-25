const express = require('express');
const db = require('./db');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/registr_data', (req, res) => {
  const query = 'SELECT * FROM registr_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).send('Server error');
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});