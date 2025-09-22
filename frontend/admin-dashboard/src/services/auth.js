// Mock authentication
const mockUsers = [
  { email: 'owner@example.com', password: 'password', role: 'owner' },
  { email: 'staff@example.com', password: 'password', role: 'staff' },
];

const auth = {
  login: async (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return { token: 'mock-jwt-token', user };
  }
};

export default auth;
