import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Menu, ShoppingCart, DollarSign, Users } from 'react-feather';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const menuData = await api.getMenuItems();
      const ordersData = await api.getOrders();
      const paymentsData = await api.getPayments();

      setMenuItems(menuData);
      setOrders(ordersData);
      setPayments(paymentsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, restaurant owner!</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Menu className="w-8 h-8 text-gray-700" />
          <div>
            <p className="text-gray-500 text-sm">Menu Items</p>
            <p className="text-xl font-bold">{menuItems.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <ShoppingCart className="w-8 h-8 text-gray-700" />
          <div>
            <p className="text-gray-500 text-sm">Orders</p>
            <p className="text-xl font-bold">{orders.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <DollarSign className="w-8 h-8 text-gray-700" />
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Users className="w-8 h-8 text-gray-700" />
          <div>
            <p className="text-gray-500 text-sm">Staff</p>
            <p className="text-xl font-bold">--</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Table</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">{order.id.slice(0, 8)}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{order.table}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">${order.total}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'ready' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{order.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
