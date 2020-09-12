const UserModel = require('../models/User');

exports.dashboard = (req, res) => {
    res.render('app/dashboard');
}

exports.users = (req, res) => {
    UserModel.findAll().then((users) => {
        res.render('app/users', { users: users });
    });
}