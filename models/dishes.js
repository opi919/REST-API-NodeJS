const mongoose = require('mongoose');

const DishesSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Dishes', DishesSchema);