const express = require('express');
require('dotenv').config();
const cors = require('cors');
const initDB = require('./db').initDB;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

initDB();

const routes = require('./routes/user');
app.use('/', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));