const Router = require('koa-router');
const router = new Router();
const { User, Listing } = require('../db/models');

module.exports = router;

router.get('/', async (ctx) => {
  ctx.body = await User.findAll({
    include: [],
    attributes: ['email', 'firstName', 'lastName']
  });
})

router.get('/:id', async (ctx) => {
  ctx.body = await User.findOne({
    where: {
      id: ctx.params.id
    },
    attributes: ['email', 'firstName', 'lastName']
  })
})

router.get('/:id/listings', async (ctx) => {
  let user = await User.findOne({
    where: {
      id: ctx.params.id
    }
  })
  let userListings = await user.getListings();
  ctx.body = userListings;
})

router.post('/', async (ctx) => {
  ctx.body = await User.create(ctx.request.body);
})
