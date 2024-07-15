import express from 'express';
import browserSync from 'browser-sync';
import { path } from '../../gulp/config/path.js';
import fruits from '../../gulp/tasks/fruits.json' assert { type: 'json' };

const app = express();
const port = 3000;

// Middleware для обработки JSON и URL-кодированных данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Обработчик GET-запроса для получения данных fruits
app.get('/get-fruits-data', (req, res) => {
  try {
    res.json(fruits);
  } catch (error) {
    console.error('Error sending JSON data:', error);
    res.status(500).json({ error: 'Failed to send JSON data' });
  }
});

// Обработчик GET-запроса для обработки данных формы подписки
app.get('/subscribe', (req, res) => {
  try {
    const email = req.query.email; // Получаем email из query parameters
    console.log('Email Received:', email);

    // Простая проверка email на сервере
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    if (!emailRe.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Обработка успешной подписки
    res.status(200).json({ message: 'Subscription successful', email: email });
  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
});

// Обработчик POST-запроса для обработки данных формы
app.post('/submit-form', (req, res) => {
  try {
    const formData = req.body; // Получаем данные формы из тела запроса
    console.log('Form Data Received:', formData);

    // Если в данных формы есть поле 'fruits', выводим его отдельно
    if (formData.fruits) {
      const selectedFruits = JSON.parse(formData.fruits);
      console.log('Selected Fruits:', selectedFruits);
    }

    res.status(200).json({ message: 'Form data received successfully', data: formData });
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).json({ error: 'Failed to process form data' });
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