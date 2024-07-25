const express = require('express');
const cors = require('cors'); // Для настройки CORS
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // Разрешает запросы с других доменов

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
