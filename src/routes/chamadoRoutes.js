const express = require('express');
const chamadoRoutes = express.Router();
const chamadoController = require('../controllers/chamadoController');
const authMidleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

chamadoRoutes.post('/chamado', authMidleware, authorizeRoles('usuario', 'editor', 'admin'), chamadoController.cadastrarChamado);
chamadoRoutes.put('/chamado/:id', authMidleware, authorizeRoles('editor', 'admin'), chamadoController.atualizarChamado);
chamadoRoutes.put('/chamado-status/:id', authMidleware, authorizeRoles('editor', 'admin'), chamadoController.atualizarStatusChamado);
chamadoRoutes.delete('/chamado/:id', authMidleware, authorizeRoles('admin'), chamadoController.deletarChamado);

module.exports = chamadoRoutes;