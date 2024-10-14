import axios from 'axios';

const API_URL = 'https://backendscheduler.onrender.com/api/users'; // Replace with your actual API URL

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch user by ID
export const fetchUserById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};


// Create a new user
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
