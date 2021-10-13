require('dotenv').config;
const ccxt = require('ccxt');
const axios = require('axios');
const binance = require('./binance.config.js');

const config = {
  asset: 'BTC',
  base: 'USDT',
  allocation: 0.009,
  spread: 0.2,
  tickInterval: 2000
};
const market = `${config.asset}/${config.base}`;

const binanceClient = new ccxt.binanceus({
  apiKey: binance.API_KEY,
  secret: binance.API_SECRET
});

const fetchBalances = (symbol) => {
  const balance = [];
  return new Promise((resolve, reject) => {
    binanceClient.fetchBalance()
      .then((results) => {
        resolve([results.free[symbol], results.free['USDT']])
      })
      .catch((err)=>reject(err));
  })
    // .then((result)=> balance.push(result.free[symbol], result.free['USDT']))
    // .catch((err)=>console.log(err));
    // console.log('balance',balance)
    // return balance;
}

binanceClient.fetchBalance()
  .then((balances) => console.log(balances.free['BTC']));

// binanceClient.cancelOrder('376336619', market);
// binanceClient.createLimitBuyOrder(market, 0.001, 20000)
// .catch(err=>console.log(err))

binanceClient.fetchOpenOrders(market)
  .then((orders)=>console.log('orders', orders));


// const tick = async() => {
//   const config = {
//     asset: 'BTC',
//     base: 'USDT',
//     allocation: 0.009,
//     spread: 0.2,
//     tickInterval: 2000
//   };

//   const binanceClient = new ccxt.binanceus({
//     apiKey: '',
//     secret: ''
//   });

//   const { asset, base, spread, allocation } = config;
//   const market = `${asset}/${base}`;

//   const orders = await binanceClient.fetchOpenOrders(market);
//     orders.forEach(async order=> {
//       await binanceClient.cancelOrder(order.id);
//     });

//     const results = await Promise.all([
//       axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
//       axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd')
//     ]);

//     const marketPrice = results[0].data.bitcoin.usd / results[1].data.tether.usd;

//     const sellPrice = marketPrice * (1 + spread);
//     const buyPrice = marketPrice * (1 - spread);
//     const balances = await binanceClient.fetchBalance();
//     const assetBalance = balances.free[asset];
//     const baseBalance = balances.free[base];
//     const sellVolume = assetBalance * allocation;
//     const buyVolume = (baseBalance * allocation) / marketPrice;

//     await binanceClient.createLimitSellOrder(market, sellVolume, sellPrice);
//     await binanceClient.createLimitBuyOrder(market, buyVolume, buyPrice);
// }

// const run = () => {
//   const config = {
//     asset: 'BTC',
//     base: 'USDT',
//     allocation: 0.009,
//     spread: 0.2,
//     tickInterval: 2000
//   };

//   const binanceClient = new ccxt.binanceus({
//     apiKey: '',
//     secret: ''
//   });
//   tick(config, binanceClient);

//   setInterval(tick, config.tickInterval, config, binanceClient);
// }
// run();

module.exports = {
  fetchBalances: fetchBalances
}