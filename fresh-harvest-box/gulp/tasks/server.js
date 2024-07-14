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
app.get('/get-fruits-data', (res) => {
  try {
    res.json(fruits);
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