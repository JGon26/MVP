import React, { useState } from 'react';
const axios = require('axios');
import CryptoList from './CryptoList.jsx';


const App = () => {

  const [cryptos, setCryptos] = useState([    {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 55900,
    "market_cap": 1053162057781,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 1173790743898,
    "total_volume": 39515169590,
    "high_24h": 58066,
    "low_24h": 55783,
    "price_change_24h": -1827.383290421545,
    "price_change_percentage_24h": -3.16555,
    "market_cap_change_24h": -32055533794.991333,
    "market_cap_change_percentage_24h": -2.95383,
    "circulating_supply": 18841862.0,
    "total_supply": 21000000.0,
    "max_supply": 21000000.0,
    "ath": 64805,
    "ath_change_percentage": -13.7927,
    "ath_date": "2021-04-14T11:54:46.763Z",
    "atl": 67.81,
    "atl_change_percentage": 82287.88737,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2021-10-12T17:28:22.208Z"
}]);



  return (
    <div>
      <h1>Your Crypto Portfolio</h1>
      <CryptoList cryptos={cryptos}/>
    </div>
  )
}

export default App;