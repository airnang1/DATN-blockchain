const User = require('../models/User');

const authAdmin = (req, res, next) => {
    auth(req, res, async () => {
        const user = await User.findOne({_id: req.user.id});
        if(user.isAdmin) {
            next();
        }else {
            return res.status(403).json({ msg: 'You are not Admin!' });
        }
    })
};

module.exports = authAdmin;
