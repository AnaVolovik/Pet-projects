import express from 'express';
import browserSync from 'browser-sync';
import { path } from '../../gulp/config/path.js';
import foodsData from '../../gulp/tasks/foods.json' assert { type: 'json' };
import restaurantsData from '../../gulp/tasks/restaurants.json' assert { type: 'json' };

const app = express();
const port = 3000;

// Middleware для обработки JSON и URL-кодированных данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Функция для проверки существования адреса
async function validateAddress(address) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();
    return data.length > 0; // Возвращаем true, если адрес найден
  } catch (error) {
    console.error('Error validating address:', error);
    return false; // Возвращаем false в случае ошибки
  }
}

// Обработчик POST-запроса для формы
app.post('/submit-form', async (req, res) => {
  try {
    const address = req.body.address;
    console.log('Received address:', address);

    const isValid = await validateAddress(address);
    
    if (isValid) {
      console.log('Address is valid');
      // Отправляем успешный ответ без тела
      res.status(200).send();
    } else {
      console.log('Address not found');
      // Отправляем ошибку, если адрес не найден
      res.status(400).json({ error: 'Address not found' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An error occurred while processing data on the server' });
  }
});

// Обработчик POST-запроса для логина
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', email, password);

  // Простой пример проверки логина
  if (email === 'user@example.com' && password === 'password123') {
    res.status(200).json({ success: true, message: 'Login successful', email });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Обработчик GET-запроса для получения данных foods
app.get('/get-food-data', (req, res) => {
  try {
    res.json(foodsData);
  } catch (error) {
    console.error('Error sending JSON data:', error);
    res.status(500).json({ error: 'Failed to send JSON data' });
  }
});

// Обработчик GET-запроса для получения данных restaurants
app.get('/get-restaurants-data', (req, res) => {
  try {
    res.json(restaurantsData);
  } catch (error) {
    console.error('Error sending JSON data:', error);
    res.status(500).json({ error: 'Failed to send JSON data' });
  }
});

// Middleware для обслуживания статических файлов
app.use(express.static(path.build.html));

// Инициализация BrowserSync с использованием Express middleware
export const server = (done) => {
  browserSync.init({
    server: {
      baseDir: path.build.html,
      middleware: [app],
    },
    notify: false,
    port: port,
  });

  done();
};

export default server;