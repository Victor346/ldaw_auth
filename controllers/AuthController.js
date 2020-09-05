let UserModel = require('../models/User');

exports.login = (req, res) => {
  res.render('auth/login', { layout: 'auth' });
}

exports.register = (req, res) => {
  res.render('auth/register', { layout: 'auth' });
}

exports.store = (req, res) => {
  UserModel.create(req.body)
    .then((data) => {
      return res.send('Usuario creado');
    })
    .catch((error) => {
      console.log(error);
    });
  // res.send('Registrar usuario');
}
