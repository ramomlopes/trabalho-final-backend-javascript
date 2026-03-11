const express = require('express');
const indicadoresRoutes = express.Router();
const indicadoresController = require('../controllers/indicadoresController');
const authMidleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

indicadoresRoutes.get('/indicadores', authMidleware, authorizeRoles('editor', 'admin'), indicadoresController.mostrarIndicadores);

module.exports = indicadoresRoutes;