import React from 'react';

const CartItem = ({ item, remove }) => (
  <div className="flex justify-between p-2 border-b">
    <span>{item.name}</span>
    <span>${item.price.toFixed(2)}</span>
    <button onClick={() => remove(item.id)} className="text-red-600">Remove</button>
  </div>
);

export default CartItem;
