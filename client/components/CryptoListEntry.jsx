import React from 'react';

const CryptoListEntry = ({ crypto }) => {

  const setPercentColor = (num) => {
    if (Number(num) > 0) {
      return { color: 'green' }
    } else {
      return {color: 'red' }
    }
  }

  return (
    <div className='cryptoEntry'>
      <div>{crypto.market_cap_rank}</div>
      <div>{crypto.name}</div>
      <div>{crypto.symbol}</div>
      <div>{crypto.current_price}</div>
      <div style={setPercentColor(crypto.price_change_percentage_1h_in_currency)}>{Number((crypto.price_change_percentage_1h_in_currency).toFixed(2)) + '%'}</div>
      <div style={setPercentColor(crypto.price_change_percentage_24h)}>{Number((crypto.price_change_percentage_24h).toFixed(2)) + '%'}</div>
      <div style={setPercentColor(crypto.price_change_percentage_7d_in_currency)}>{Number((crypto.price_change_percentage_7d_in_currency).toFixed(2)) + '%'}</div>
      <div style={setPercentColor(crypto.price_change_percentage_1y_in_currency)}>{Number((crypto.price_change_percentage_1y_in_currency).toFixed(2)) + '%'}</div>
    </div>
  )
}

export default CryptoListEntry;