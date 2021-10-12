import React from 'react';

const CryptoListEntry = ({ crypto }) => {

  return (
    <div className='cryptoEntry'>
      <div>{crypto.market_cap_rank}</div>
      <div>{crypto.name}</div>
      <div>{crypto.symbol}</div>
      <div>{crypto.current_price}</div>
      <div>{crypto.price_change_percentage_24h}</div>
    </div>
  )
}

export default CryptoListEntry;