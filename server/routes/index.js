const Router = require('koa-router');
const router = new Router();
const authRoutes = require('./auth')
const apiRoutes = require('./api')

router.use('/auth', authRoutes.routes());
router.use('/api', apiRoutes.routes());


// default get
router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

module.exports = router;
