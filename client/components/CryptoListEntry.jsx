import React, { useState, useEffect } from 'react';
const ccxt = require('ccxt');
import axios from 'axios';

const CryptoListEntry = ({ crypto }) => {

  const [clicked, setClicked] = useState(false);
  const [cryptBalance, setCryptBalance] = useState();
  const [dollarBalance, setDollarBalance] = useState();
  const [buyPrice, setBuyPrice] = useState(50);
  const [buyAmount, setBuyAmount] = useState(1);
  const [sellPrice, setSellPrice] = useState(100000);
  const [sellAmount, setSellAmount] = useState(.0004)

  const setPercentColor = (num) => {
    if (Number(num) > 0) {
      return { color: 'green' }
    } else {
      return { color: 'red' }
    }
  }

  const fetchBalance = (symbol) => {
    const coin = symbol.toUpperCase();
    return new Promise ((resolve, reject) => {
      axios.get('/balance/:symbol', { params: coin, symbol })
        .then(result=>{ resolve(result.data)})
        .catch((err) => { reject(err) });
    });
  }

  useEffect(() => {
    fetchBalance(crypto.symbol)
      .then((results) => {
        setCryptBalance(results[0]);
        setDollarBalance(results[1]);
      })
      .catch(err=>console.log(err));
  }, []);

  const postBuyOrder = (price, symbol, amount) => {
    const coin = symbol.toUpperCase();
    axios({
      method: 'post',
      url: '/buyOrder',
      params: { price: price, symbol: coin, amount: amount}
    })
  }

  const postSellOrder = (price, symbol, amount) => {
    const coin = symbol.toUpperCase();
    axios({
      method: 'post',
      url: '/sellOrder',
      params: { price: price, symbol: coin, amount: amount}
    })
  }

  return (
    (!clicked) ?
      <div className='cryptoEntry' onClick={() => setClicked(!clicked)}>
        <div>{crypto.market_cap_rank}</div>
        <div><img className='cryptoImage' src={crypto.image}></img>{crypto.name}</div>
        <div>{crypto.symbol}</div>
        <div>{crypto.current_price}</div>
        <div style={setPercentColor(crypto.price_change_percentage_1h_in_currency)}>{Number((crypto.price_change_percentage_1h_in_currency).toFixed(2)) + '%'}</div>
        <div style={setPercentColor(crypto.price_change_percentage_24h)}>{Number((crypto.price_change_percentage_24h).toFixed(2)) + '%'}</div>
        <div style={setPercentColor(crypto.price_change_percentage_7d_in_currency)}>{Number((crypto.price_change_percentage_7d_in_currency).toFixed(2)) + '%'}</div>
        <div style={setPercentColor(crypto.price_change_percentage_1y_in_currency)}>{Number((crypto.price_change_percentage_1y_in_currency).toFixed(2)) + '%'}</div>
      </div> :
      <div>
        <div className='cryptoEntry' onClick={() => setClicked(!clicked)}>
          <div>{crypto.market_cap_rank}</div>
          <div><img className='cryptoImage' src={crypto.image}></img>{crypto.name}</div>
          <div>{crypto.symbol}</div>
          <div>{crypto.current_price}</div>
          <div style={setPercentColor(crypto.price_change_percentage_1h_in_currency)}>{Number((crypto.price_change_percentage_1h_in_currency).toFixed(2)) + '%'}</div>
          <div style={setPercentColor(crypto.price_change_percentage_24h)}>{Number((crypto.price_change_percentage_24h).toFixed(2)) + '%'}</div>
          <div style={setPercentColor(crypto.price_change_percentage_7d_in_currency)}>{Number((crypto.price_change_percentage_7d_in_currency).toFixed(2)) + '%'}</div>
          <div style={setPercentColor(crypto.price_change_percentage_1y_in_currency)}>{Number((crypto.price_change_percentage_1y_in_currency).toFixed(2)) + '%'}</div>
        </div>
        <div className='cryptoChart'>
          <coingecko-coin-compare-chart-widget coin-ids={crypto.id} currency="usd" locale="en">
          </coingecko-coin-compare-chart-widget>
          <coingecko-coin-converter-widget coin-id={crypto.id} currency="usd" background-color="#000000" font-color="#4c4c4c" locale="en"></coingecko-coin-converter-widget>
          <div>{crypto.symbol + ' balance: ' + cryptBalance}</div>
          <div>{`USDT balance: $${dollarBalance.toFixed(2)}`}</div>
          <input type='text'></input>
          <input type='text'></input>
          <button onClick={()=>postSellOrder(sellPrice, crypto.symbol, sellAmount)}>buy Order</button>
          <button>Sell Order</button>
        </div>
      </div>

  )
}

export default CryptoListEntry;