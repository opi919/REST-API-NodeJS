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
    // comments
    comments: [{
        name: String,
        comment: String
    }],

});

module.exports = mongoose.model('Dishes', DishesSchema);