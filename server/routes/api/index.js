const Router = require('koa-router');
const router = new Router();
const listingRoutes = require('./listings');
const userRoutes = require('./users');
const priceRoutes = require('./prices');

router.use('/listings', listingRoutes.routes());
router.use('/users',userRoutes.routes());
router.use('/prices', priceRoutes.routes());

module.exports = router;
