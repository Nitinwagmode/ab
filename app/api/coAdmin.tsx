// api/coAdminApi.tsx
import axios from 'axios';

const API_URL = 'https://backendscheduler.onrender.com/api/co-admins'; // Update with your actual API URL

// Fetch all co-admins
export const fetchCoAdmins = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a co-admin by ID
export const fetchCoAdminById = async (coAdminId: string) => {
  const response = await axios.get(`${API_URL}/${coAdminId}`);
  return response.data;
};

// Create a new co-admin
export const createCoAdmin = async (coAdminData: { name: string; email: string; password: string }) => {
  const response = await axios.post(API_URL, coAdminData);
  return response.data;
};

// Update an existing co-admin
export const updateCoAdmin = async (coAdminId: string, coAdminData: { name?: string; email?: string; password?: string }) => {
  const response = await axios.put(`${API_URL}/${coAdminId}`, coAdminData);
  return response.data;
};

// Delete a co-admin
export const deleteCoAdmin = async (coAdminId: string) => {
  await axios.delete(`${API_URL}/${coAdminId}`);
};
