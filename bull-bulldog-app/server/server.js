const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Route to get the list of cities
app.get('/api/cities', async (req, res) => {
  try {
    const results = await db.query('SHOW COLUMNS FROM contacts LIKE "city"');
    const cityEnum = results[0].Type;
    const cities = cityEnum.match(/'([^']+)'/g).map((city) => city.replace(/'/g, ''));

    res.json({ cities });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, city, phone, password } = req.body;
  
  if (!name || !email || !city || !phone || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  
  const date = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате YYYY-MM-DD
  const role = 'user';

  try {
    // Вставка данных в таблицу registr_data
    const result1 = await db.query('INSERT INTO registr_data (name_reg, email, password, date_reg, role) VALUES (?, ?, ?, ?, ?)', 
      [name, email, password, date, role]);
    const registrDataId = result1.insertId; // Получаем ID вставленной записи

    // Вставка данных в таблицу contacts
    await db.query('INSERT INTO contacts (city, tel_num, fk_con_reg) VALUES (?, ?, ?)', 
      [city, phone, registrDataId]);

      res.status(200).json({
        userId: registrDataId, 
        name, 
        email, 
        city, 
        phone
      });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Запрос данных пользователя
app.get('/api/user/data/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userQuery = 'SELECT r.name_reg as name, r.email, c.city, c.tel_num as phone FROM registr_data r JOIN contacts c ON r.id_reg = c.fk_con_reg WHERE r.id_reg = ?';
    const userResults = await db.query(userQuery, [userId]);

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const user = userResults[0];
    res.status(200).json(user);
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error.message);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// Обработка логина
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail и пароль обязательны' });
  }

  try {
    // Проверка данных пользователя в базе
    const query = 'SELECT id_reg as userId, name_reg as name, email FROM registr_data WHERE email = ? AND password = ?';
    const results = await db.query(query, [email, password]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Неверный e-mail или пароль' });
    }

    const user = results[0];
    res.status(200).json(user);
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обработка формы обратной связи
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    await db.query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.status(200).json({ message: 'Сообщение отправлено' });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
