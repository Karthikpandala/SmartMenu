import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => (
  <div>
    <Navbar />
    <main className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-6">Your order has been placed successfully.</p>
      <Link to="/menu" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700">
        Back to Menu
      </Link>
    </main>
    <Footer />
  </div>
);

export default ConfirmationPage;
