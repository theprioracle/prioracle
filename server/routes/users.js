const Router = require('koa-router');
const router = new Router();
const { User } = require('../db/models');

module.exports = router;

router.get('/', async (ctx) => {
  ctx.body = await User.findAll({
    include: []
  });
})
