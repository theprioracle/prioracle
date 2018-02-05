const Router = require('koa-router');
const router = new Router();
const path = require('path')
const { spawn } = require('child_process');
const { Listing, Valuation, User } = require('../../db/models');
const { scrapePrice } = require('../../scraper');

module.exports = router;

let attributes = ['id', 'name', 'description', 'category', 'condition', 'brand', 'status', 'sellerShips'];

let runPy = new Promise((resolve, reject) => {
  const pyprog = spawn(
    'python',
    ['/home/asalas/fullstack-academy/immersive/senior-phase/prioracle/scripts/python/algo-price-calculator.py']
  );
  pyprog.stdout.on('data', (data) => {
    resolve(data);
  });
  pyprog.stderr.on('data', (data) => {
    reject(data);
  });
});


router.get('/', async (ctx) => {
  let whereQ = {};
  if (ctx.query.condition) whereQ.condition = ctx.query.condition;
  if (ctx.query.status) whereQ.status = ctx.query.status;
  if (ctx.query.status) whereQ.id = ctx.query.id;
  ctx.body = await Listing.findAll({
    where:  whereQ,
    include: [{ model: Valuation, attributes: ['metaPrice', 'algoPrice', 'scraperPrice', 'soldPrice', 'createdAt']}, { model: User, attributes: ['email', 'firstName', 'lastName']}],
    attributes: attributes
  });
})

router.get('/:id', async (ctx) => {
  ctx.body = await Listing.findOne({
    where: {
      id: ctx.params.id
    },
    include: [{ model: Valuation, attributes: ['metaPrice', 'algoPrice', 'scraperPrice', 'soldPrice', 'createdAt']}, { model: User, attributes: ['email', 'firstName', 'lastName']}],
    attributes: attributes
  })
})

router.put('/:id', async (ctx) => {
  let listing = await Listing.findOne({
    where: {
      id: ctx.params.id
    },
    include: [{model: Valuation}]
  });
  listing = await listing.update(
    ctx.request.body
  )
  prices = await listing.getValuations()

  // we can then update our most recent price instance for this listing
  let price = await prices[prices.length-1].update({
    // these values are hard-coded now but should come from our algorithm/scraper
    algoPrice: 10,
    scraperPrice: 14
  })
  ctx.body = listing;
})

router.post('/', async (ctx) => {
  let user = await User.findById(Number(ctx.request.body.userId));
  let userListings = await user.getListings();
  let listingInfo = ctx.request.body.listing;
  let updatedListings = [];

  let scraperPrice = await scrapePrice(listingInfo.name, listingInfo.condition);

  const pythonOutput = await runPy.then((fromRunpy) => {
    return fromRunpy.toString();
  })

  let price = await Valuation.create({
    algoPrice: 2 * pythonOutput,
    scraperPrice: scraperPrice.mean
  });

  let listing = await Listing.findOrCreate({
    where: ctx.request.body.listing
  });
  price = await price.setListing(listing[0]);
  listing = await Listing.findOrCreate({
    where: ctx.request.body.listing,
    include: [{model: Valuation}]
  });
  if (user) {
    await userListings.push(listing[0]);
    updatedListings = await userListings.map(listing => Number(listing.id));
    await user.setListings(updatedListings);
  }
  ctx.body = listing;
})
