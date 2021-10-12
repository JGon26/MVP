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
        <div>24h percentage</div>
      </div>
      {cryptos.map((crypto, index)=>
      <CryptoListEntry crypto={crypto} key={index} />)}
    </div>
  )
};

export default CryptoList;