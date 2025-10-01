import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    // For demo, redirect to confirmation
    navigate('/confirmation');
  };

  return (
    <div>
      <Navbar />
      <main className="p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Payment</h1>
        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Pay Now
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
