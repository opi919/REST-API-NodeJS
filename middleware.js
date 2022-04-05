const dishes = require('./models/dishes');

const admin = (permission) => {
    return (req, res, next) => {
        const role = req.body.role;
        if (permission.includes(role)) {
            next()
        }
        else {
            res.json("You are not an admin")
        }
    }
}
const owner = async (req, res, next) => {
    const dish = await dishes.findById(req.params.id);
    comments = dish.comments
    var result = comments.filter(x => x.name === req.body.name);
    if (result.length > 0) next()
    else res.json("You are not the owner")
}

module.exports = { admin, owner };