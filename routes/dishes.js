const express = require('express');
const router = express.Router();
router.use(express.json());
const dishes = require('../models/dishes');
const { admin, owner } = require('../middleware')

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
router.get('/:id/comments', async (req, res) => {
    try {
        const dish = await dishes.findById(req.params.id);
        res.json(dish.comments);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.post('/', admin(["admin"]), (req, res) => {
    const dish = new dishes({
        label: req.body.label,
        price: req.body.price,
        comments: req.body.comments
    });
    dish.save().then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message });
    });
});
router.put('/:id', admin(["admin"]), async (req, res) => {
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
router.delete('/:id', admin(["admin"]), async (req, res) => {
    try {
        const dish = await dishes.findByIdAndRemove(req.params.id);
        res.json({ message: 'Dish deleted' });
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.use('/:id/comments', owner, async (req, res) => {
    try {
        const dish = await dishes.findById(req.params.id);
        comments = dish.comments
        var result = comments.filter(x => x.name === req.body.name);
            comments.splice(comments.indexOf(result[0]), 1);
            await dishes.findByIdAndUpdate(req.params.id, { comments: comments });
            res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;