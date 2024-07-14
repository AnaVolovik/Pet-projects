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