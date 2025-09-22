import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Coffee, RefreshCw } from 'react-feather';
import api from '../services/api';

const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Served'];

// Helper to get next status
const nextStatus = {
  Pending: 'Preparing',
  Preparing: 'Ready',
  Ready: 'Served',
  Served: 'Served',
};

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch initial mock orders
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await api.getOrders();
      setOrders(data);
      data.forEach((order) => simulateOrderProgress(order.id));
    };
    fetchOrders();
  }, []);

  // Mock WebSocket simulation for automatic status progression
  const simulateOrderProgress = (orderId) => {
    const update = (newStatus, delay) => {
      setTimeout(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }, delay);
    };

    update('Preparing', 3000);
    update('Ready', 6000);
    update('Served', 9000);
  };

  // Manual status update by staff
  const handleUpdateStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const newStatus = nextStatus[order.status];
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  // Filtered orders
  const filteredOrders =
    filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">Orders Dashboard</h1>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-600">Filter by status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </header>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 bg-gray-800 text-white flex justify-between items-center">
                <div>
                  <span className="font-medium">Order #{order.id}</span>
                  <span className="text-gray-300 text-sm ml-2">{order.time}</span>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                    order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'Preparing'
                      ? 'bg-orange-100 text-orange-800'
                      : order.status === 'Ready'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Table {order.table}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Coffee className="w-4 h-4 mr-1" />
                    <span>{order.timeAgo} ago</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div>
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="block text-xs text-gray-500">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-gray-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
                      {order.notes}
                    </div>
                  )}

                  <div className="flex justify-between border-t border-gray-200 pt-3 mt-2">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  {order.status !== 'Served' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id)}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
                    >
                      Advance Status
                    </button>
                  )}
                  {order.status === 'Served' && (
                    <button
                      disabled
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                    >
                      Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersDashboard;
