// import React from 'react';

// const CryptoModal = ( {crypto, buyAmount, setBuyAmount, sellAmount, setSellAmount}) => {

//   return (
//     <div className="cryptoModal" onClick={onClose}>
//       <div className="crypto-modal-content" onClick={e => e.stopPropagation()}>
//         <div className="crypto-modal-body">
//           <div className='cryptoChart'>
//             <coingecko-coin-compare-chart-widget coin-ids={crypto.id} currency="usd" locale="en">
//             </coingecko-coin-compare-chart-widget>
//             <coingecko-coin-converter-widget coin-id={crypto.id} currency="usd" background-color="#000000" font-color="#4c4c4c" locale="en"></coingecko-coin-converter-widget>
//           </div>
//           <div>{crypto.symbol + ' balance: ' + cryptBalance}</div>
//           <div>{`USDT balance: $${dollarBalance.toFixed(2)}`}</div>
//           <input type='text'></input>
//           <input type='text'></input>
//           <button onClick={() => postSellOrder(sellPrice, crypto.symbol, sellAmount)}>buy Order</button>
//           <button>Sell Order</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CryptoModal;