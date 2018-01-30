const Router = require('koa-router');
const router = new Router();
const { Listing, Price, User } = require('../db/models');

module.exports = router;

let attributes = ['id', 'name', 'description', 'category', 'condition', 'status', 'sellerShips'];

router.get('/', async (ctx) => {
  let whereQ = {};
  if (ctx.query.condition) whereQ.condition = ctx.query.condition;
  if (ctx.query.status) whereQ.status = ctx.query.status;
  if (ctx.query.status) whereQ.id = ctx.query.id;
  ctx.body = await Listing.findAll({
    where:  whereQ,
    include: [{ model: Price, attributes: ['metaPrice', 'algoPrice', 'scraperPrice', 'soldPrice', 'date']}, { model: User, attributes: ['email', 'firstName', 'lastName']}],
    attributes: attributes
  });
})

router.get('/:id', async (ctx) => {
  ctx.body = await Listing.findOne({
    where: {
      id: ctx.params.id
    },
    include: [{ model: Price, attributes: ['metaPrice', 'algoPrice', 'scraperPrice', 'soldPrice', 'date']}, { model: User, attributes: ['email', 'firstName', 'lastName']}],
    attributes: attributes
  })
})

router.post('/', async (ctx) => {
  ctx.body = await Listing.create(ctx.request.body);
})
