var express = require('express');
const {OperationHelper} = require('apac');

let avgPrice = 0, count = 0, min = 0, max = 0, mean = 0;

var OpHelper = new OperationHelper({
  awsId: 'AKIAJVKS4SHSLFGXRFFA',
  awsSecret: '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',
  assocId: 'krisp1984-20',
  locale: 'US'
});

function scrapePrice(keyword, condition) {

  OpHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': keyword,
    'ResponseGroup': 'ItemAttributes, Offers',
    'ItemPage': 1
  })
  .then((response) => {
    let tempData = response.result.ItemSearchResponse.Items.Item;
    tempData.forEach(function(value, index) {
      let price = +value.OfferSummary.LowestNewPrice.Amount;
      if(!index)
        min = price;
      if( price > max )
        max = price;
      if(price < min)
        min = price;
      avgPrice += price;
      count++;
    });
    mean = Math.round(avgPrice/count)/100;
    if(condition === "Like New")
      mean = (mean*9)/10;
    else if(condition === "Good")
      mean = (mean*8)/10;
    else if(condition === "Fair")
      mean = (mean*7)/10;
    else if(contion === "Poor")
      mean = (mean*6)/10;

    return {
      min:  min/100,
      max: max/100,
      mean
    };
  })
  .catch((err) => {
    console.error("Something went wrong! ", err);
  });
}

module.exports = {scrapePrice};
