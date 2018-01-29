const Router = require('koa-router');
const router = new Router();
const { Price } = require('../db/models');

module.exports = router;

router.get('/', async (ctx) => {
  ctx.body = await Price.findAll({
    include: [
      {
        model: Listing
      }
    ]
  });
})
