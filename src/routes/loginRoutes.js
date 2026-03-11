const express = require('express');
const loginRoutes = express.Router();
const authController = require('../controllers/authController');

loginRoutes.post('/login', authController.login);

module.exports = loginRoutes;