const Router = require('koa-router');
const router = new Router();

router.post('/login', async (ctx) => {
    // Look for user by email address
    let user = await User.findOne({
        where: {
            email: ctx.request.body.email
        }
    })
    // If a user is not found 
    if (!user) {
        ctx.body.status = 401;
        ctx.body.message = 'User Not Found';
    }
    // Else if the password is incorrect
    else if (!user.correctPassword(ctx.request.body.password)) {
        ctx.body.message = 'Incorrect Password';
        ctx.body.status = 401;
    }
    // Otherwise, log the user in
    else ctx.login;
  })
  
  router.post('/signup', (req, res, next) => {
    User.create(req.body)
      .then(user => {
        req.login(user, err => (err ? next(err) : res.json(user)))
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(401).send('User already exists')
        } else {
          next(err)
        }
      })
  })
  
  router.post('/logout', (req, res) => {
    req.logout()
    req.session.cart = {items: {}, total: 0}
    res.redirect('/')
  })
  
  router.get('/me', (req, res) => {
    res.json(req.user)
  })

module.exports = router;