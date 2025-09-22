// api.js - Mock API service for Admin Dashboard
// Easy swap to real API by changing API_MODE to 'real'

const API_MODE = 'mock'; // 'mock' | 'real'

// -------------------- MOCK DATA -------------------- //
let menuItems = [
  {
    id: 1,
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with truffle',
    price: 12.0,
    category: 'Appetizers',
    available: true,
    imageUrl: '/assets/images/arancini.jpg',
  },
  {
    id: 2,
    name: 'Burrata Salad',
    description: 'Fresh burrata with tomatoes and arugula',
    price: 14.0,
    category: 'Salads',
    available: true,
    imageUrl: '/assets/images/burrata.jpg',
  },
  {
    id: 3,
    name: 'Filet Mignon',
    description: 'Grilled beef filet with red wine sauce',
    price: 32.0,
    category: 'Main Course',
    available: true,
    imageUrl: '/assets/images/filet.jpg',
  },
];

let orders = [
  {
    id: 28495,
    table: 12,
    time: '12:45 PM',
    timeAgo: '5 minutes',
    items: [
      { name: 'Truffle Arancini', quantity: 1, price: 12.0 },
      { name: 'Burrata Salad', quantity: 1, price: 14.0 },
    ],
    total: 26.0,
    status: 'Pending',
    notes: 'No onions in the salad, please',
  },
  {
    id: 28496,
    table: 8,
    time: '12:30 PM',
    timeAgo: '20 minutes',
    items: [
      { name: 'Filet Mignon', quantity: 1, price: 32.0 },
      { name: 'Chocolate Soufflé', quantity: 1, price: 10.0 },
    ],
    total: 42.0,
    status: 'Preparing',
    notes: '',
  },
  {
    id: 28497,
    table: 5,
    time: '12:15 PM',
    timeAgo: '35 minutes',
    items: [
      { name: 'Mushroom Risotto', quantity: 2, price: 22.0 },
      { name: 'House Salad', quantity: 1, price: 8.0 },
    ],
    total: 52.0,
    status: 'Ready',
    notes: '',
  },
];

// Mock users for authentication
const users = [
  { id: 1, email: 'owner@restaurant.com', password: 'owner123', role: 'owner' },
  { id: 2, email: 'staff@restaurant.com', password: 'staff123', role: 'staff' },
];

// Utility to simulate async API call
const simulateNetworkDelay = (result, fail = false, delay = 500) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error('API error simulated'));
      else resolve(result);
    }, delay);
  });

// -------------------- API FUNCTIONS -------------------- //
const api = {
  // --------- Menu Items --------- //
  getMenuItems: async () => {
    if (API_MODE === 'mock') return simulateNetworkDelay(menuItems);
    // TODO: Replace with real fetch from NestJS
  },

  addMenuItem: async (item) => {
    if (API_MODE === 'mock') {
      const newItem = { ...item, id: menuItems.length + 1 };
      menuItems.push(newItem);
      return simulateNetworkDelay(newItem);
    }
  },

  updateMenuItem: async (id, updatedFields) => {
    if (API_MODE === 'mock') {
      menuItems = menuItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      );
      return simulateNetworkDelay(menuItems.find((item) => item.id === id));
    }
  },

  uploadImage: async (file) => {
    if (API_MODE === 'mock') {
      // Return a mock image URL
      return simulateNetworkDelay(`/assets/images/${file.name}`);
    }
  },

  // --------- Orders --------- //
  getOrders: async () => {
    if (API_MODE === 'mock') return simulateNetworkDelay(orders);
  },

  updateOrderStatus: async (orderId, status) => {
    if (API_MODE === 'mock') {
      orders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
      return simulateNetworkDelay(orders.find((o) => o.id === orderId));
    }
  },

  // --------- Authentication --------- //
  login: async (email, password) => {
    if (API_MODE === 'mock') {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) return simulateNetworkDelay(null, true);
      const token = btoa(`${user.email}:${user.role}`); // simple mock JWT
      return simulateNetworkDelay({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
  },

  logout: async () => {
    if (API_MODE === 'mock') return simulateNetworkDelay(true);
  },
};

export default api;
