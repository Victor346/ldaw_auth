// validators/AuthValidator.js
// Importamos express-validators para ayudarnos a implementar las reglas
// de validación
const { check } = require('express-validator');

const UserModel = require('../models/User');

// Escribimos las reglas de validación para la acción register
exports.store = [
  // Revisa que el nombre no sea vacío
  check('name').notEmpty(),
  // Revisa que el correo sea un mail
  check('email').isEmail(),
  // Revisa que el password este definido
  check('password').notEmpty(),
  // Revisa que el password sea el mismo
  check('password').custom((value, {req, loc, path}) => {
    if (value !== req.body.password_confirmation) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  })
];

exports.userAuth = (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }

  return res.redirect('/register');
}

exports.adminAuth = (req, res, next) => {
  UserModel.findById(req.session.passport.user).then((data) => {
    if (data.role == "admin") { return next(); }

    return res.status(403).json( { error: "Access denied" })
  }).catch((error) => {
    console.error(error)
  });
}
