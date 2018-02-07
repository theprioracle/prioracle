/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User, Listing, Valuation } = require('../server/db/models');

async function seed () {
  await db.sync({force:true});
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
      const users = await Promise.all([
        User.create({email: 'cody@email.com', password: '123', firstName: 'Cody', lastName: 'G', }),
        User.create({email: 'murphy@email.com', password: '123', firstName: 'Murph', lastName: 'Y'}),
      ]);

  const listings = await Promise.all([
    Listing.create({
      name: 'Razer BlackWidow Chroma Keyboard', description: 'This keyboard is in great condition and works like it came out of the box. All of the ports are tested and work perfectly. The lights are customizable via the Razer Synapse app on your PC.', condition: 'Good', category: 'Electronics/Computers & Tablets/Components & Parts', brand: 'Razer', sellerShips: false, status: 'active'
    })
    .then(listing => listing.setUsers([1])),
    Listing.create({
      name: 'Little mermaid handmade dress', description: 'Little mermaid handmade dress never worn size 2t', condition: 'Like New', category: 'Kids/Girls 2T-5T/Dresses', brand: 'Disney', sellerShips: false, status: 'active'
    })
    .then(listing => listing.setUsers([2])),
    Listing.create({
      name: 'Bath & Body Works Banana Kiwi Colada', description: 'Selling this hard to find 3 wick candle test scent - it was exclusive to white barn - never been burned -', condition: 'Good', status: 'active', category: 'Beauty/Fragrance/Candles & Home Scents', brand: 'Bath & Body Works', sellerShips: true
    })
    .then(listing => listing.setUsers([1,2]))
  ]);


  const prices = await Promise.all([
    Valuation.create({
      soldPrice: 52,
      algoPrice: 20,
      scraperPrice: 30
    })
    .then(price => price.setListing(1)),
    Valuation.create({
      soldPrice: 31,
      algoPrice: 60,
      scraperPrice: 50
    })
    .then(price => price.setListing(1)),
    Valuation.create({
      soldPrice: 31,
      algoPrice: 20,
      scraperPrice: 10
    })
    .then(price => price.setListing(1)),
    Valuation.create({
      soldPrice: 14,
      algoPrice: 40,
      scraperPrice: 30
    })
    .then(price => price.setListing(2)),
    Valuation.create({
      soldPrice: 31,
      algoPrice: 20,
      scraperPrice: 50
    })
    .then(price => price.setListing(3))
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${prices.length} prices`);
  console.log(`seeded ${listings.length} listings`);


  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
