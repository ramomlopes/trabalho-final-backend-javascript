const express = require('express');

const chamadoService = require('./services/chamadoService.js');
const logMiddleware = require('./middlewares/logMiddleware.js');
const LoggerObserver = require('./observers/LoggerObserver.js');

const chamadoRoutes = require('./routes/chamadoRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const indicadoresRoutes = require('./routes/indicadoresRoutes.js');
const relatorioRoutes = require('./routes/relatorioRoutes.js');

const app = express();

app.use(express.json());
app.use(logMiddleware);

chamadoService.addObservador(new LoggerObserver());

app.use(chamadoRoutes);
app.use(loginRoutes);
app.use(indicadoresRoutes);
app.use(relatorioRoutes);

app.use((req, res) => {
    return res.status(404).json({ erro: 'PAGE NOT FOUND: Página não encontrada' });
});

module.exports = app;