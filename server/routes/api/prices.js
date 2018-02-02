const Router = require('koa-router');
const router = new Router();
const { Valuation, Listing } = require('../../db/models');

module.exports = router;

router.get('/', async (ctx) => {
  ctx.body = await Valuation.findAll({
    include: [
      {
        model: Listing
      }
    ]
  });
})

router.post('/', async (ctx) => {
  ctx.body = await Valuation.create(ctx.request.body);
})
