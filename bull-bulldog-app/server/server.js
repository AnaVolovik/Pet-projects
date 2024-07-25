const express = require('express');
const db = require('./db');
const cors = require('cors'); // Для настройки CORS
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // Разрешает запросы с других доменов

// Route to get the list of cities
// app.get('/api/cities', async (req, res) => {
//   try {
//     const result = await db.query('SELECT DISTINCT city FROM contacts');
//     res.json(result.rows.map(row => row.city));
//   } catch (error) {
//     console.error('Error fetching cities:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Маршрут для получения списка городов
app.get('/api/cities', (req, res) => {
  db.query('SHOW COLUMNS FROM contacts LIKE "city"', (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }

    const cityEnum = results[0].Type;
    const cities = cityEnum.match(/'([^']+)'/g).map((city) => city.replace(/'/g, ''));

    // Вывод списка городов в консоль
    console.log('Список городов:', cities);
    
    res.json({ cities });
  });
});

app.post('/api/register', (req, res) => {
  const { name, email, city, phone, password } = req.body;
  
  // Пример валидации данных
  if (!name || !email || !city || !phone || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  
  // Здесь добавьте логику регистрации пользователя

  res.status(200).json({ user: { name, email, city, phone } });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
