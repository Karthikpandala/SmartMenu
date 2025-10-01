import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <Navbar />
    <main className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to QR Menu</h1>
      <p className="mb-6">Scan, Order, and Enjoy your meal!</p>
      <Link to="/menu" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700">View Menu</Link>
    </main>
    <Footer />
  </div>
);
e
export default HomePage;
