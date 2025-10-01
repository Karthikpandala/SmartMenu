// Mock API calls
export const fetchMenuItems = async () => {
  return [
    { id: 1, name: "Cheese Pizza", description: "Classic pizza", price: 9.99 },
    { id: 2, name: "Veg Burger", description: "Healthy burger", price: 6.99 },
    { id: 3, name: "Pasta Alfredo", description: "Creamy pasta", price: 8.99 }
  ];
};

export const fetchOrders = async () => {
  return [
    { id: 1, customer: 'John Doe', item: 'Cheese Pizza' },
    { id: 2, customer: 'Jane Smith', item: 'Veg Burger' }
  ];
};
