const express = require('express');
const path = require('path');
const app = express();
const binance = require('../cryptoBot.js');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/balance/:symbol', function(req, res) {
  console.log(req.query['0']);

  binance.fetchBalances(req.query['0'])
    .then(results=>res.end(JSON.stringify(results)))
    .catch(err=>console.log(err));
});

app.get('/fetchOrders', function(req, res) {
  console.log(req.query);
  binance.fetchOpenOrders(req.query.market)
    .then(results=>res.end(JSON.stringify(results)))
    .catch(err=>console.log(err));
})

app.post('/buyOrder', function(req, res) {

  const { symbol, amount, price } = req.query;

  binance.createLimitBuyOrder(symbol, Number(amount), Number(price));
  res.end('buy order posted')
})

app.post('/sellOrder', function(req, res) {
  console.log(req.query);
  const { symbol, amount, price } = req.query;

  binance.createLimitSellOrder(symbol, Number(amount), Number(price));
  res.end('sell order posted')
})

app.post('/cancel', function(req, res) {
  console.log(req.query);
  binance.closeOrder(req.query.id, req.query.market);
  res.end('orderCanceled')
})

app.listen(3000, function() {
  console.log('Listening on port 3000')
})