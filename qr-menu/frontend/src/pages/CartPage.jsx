import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/menu" className="text-blue-600">Go to Menu</Link></p>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} remove={removeItem} />
            ))}
            <Link
              to="/payment"
              className="mt-4 inline-block px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Proceed to Payment
            </Link>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
