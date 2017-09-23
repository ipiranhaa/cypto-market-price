const request = require('request');
const _ = require('lodash');

const uri = {
  fetch: 'https://bx.in.th/api/'
}

const filter = [
  1,  // BTC
  21, // ETH
  26  // OMG
]

function parser(data) {
  return {
    name: data.secondary_currency,
    last_price: data.last_price,
    currency: data.primary_currency,
    change: data.change,
    volume: data.volume_24hours
  }
}

const fetch = function(callback) {
  callback = callback || function() {};
  const val = []
  request(uri.fetch, function (err, resp) {
    if (!err) {
      const data = JSON.parse(resp.body);
      _.each(filter, function(num) {
        val.push(parser(data[num.toString()]));
      })
      
      callback(val);
    } else {
      console.log('error:', err);
      callback(false);
    }
  });
}


module.exports = {
  fetch
};
