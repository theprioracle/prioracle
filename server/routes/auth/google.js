const passport = require('koa-passport');
const Router = require('koa-router');
const router = new Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

//   console.log('Google client ID / secret not found. Skipping Google OAuth.')

// } else {

  // const googleConfig = {
  //   clientID: '944065793816-bfait7d7ffa2m7l416jfpq7ubs96f34o.apps.googleusercontent.com',
  //   clientSecret: 'jHAy0z6-R33kGvdADCdbp6Gk',
  //   callbackURL: 'http://localhost:8080/auth/google/callback'
  // }



  // const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  //   const googleId = profile.id
  //   const [firstName, lastName] = profile.displayName.split(' ')
  //   const email = profile.emails[0].value

  //   User.find({where: {googleId}})
  //     .then(foundUser => (foundUser
  //       ? done(null, foundUser)
  //       : User.create({firstName, lastName, email, googleId})
  //         .then(createdUser => done(null, createdUser))
  //     ))
  //     .catch(done)
  // })

  // passport.use(strategy)

  router.post('/', async (ctx) => {
    console.log(ctx.request.body)
    let [user] = await User.findOrCreate({
      where: {
        email: ctx.request.body.email,
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        googleId: ctx.request.body.googleId
      }
    })
    await ctx.login(user)
    console.log(ctx.state.user)
    ctx.body = user;
  })

  router.get('/', passport.authenticate('google', {scope: 'email'}))

  router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (ctx) => {
      ctx.redirect('OAuthLogin://login?user=' + JSON.stringify(ctx.request.user))
    }
);


// }
