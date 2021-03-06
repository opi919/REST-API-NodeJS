const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
require('dotenv').config();
// const cors = require('cors');

// middleware
// app.use(cors());

//routes
app.use('/users', require('./routes/users'));
app.use('/promotions', require('./routes/promotions'));
app.use('/leaders', require('./routes/leaders'));
app.use('/dishes', require('./routes/dishes'));

//connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to database');
});

//start server
app.listen(8000, () => {
    console.log('server started on port 8000');
});