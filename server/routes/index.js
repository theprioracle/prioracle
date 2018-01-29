const Router = require('koa-router');
const router = new Router();
const listingRoutes = require('./listings');
const userRoutes = require('./users');
const priceRoutes = require('./prices');

router.use(listingRoutes.routes());
router.use(userRoutes.routes());
router.use(priceRoutes.routes());

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

module.exports = router;

// this will dynamically create routes

// module.exports = async function(ctx, next){
//   console.log('hits router')
//   let routing = ctx.path.slice(1).split('/');
//   if(routing.length < 2) return;
//   ctx.state.primary = routing[0];
//   ctx.state.game = routing[1];
//   ctx.body = await require(`./${ctx.state.primary}/${ctx.state.game}`)(ctx, next);
// }
