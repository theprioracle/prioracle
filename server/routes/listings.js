const Router = require('koa-router');
const router = new Router();
const { Listing } = require('../db/models');

module.exports = router;

router.get('/', async (ctx) => {
  console.log('hits listings route')
  ctx.body = await Listing.findAll();
})

router.get('/:id', async (ctx) => {
  ctx.body = await Listing.findOne({
    where: {
      id: ctx.params.id
    }
  })
})
