[![Waffle.io - Columns and their card count](https://badge.waffle.io/59a664c71a08a57c328429259a878d3f4a42482cd6806ca29c2e07649bbbdc6e.svg?columns=all)](https://waffle.io/ArnoldSalas/prioracle)
# Prioracle (v0.1)

Prioracle is a tool for generating fair prices for products from listing information.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). The readme for the module is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

### Installation

To install, fork the repository and run the following command:

```
npm install
```

To configure the server, check the following line near the top of App.js (currently line 23 at this time):

```
export const dbUrl = 'https://obscure-wave-65872.herokuapp.com';
```

Make sure that this variable is configured before running the Prioracle mobile application.

### Running the app

Prioracle currently relies on Expo for running the app. There are two methods for deployment - the Expo XDE may be utilized for setting up the tunnel or the following command may be run, although an iOS simulator must be configured beforehand:

```
npm run ios
```

### Features

As of this version, Prioracle can calculate a price for a product based on the following information.

- Product Name
- Product Brand
- Product Description
- Product Category
- Product Condition
- Product Shipper, e.g. vendor or customer pays for shipping?

Utilizing both a machine learning algorithm and a web scraper, Prioracle will take into account all aspects of a product listing and calculate a fair price to sell the product at.

Additionally, the user may view all of the listings they have submitted to Prioracle. There are also data visualization components for displaying changes in the price valuations over time.
