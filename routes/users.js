const express = require('express')
const router = express.Router()
const {admin,owner} = require('../middleware')
const users = require('../models/users')
router.use(express.json())
const bcrypt = require('bcrypt');

router.get('/', admin(["admin"]), async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const user = new users({
            name: req.body.name,
            password: hashedPass,
            role: req.body.role
        });
        user.save().then((data) => {
            res.json(data);
        })
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;