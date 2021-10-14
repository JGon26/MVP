import React from 'react';
import axios from 'axios';

const OpenOrdersEntry = ({ order, cancelOrder }) => {

  return (
    <div className='orderEntry'>
      <div>{order.symbol}</div>
      <div>{order.side}</div>
      <div>{order.price}</div>
      <div>{order.amount}</div>
      <div>{order.total}</div>
      <div onClick={()=>cancelOrder(order.id, order.symbol)}>Cancel</div>
    </div>
  )
}

export default OpenOrdersEntry;