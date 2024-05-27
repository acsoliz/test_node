// routes/index.js
const express = require('express');
const db = require('../lib/db');
const { isSouthOrNorth } = require('../utils/geoLocation');
const { insertUser } = require('../services/southernUsersApi');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello world!');
});


/* GET users. */
router.get('/users', async (req, res) => {
  try {
    const dbClient = await db.getClient();
    const users = await dbClient.all('SELECT * FROM users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


/* POST register user. */
router.post('/register', async function (req, res, next) {
  const { username, email, password, latitude, longitude, browser_language } = req.body;

  if (!username || !email || !password || latitude === undefined || longitude === undefined || !browser_language) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const hemisphere = await isSouthOrNorth(latitude, longitude);

    if (hemisphere === 'N') {
      const dbClient = await db.getClient();
      await dbClient.run(
        'INSERT INTO users (username, email, password, latitude, longitude, browser_language) VALUES (?, ?, ?, ?, ?, ?)',
        [username, email, password, latitude, longitude, browser_language]
      );
      res.status(201).send({ message: 'User registered in the Northern Hemisphere' });
    } else if (hemisphere === 'S') {
      await insertUser({ username, email, password, latitude, longitude, browser_language });
      res.status(201).send({ message: 'User registered in the Southern Hemisphere' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


/* PUT update user. */
router.put('/users/:id', async function (req, res, next) {
  const { id } = req.params;
  const { username, email, password, latitude, longitude, browser_language } = req.body;

  if (!username || !email || !password || latitude === undefined || longitude === undefined || !browser_language) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const hemisphere = await isSouthOrNorth(latitude, longitude);

    if (hemisphere === 'N') {
      const dbClient = await db.getClient();
      const result = await dbClient.run(
        'UPDATE users SET username = ?, email = ?, password = ?, latitude = ?, longitude = ?, browser_language = ? WHERE id = ?',
        [username, email, password, latitude, longitude, browser_language, id]
      );

      if (result.changes === 0) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.status(200).send({ message: 'User updated successfully' });
      }
    } else if (hemisphere === 'S') {
      await insertUser({ username, email, password, latitude, longitude, browser_language });
      res.status(200).send({ message: 'User updated in the Southern Hemisphere' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


/* DELETE delete user. */
router.delete('/users/:id', async function (req, res, next) {
  const { id } = req.params;

  try {
    const dbClient = await db.getClient();
    const result = await dbClient.run('DELETE FROM users WHERE id = ?', id);

    if (result.changes === 0) {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.status(200).send({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/users/:id/friends', async (req, res) => {
  const { id } = req.params;

  try {
    const dbClient = await db.getClient();
    const friends = await dbClient.all(
      // Query para devolver el listado de amigos de un usuario
      'SELECT u.id, u.username, u.email, u.latitude, u.longitude, u.browser_language FROM users u JOIN friendships f ON u.id = f.friend_id WHERE f.user_id = ?',
      id
    );
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET count of friends for a user
router.get('/users/:id/friends/count', async (req, res) => {
  const { id } = req.params;

  try {
    const dbClient = await db.getClient();
    const result = await dbClient.get(
      // Query para devolver el contador de amigos totales de un usuario
      'SELECT COUNT(*) AS total_friends FROM friendships WHERE user_id = ?',
      id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
