const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');
const app = express();
const port = 5000;

// Настройка multer
const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(express.json());
app.use(cors());

// Получение списка городов
app.get('/api/cities', async (req, res) => {
  try {
    const results = await db.query('SHOW COLUMNS FROM contacts LIKE "city"');
    const cityEnum = results[0].Type;
    const cities = cityEnum.match(/'([^']+)'/g).map((city) => city.replace(/'/g, ''));

    res.json({ cities });
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).send('Server error');
  }
});

// Получение списка пород
app.get('/api/breeds', async (req, res) => {
  try {
    const results = await db.query('SHOW COLUMNS FROM profile LIKE "breed"');
    const breedEnum = results[0].Type;
    const breeds = breedEnum.match(/'([^']+)'/g).map((breed) => breed.replace(/'/g, ''));

    res.json({ breeds });
  } catch (err) {
    console.error('Error fetching breeds:', err);
    res.status(500).send('Server error');
  }
});

// Получение пола собаки
app.get('/api/genders', async (req, res) => {
  try {
    const results = await db.query('SHOW COLUMNS FROM profile LIKE "gender"');
    const genderEnum = results[0].Type;
    const genders = genderEnum.match(/'([^']+)'/g).map((gender) => gender.replace(/'/g, ''));

    res.json({ genders });
  } catch (err) {
    console.error('Error fetching genders:', err);
    res.status(500).send('Server error');
  }
});

// Получение списка окрасов
app.get('/api/colors', async (req, res) => {
  try {
    const results = await db.query('SHOW COLUMNS FROM profile LIKE "color"');
    const colorEnum = results[0].Type;
    const colors = colorEnum.match(/'([^']+)'/g).map((color) => color.replace(/'/g, ''));

    res.json({ colors });
  } catch (err) {
    console.error('Error fetching colors:', err);
    res.status(500).send('Server error');
  }
});

// Получение изображений в бинарном формате
app.get('/api/photo/:id', async (req, res) => {
  const photoId = req.params.id;

  try {
    const result = await db.query(
      'SELECT photo1, photo2, photo3, photo_format1, photo_format2, photo_format3 FROM photo WHERE id_photo = ?',
      [photoId]
    );

    const { photo1, photo2, photo3, photo_format1, photo_format2, photo_format3 } = result[0];

    if (photo1) {
      res.setHeader('Content-Type', photo_format1 || 'image/jpeg');
      res.send(photo1);
    } else if (photo2) {
      res.setHeader('Content-Type', photo_format2 || 'image/jpeg');
      res.send(photo2);
    } else if (photo3) {
      res.setHeader('Content-Type', photo_format3 || 'image/jpeg');
      res.send(photo3);
    } else {
      res.status(404).send('No image found');
    }
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).send('Server error');
  }
});

