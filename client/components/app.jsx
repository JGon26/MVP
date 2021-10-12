import React, { useState } from 'react';
const axios = require('axios');
import CryptoList from './CryptoList.jsx';


const App = () => {
  const [addCrypto, setAddCrypto] = useState('');
  const [cryptos, setCryptos] = useState([]);

  const addNewCrypto = (crypto) => {
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${crypto}&order=market_cap_desc&price_change_percentage=7d%2C%2024h%2C1h%2C1y`
    })
    .then(result => setCryptos([...cryptos, result.data[0]]));
  }



  return (
    <div>
      <h1>Your Crypto Portfolio</h1>
      <input type='text' placeholder='add an asset' onChange={(e)=>setAddCrypto(e.target.value)}></input>
      <button onClick={()=>addNewCrypto(addCrypto)}>+</button>
      <CryptoList cryptos={cryptos}/>
    </div>
  )
}

export default App;