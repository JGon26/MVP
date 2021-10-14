import React, { useState, useEffect } from 'react';
const ccxt = require('ccxt');
import axios from 'axios';
import OpenOrdersList from './OpenOrdersList.jsx'
// import CryptoModal from './CryptoModal.jsx';

const CryptoListEntry = ({ crypto }) => {

  const [clicked, setClicked] = useState(false);
  const [cryptBalance, setCryptBalance] = useState();
  const [dollarBalance, setDollarBalance] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [buyAmount, setBuyAmount] = useState();
  const [sellPrice, setSellPrice] = useState();
  const [sellAmount, setSellAmount] = useState();
  const [usdAmountBuy, setUsdAmountBuy] = useState();
  const [usdAmountSell, setUsdAmountSell] = useState();
  const [openOrders, setOpenOrders] = useState([]);

  const setPercentColor = (num) => {
    if (Number(num) > 0) {
      return { color: 'green' }
    } else {
      return { color: 'red' }
    }
  }

  const fetchBalance = (symbol) => {
    const coin = symbol.toUpperCase();
    return new Promise((resolve, reject) => {
      axios.get('/balance/:symbol', { params: coin, symbol })
        .then(result => { resolve(result.data) })
        .catch((err) => { reject(err) });
    });
  }

  const fetchOpenOrders = (crypto) => {
    const market = `${crypto.symbol.toUpperCase()}/USDT`;

    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/fetchOrders',
        params: { market: market }
      })
        .then(results => resolve(results))
        .catch(err => reject(err));
    })
  }

  useEffect(() => {
    Promise.all([
      fetchBalance(crypto.symbol),
      fetchOpenOrders(crypto)
    ])
      .then(([results, orders]) => {
        setCryptBalance(results[0]);
        setDollarBalance(results[1]);
        setOpenOrders(orders.data);
      })

      // fetchBalance(crypto.symbol)
      // .then((results) => {
      //   setCryptBalance(results[0]);
      //   setDollarBalance(results[1]);
      // })
      .catch(err => console.log(err));
  }, []);

  const postBuyOrder = (price, symbol, amount) => {
    const coin = symbol.toUpperCase();
    axios({
      method: 'post',
      url: '/buyOrder',
      params: { price: price, symbol: coin, amount: amount }
    })
      .then(() => {
        setBuyPrice('');
        setBuyAmount('');
        setUsdAmountBuy('');
      })
  }

  const postSellOrder = (price, symbol, amount) => {
    const coin = symbol.toUpperCase();
    axios({
      method: 'post',
      url: '/sellOrder',
      params: { price: price, symbol: coin, amount: amount }
    })
      .then(() => {
        setSellPrice('');
        setSellAmount('');
        setUsdAmountSell('');
      })
  }

  const cancelOrder = (id, market) => {
    axios({
      method: 'post',
      url: '/cancel',
      params: { id: id, market: market}
    })
    .then(()=>{
      fetchOpenOrders(crypto)
      .then((orders)=> setOpenOrders(orders.data))
    })
  }

  return (
    <div className='cryptoEntry' onClick={() => setClicked(!clicked)}>
      <div>{crypto.market_cap_rank}</div>
      <div><img className='cryptoImage' src={crypto.image}></img>{crypto.name}</div>
      <div>{crypto.symbol}</div>
      <div>{crypto.current_price}</div>
      <div style={setPercentColor(crypto.price_change_percentage_1h_in_currency)}>{Number((crypto.price_change_percentage_1h_in_currency).toFixed(2)) + '%'}</div>
      <div style={setPercentColor(crypto.price_change_percentage_24h)}>{Number((crypto.price_change_percentage_24h).toFixed(2)) + '%'}</div>
      <div style={setPercentColor(crypto.price_change_percentage_7d_in_currency)}>{Number((crypto.price_change_percentage_7d_in_currency).toFixed(2)) + '%'}</div>
      <div style={setPercentColor(crypto.price_change_percentage_1y_in_currency)}>{Number((crypto.price_change_percentage_1y_in_currency).toFixed(2)) + '%'}</div>
      {(!clicked) ? <div className="cryptoModal" onClick={() => setClicked(!clicked)}>
        <div className="crypto-modal-content" onClick={e => e.stopPropagation()}>
          <div className="crypto-modal-body">
            <div className='cryptoChart'>
              <coingecko-coin-compare-chart-widget coin-ids={crypto.id} currency="usd" locale="en">
              </coingecko-coin-compare-chart-widget>
              <coingecko-coin-converter-widget coin-id={crypto.id} currency="usd" background-color="#000000" font-color="#4c4c4c" locale="en"></coingecko-coin-converter-widget>
            </div>
            <div className='orderWidget'>
              <div className='cryptoBalance' >{crypto.symbol + ' balance: ' + cryptBalance}</div>
              <div className='dollarBalance' >{`USDT balance: $${dollarBalance}`}</div>
              <div className='buyOrderBox'>
                <input className='buyInput' placeholder='Price' type='text' onChange={(e) => { setBuyPrice(e.target.value) }} value={buyPrice}></input>
                <input className='buyInput' placeholder='Amount' type='text' onChange={(e) => { setBuyAmount(e.target.value); setUsdAmountBuy(buyPrice * buyAmount) }} value={buyAmount}></input>
                <input className='buyInput' placeholder='Total USDT' type='text' value={usdAmountBuy} onChange={(e) => { setUsdAmountBuy(e.target.value); setBuyAmount(usdAmountBuy / buyPrice) }}></input>
                <button className='buybutton' onClick={() => postBuyOrder(buyPrice, crypto.symbol, buyAmount)}>buy Order</button>
              </div>
              <div className='sellOrderBox'>
                <input className='sellInput' placeholder='Price' type='text' onChange={(e) => { setSellPrice(e.target.value) }} value={sellPrice}></input>
                <input className='sellInput' placeholder='Amount' type='text' onChange={(e) => { setSellAmount(e.target.value); setUsdAmountSell(buyPrice * sellAmount) }} value={sellAmount}></input>
                <input className='sellInput' placeholder='Total USDT' type='text' onChange={(e) => { setUsdAmountSell(e.target.value); setSellAmount(usdAmountSell / sellPrice) }} value={usdAmountSell}></input>
                <button className='sellButton' onClick={() => postSellOrder(sellPrice, crypto.symbol, sellAmount)} >Sell Order</button>
              </div>
              <OpenOrdersList orders={openOrders} cancelOrder={cancelOrder}/>
            </div>
          </div>
        </div>
      </div> : null}
    </div>
  )
}

export default CryptoListEntry;