// Регистрация пользователя ("Регистрация")
app.post('/api/register', async (req, res) => {
  const { name, email, city, phone, password } = req.body;
  
  if (!name || !email || !city || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const date = new Date().toISOString().split('T')[0];
  const role = 'user';

  try {
    const result1 = await db.query('INSERT INTO registr_data (name_reg, email, password, date_reg, role) VALUES (?, ?, ?, ?, ?)', 
      [name, email, password, date, role]);
    const registrDataId = result1.insertId;

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
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Логин пользователя ("Вход")
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const query = `
      SELECT 
        r.id_reg as userId, 
        r.name_reg as name, 
        r.email,
        c.city,
        c.tel_num as phone
      FROM registr_data r
      JOIN contacts c ON r.id_reg = c.fk_con_reg
      WHERE r.email = ? AND r.password = ?
    `;
    const results = await db.query(query, [email, password]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    res.status(200).json(user);
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Обработка формы обратной связи ("Контакты")
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Добавление анкеты собаки ("Добавить анкету")
app.post('/api/add-dog', upload.array('photos', 3), async (req, res) => {
  const { fk_reg_data, petName, age, gender, breed, color, pedigree } = req.body;
  const photos = req.files;

  // Преобразуем файлы в бинарный формат и получаем их типы
  const photoBuffers = photos.map(file => file.buffer);
  const photoFormats = photos.map(file => file.mimetype);

  try {
    const resultProfile = await db.query(
      `INSERT INTO profile (fk_reg_data, name_dog, age, gender, breed, color, pedigree, date_add) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fk_reg_data,
        petName,
        age,
        gender,
        breed,
        color,
        pedigree,
        new Date().toISOString().split('T')[0] // Текущая дата анкеты
      ]
    );
    const profileId = resultProfile.insertId; // Получаем ID собаки

    // Вставка фотографий
    await db.query(
      `INSERT INTO photo (fk_ph_profile, photo1, photo2, photo3, photo_format1, photo_format2, photo_format3) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        profileId,
        photoBuffers[0] || null, photoBuffers[1] || null, photoBuffers[2] || null,
        photoFormats[0] || null, photoFormats[1] || null, photoFormats[2] || null
      ]
    );

    // Получение всех данных профиля собаки
    const [dogProfile] = await db.query(
      `SELECT profile.*, photo.photo1, photo.photo2, photo.photo3, photo.photo_format1, photo.photo_format2, photo.photo_format3
       FROM profile
       LEFT JOIN photo ON profile.id_dog = photo.fk_ph_profile
       WHERE profile.id_dog = ?`,
      [profileId]
    );

    res.status(200).json(dogProfile);
  } catch (error) {
    console.error('Error inserting dog data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Запрос данных пользователя ("Мои данные")
app.get('/api/user/data/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userQuery = 'SELECT r.name_reg as name, r.email, c.city, c.tel_num as phone FROM registr_data r JOIN contacts c ON r.id_reg = c.fk_con_reg WHERE r.id_reg = ?';
    const userResults = await db.query(userQuery, [userId]);

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResults[0];
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Получение списка собак авторизованного пользователя ("Мои анкеты")
app.get('/api/user/dogs/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await db.query(
      `SELECT profile.*, photo.photo1, photo.photo2, photo.photo3, photo.photo_format1, photo.photo_format2, photo.photo_format3
       FROM profile
       LEFT JOIN photo ON profile.id_dog = photo.fk_ph_profile
       WHERE profile.fk_reg_data = ?`,
      [userId]
    );

    const formattedResult = result.map(dog => {
      // Функция для преобразования данных в строку Base64
      const toBase64 = (photo, format) => {
        if (photo && Buffer.isBuffer(photo)) {
          return `data:${format};base64,${photo.toString('base64')}`;
        }
        return null;
      };

      dog.photo1 = toBase64(dog.photo1, dog.photo_format1);
      dog.photo2 = toBase64(dog.photo2, dog.photo_format2);
      dog.photo3 = toBase64(dog.photo3, dog.photo_format3);

      return dog;
    });

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error('Error fetching user dogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Запрос данных о всех собаках и их владельцах ("DogList")
app.get('/api/dogs', async (req, res) => {
  const { age, breed, city, color, gender, pedigree, withPhoto } = req.query;

  let dogsQuery = `
    SELECT 
      p.id_dog, p.name_dog, p.age, p.breed, p.gender, p.color, p.date_add,
      ph.photo1, ph.photo2, ph.photo3, ph.photo_format1, ph.photo_format2, ph.photo_format3,
      r.name_reg AS owner_name, r.email AS owner_email, ct.city AS owner_city, ct.tel_num AS owner_phone
    FROM profile p
    LEFT JOIN photo ph ON p.id_dog = ph.fk_ph_profile
    JOIN registr_data r ON p.fk_reg_data = r.id_reg
    JOIN contacts ct ON r.id_reg = ct.fk_con_reg
    WHERE 1=1
  `;

  const queryParams = [];

  if (age) {
    dogsQuery += ' AND p.age = ?';
    queryParams.push(age);
  }
  if (breed) {
    dogsQuery += ' AND p.breed = ?';
    queryParams.push(breed);
  }
  if (city) {
    dogsQuery += ' AND ct.city = ?';
    queryParams.push(city);
  }
  if (color) {
    dogsQuery += ' AND p.color = ?';
    queryParams.push(color);
  }
  if (gender) {
    dogsQuery += ' AND p.gender = ?';
    queryParams.push(gender);
  }
  if (pedigree) {
    dogsQuery += ' AND p.pedigree = ?';
    queryParams.push(pedigree);
  }
  if (withPhoto === 'true') {
    dogsQuery += ' AND (ph.photo1 IS NOT NULL OR ph.photo2 IS NOT NULL OR ph.photo3 IS NOT NULL)';
  }

  try {
    const dogsResults = await db.query(dogsQuery, queryParams);
    const toBase64 = (photo, format) => {
      if (photo && Buffer.isBuffer(photo)) {
        return `data:${format};base64,${photo.toString('base64')}`;
      }
      return null;
    };

    const formattedResults = dogsResults.map(dog => {
      dog.photo1 = toBase64(dog.photo1, dog.photo_format1);
      dog.photo2 = toBase64(dog.photo2, dog.photo_format2);
      dog.photo3 = toBase64(dog.photo3, dog.photo_format3);
      return dog;
    });

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error('Error fetching filtered dogs data:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Добавление анкеты в избранное (кнопка "В избранное")
app.post('/api/liked_adds', async (req, res) => {
  const { fk_id_reg, fk_id_dog } = req.body;

  if (!fk_id_reg || !fk_id_dog) {
    return res.status(400).json({ message: 'Необходимы fk_id_reg и fk_id_dog' });
  }

  const query = `
    INSERT INTO liked_adds (fk_id_reg, fk_id_dog)
    SELECT ?, ?
    FROM DUAL
    WHERE NOT EXISTS (
      SELECT 1
      FROM liked_adds
      WHERE fk_id_reg = ? AND fk_id_dog = ?
    )
  `;

  try {
    const result = await db.query(query, [fk_id_reg, fk_id_dog, fk_id_reg, fk_id_dog]);

    if (result.affectedRows === 0) {
      console.log('Запись уже существует в таблице');
      return res.status(409).json({ message: 'Запись уже существует в таблице' });
    }

    res.status(201).json({ message: 'Анкета добавлена в избранное' });
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение избранных анкет пользователя ("Избранное")
app.get('/api/favourites/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const favourites = await db.query(
      `SELECT 
          dogs.*, 
          photo.photo1, photo.photo2, photo.photo3, 
          photo.photo_format1, photo.photo_format2, photo.photo_format3 
      FROM profile dogs 
      JOIN liked_adds ON dogs.id_dog = liked_adds.fk_id_dog 
      LEFT JOIN photo ON dogs.id_dog = photo.fk_ph_profile 
      WHERE liked_adds.fk_id_reg = ?`,
  [userId]
    );

    const toBase64 = (photo, format) => {
      if (photo && Buffer.isBuffer(photo)) {
        return `data:${format};base64,${photo.toString('base64')}`;
      }
      return null;
    };

    const formattedFavourites = favourites.map(dog => {
      dog.photo1 = toBase64(dog.photo1, dog.photo_format1);
      dog.photo2 = toBase64(dog.photo2, dog.photo_format2);
      dog.photo3 = toBase64(dog.photo3, dog.photo_format3);
      return dog;
    });

    console.log(formattedFavourites);

    res.status(200).json(formattedFavourites);
  } catch (error) {
    console.error('Ошибка при получении избранных анкет:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удаление анкеты собаки из БД ("Мои анкеты")
app.delete('/api/dogs/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    await db.query('DELETE FROM profile WHERE id_dog = ?', [id]);

    const remainingDogs = await db.query(
      `SELECT profile.*, photo.photo1, photo.photo2, photo.photo3, photo.photo_format1, photo.photo_format2, photo.photo_format3
       FROM profile
       LEFT JOIN photo ON profile.id_dog = photo.fk_ph_profile
       WHERE profile.fk_reg_data = ?`,
      [userId]
    );

    res.status(200).json({ message: 'Собака успешно удалена', remainingDogs });
  } catch (error) {
    console.error('Ошибка при удалении собаки:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удаление анкеты собаки из избранного ("Избранное")
app.delete('/api/liked_adds/:id_dog', async (req, res) => {
  const { id_dog } = req.params;
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    await db.query('DELETE FROM liked_adds WHERE fk_id_reg = ? AND fk_id_dog = ?', [userId, id_dog]);

    res.status(200).json({ message: 'Анкета успешно удалена из избранного' });
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удаления аккаунта пользователя
app.delete('/api/user/delete/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await db.query('DELETE FROM registr_data WHERE id_reg = ?', [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
