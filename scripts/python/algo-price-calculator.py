import os
import sys

import pickle
import psycopg2
import numpy as np


## Load vectorizer and model
cwd = os.getcwd()
vectorizer_path = os.path.join(cwd, 'vectorizer.pkl')
model_path = os.path.join(cwd, 'model.pkl')

vectorizer = pickle.load( open(vectorizer_path, 'rb') )
model = pickle.load( open(model_path, 'rb') )

## Connect to the database
conn = psycopg2.connect('dbname=prioracle')


## Open a cursor to perform database operations
cur = conn.cursor()

## Fetch last listing
cur.execute('''
    SELECT id, name, condition, category, brand, "sellerShips", description
    FROM listings
    WHERE id = (SELECT MAX(id) FROM listings);
''')
colnames = [desc[0] for desc in cur.description]
last_listing = dict( zip(colnames, cur.fetchone()) )

## Convert fetched listing into a vectorizer-compatible format
condition_hashmap = {
    'New': 1, 
    'Like New': 2, 
    'Good': 3,
    'Fair': 4,
    'Poor': 5
}

last_listing['id'] = str(last_listing['id'])
last_listing['condition'] = str( condition_hashmap[ last_listing['condition'] ] )
last_listing['category'] = 'Other' if not last_listing['category'] else last_listing['category']
last_listing['brand'] = 'missing' if not last_listing['brand'] else last_listing['brand']
last_listing['sellerShips'] = str(1 if last_listing['sellerShips'] else 0)
last_listing['description'] = 'None' if not last_listing['description'] else last_listing['description']

X = [', '.join( last_listing.values() )]

## Vectorize the listing
X_vect = vectorizer.transform(X)

## Predict listing's price and express it in cents
algo_price = np.round( np.expm1(model.predict(X_vect)[0]) )
algo_price_in_cents = int(algo_price * 100)

## Send data back to NodeJS
print(algo_price_in_cents)
sys.stdout.flush()

## Close communication with the database
cur.close()
conn.close()

