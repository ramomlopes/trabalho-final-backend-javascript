const express = require('express');
const relatorioRoutes = express.Router();
const relatorioController = require('../controllers/relatorioController');
const authMidleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

relatorioRoutes.get('/relatorio-categoria/:categoria', authMidleware, authorizeRoles('usuario','editor', 'admin'), relatorioController.filtroCategoria);
relatorioRoutes.get('/relatorio-status/:status', authMidleware, authorizeRoles('usuario','editor', 'admin'), relatorioController.filtroStatus);
relatorioRoutes.get('/relatorio-periodo/:inicial/:final', authMidleware, authorizeRoles('usuario','editor', 'admin'), relatorioController.filtroPeriodo);

module.exports = relatorioRoutes;