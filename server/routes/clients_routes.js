// routes/clients_routes.js
const express = require('express');
const router = express.Router();
const {profileGet} = require('../controllers/clientController');

// Роуты для клиентов
router.get('/profile', profileGet);

module.exports = router;
