const Router = require('koa-router');
const router = new Router();
const {User} = require('../../db/models')

router.post('/login', async (ctx) => {
  console.log('hits auth/login endpoint')
  // Look for user by email address
  let user = await User.findOne({
      where: {
          email: ctx.request.body.email
      }
  })
  // If a user is not found 
  if (!user) {
      ctx.status = 401;
      ctx.body = 'User Not Found';
  }
  // Else if the password is incorrect
  else if (!user.correctPassword(ctx.request.body.password)) {
    ctx.status = 401;
    ctx.body = 'Invalid password';
  }
  // Otherwise, log the user in
  else {
    await ctx.login(user);
    ctx.body = 'Succesful Login'
  }
})

router.post('/logout', (ctx) => {
  ctx.logout();
  ctx.body = 'logged out';
})

router.post('/signup', async (ctx) => {
  let user = await User.findOne({
    where: {email: ctx.request.body.email}
  })
  if (!user) {
    user = await User.create(ctx.request.body);
    ctx.body = user;
  }
  else ctx.body = 'User already exists';
})

router.get('/me', (ctx) => {
  ctx.body = ctx.state.user;
})
module.exports = router;