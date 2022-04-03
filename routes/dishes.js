const express = require('express');
const router = express.Router();
router.use(express.json());
const dishes = require('../models/dishes');

router.post('/', (req, res) => {
    const dish = new dishes({
        label: req.body.label,
        price: req.body.price,
    });
    dish.save().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message });
    });
});
router.get('/', async (req, res) => {
    try {
        const dish = await dishes.find();
        res.json(dish);
    }
    catch (err) {
        res.json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const dish = await dishes.findById(req.params.id);
        res.json(dish);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const dish = await dishes.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    label: req.body.label,
                    price: req.body.price,
                }
            },
            { new: true });
        res.json(dish);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const dish = await dishes.findByIdAndRemove(req.params.id);
        res.json({ message: 'Dish deleted' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;