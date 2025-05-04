// src/services/UserService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Match backend port

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // Log detailed error
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};