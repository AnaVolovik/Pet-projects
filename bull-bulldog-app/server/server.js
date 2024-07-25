const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Route to get the list of cities
app.get('/api/cities', (req, res) => {
  db.query('SHOW COLUMNS FROM contacts LIKE "city"', (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }

    const cityEnum = results[0].Type;
    const cities = cityEnum.match(/'([^']+)'/g).map((city) => city.replace(/'/g, ''));

    res.json({ cities });
  });
});

app.post('/api/register', (req, res) => {
  const { name, email, city, phone, password } = req.body;
  
  // Пример валидации данных
  if (!name || !email || !city || !phone || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  
  const dateReg = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате YYYY-MM-DD
  const role = 'user';

  // Вставка данных в таблицу registr_data
  db.query('INSERT INTO registr_data (name_reg, email, password, date_reg, role) VALUES (?, ?, ?, ?, ?)', 
    [name, email, password, dateReg, role], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }

    const registrDataId = results.insertId; // Получаем ID вставленной записи

    // Вставка данных в таблицу contacts
    db.query('INSERT INTO contacts (city, tel_num, fk_con_reg) VALUES (?, ?, ?)', 
      [city, phone, registrDataId], (err, results) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }

      res.status(200).json({ user: { name, email, city, phone } });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
