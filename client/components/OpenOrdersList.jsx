import React from 'react';
import OpenOrdersEntry from './OpenOrdersEntry.jsx';

const OpenOrdersList = ({ orders, cancelOrder }) => {

  return (
    <div>
      <div className='orderTable'>
        <div>Market</div>
        <div>type</div>
        <div>price</div>
        <div>amount</div>
        <div>action</div>
      </div>
      {orders.map((order, index) =>
        <OpenOrdersEntry order={order} key={index} cancelOrder={cancelOrder}/>
      )}
    </div>
  )
}

export default OpenOrdersList;