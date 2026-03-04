const express = require('express');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(express.json());

app.use(userRoutes);

app.use((req, res) => {
    return res.status(404).json({ erro: 'PAGE NOT FOUND' });
});

module.exports = app;