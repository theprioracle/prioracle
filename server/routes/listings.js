const Router = require('koa-router');
const router = new Router();
const { Listing } = require('../db/models');

module.exports = router;

router.get('/', async (ctx) => {
  let whereQ = {};
  if (ctx.query.condition) whereQ.condition = ctx.query.condition;
  if (ctx.query.status) whereQ.status = ctx.query.status;
  console.log('hits listings route', ctx.query)
  ctx.body = await Listing.findAll({
    where:  whereQ
  });
})

router.get('/:id', async (ctx) => {
  ctx.body = await Listing.findOne({
    where: {
      id: ctx.params.id
    }
  })
})
