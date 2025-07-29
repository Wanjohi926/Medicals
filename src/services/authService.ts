import api from '../services/api';

const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/user/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },
  
  register: async (userData: { first_name: string; last_name: string; email: string; password: string }) => {
    const response = await api.post('/user', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },
  

verify: async (data: { email: string; code: string }) => {
  const response = await api.post('/user/verify', data);
  return response.data;
},

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
      return { token, user };
    }
    return null;
  }
};

export default authService;
