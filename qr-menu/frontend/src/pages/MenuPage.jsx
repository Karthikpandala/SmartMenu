import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchMenuItems } from '../services/api';
import Button from '../components/Button';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchMenuItems().then(setMenu);
  }, []);

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menu.map(item => (
            <div key={item.id} className="border p-4 rounded hover:shadow-md">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-bold">${item.price.toFixed(2)}</p>
              <Button onClick={() => addToCart(item)}>Add to Cart</Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
