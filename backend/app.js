const express = require('express');
const cors = require('cors');

const mongoose = require('./db/mongoose');

const todoRouter = require('./routes/todoRoutes');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/v1/todo', todoRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

module.exports = app;