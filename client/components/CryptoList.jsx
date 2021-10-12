import React, { useState } from 'react';
import CryptoListEntry from './CryptoListEntry.jsx';

const CryptoList = ({ cryptos }) => {

  return (
    <div>
      <div className='navBar'>
        <div>Rank</div>
        <div>Name</div>
        <div>Symbol</div>
        <div>Price</div>
        <div>1h percentage</div>
        <div>24h percentage</div>
        <div>7d percentage</div>
        <div>1y percentage</div>
      </div>
      {cryptos.map((crypto, index)=>
      <CryptoListEntry crypto={crypto} key={index} />)}
    </div>
  )
};

export default CryptoList;