const express = require('express');
const router = express.Router();
router.use(express.json());
const leaders = require('../models/leaders');

router.get('/', async (req, res) => {
    try {
        const leader = await leaders.find();
        res.json(leader);
    }
    catch (err) {
        res.json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const leader = await leaders.findById(req.params.id);
        res.json(leader);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.post('/', (req, res) => {
    const leader = new leaders({
        name: req.body.name,
        image: req.body.image,
        designation: req.body.designation,
        abbr: req.body.abbr,
        description: req.body.description
    });
    leader.save().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message });
    });
});
router.put('/:id', async (req, res) => {
    try {
        const leader = await leaders.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    name: req.body.name,
                    image: req.body.image,
                    designation: req.body.designation,
                    abbr: req.body.abbr,
                    description: req.body.description
                }
            },
            { new: true });
        res.json(leader);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const leader = await leaders.findByIdAndRemove(req.params.id);
        res.json(leader);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;