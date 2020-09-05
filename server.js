let express = require('express');
let app = express();
let webRoutes = require('./routes/web');

/**
 * Configurations
 */

let appConfig = require('./configs/app');

// Views engine
let exphbs = require('express-handlebars');
// Imports a set of helpers for handlebars
// https://github.com/helpers/handlebars-helpers
let hbshelpers = require("handlebars-helpers");
let multihelpers = hbshelpers();
const extNameHbs = 'hbs';
let hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */
app.use('/', webRoutes);

/**
 * App Init
 */
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
