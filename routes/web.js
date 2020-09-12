let router = require('express').Router();
let homepageController = require('../controllers/HomepageController');
let appController = require('../controllers/AppController');
let authController = require('../controllers/AuthController');
let authValidator = require('../validators/AuthValidators');
let passport = require('passport');

router.get('/', homepageController.index);

// Authentication routes
router.get('/login', authController.login);
router.get('/register', authController.register);

router.post('/register', authValidator.store, authController.store);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-fail', successRedirect: '/protected' }));
router.get('/protected', (req, res) => {
  res.send('Usuario logueado con éxito');
});
router.get('/login-fail', (req, res) => {
  res.send('El usuario no tiene una sesión válida');
});

router.get('/users', authValidator.userAuth, authValidator.adminAuth, appController.users);
router.get('/dashboard', authValidator.userAuth, appController.dashboard);

module.exports = router;
