const express = require('express');
const router = express.Router();
router.use(express.json());
const promotions = require('../models/promotions');
const {admin,owner} = require('../middleware')

router.get('/', async (req, res) => {
    try {
        const promotion = await promotions.find();
        res.json(promotion);
    }
    catch (err) {
        res.json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const promotion = await promotions.findById(req.params.id);
        res.json(promotion);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.post('/', admin(["admin"]), (req, res) => {
    const promotion = new promotions({
        name: req.body.name,
        image: req.body.image,
        label: req.body.label,
        price: req.body.price,
        description: req.body.description,
        featured: req.body.featured
    });
    promotion.save().then((data) => {
        console.log(data.dish);
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message });
    });
});
router.put('/:id', admin(["admin"]), async (req, res) => {
    try {
        const promotion = await promotions.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    name: req.body.name,
                    image: req.body.image,
                    label: req.body.label,
                    price: req.body.price,
                    description: req.body.description,
                    featured: req.body.featured
                }
            },
            { new: true });
        res.json(promotion);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.delete('/:id', admin(["admin"]), async (req, res) => {
    try {
        const promotion = await promotions.findByIdAndRemove(req.params.id);
        res.json(promotion);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;