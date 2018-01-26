const path = require('path');
const Koa = require('koa');
const morgan = require('koa-morgan');
const bodyParser = require('koa-body-parser');
const serve = require('koa-static');
const db = require('./db');
const PORT = process.env.PORT || 8080;
const app = new Koa();

// TEMP
const Router = require('koa-router');
const router = new Router();

module.exports = app;

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */

// secrets are not yet implemented but we may want to use this in the future
// if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser());

  router.get('/api/users', (ctx) => {
    ctx.status = 200
    ctx.body = [{
      id: 1,
      text: 'Switch to Koa',
      completed: true
    }, {
      id: 2,
      text: '???',
      completed: true
    }, {
      id: 3,
      text: 'Profit',
      completed: true
    }]
  });

  app.use(router.routes());
  // makes sure a 405 Method Not Allowed is sent
  app.use(router.allowedMethods())

  // auth and api routes
  // app.use('/api', require('./api'));

  // static file-serving middleware
  // $ GET /package.json
  app.use(serve('.'));

  // $ GET static file
  app.use(serve(path.join(__dirname, '..', 'public')));

};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

};

const syncDb = () => db.sync();

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
    syncDb()
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}
