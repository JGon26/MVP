import React, { useState } from 'react';

const CryptoListEntry = ({ crypto }) => {

  const [clicked, setClicked] = useState(false);

  const setPercentColor = (num) => {
    if (Number(num) > 0) {
      return { color: 'green' }
    } else {
      return { color: 'red' }
    }
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
          <coingecko-coin-converter-widget  coin-id={crypto.id} currency="usd" background-color="#000000" font-color="#4c4c4c" locale="en"></coingecko-coin-converter-widget>
        </div>
      </div>

  )
}

export default CryptoListEntry;