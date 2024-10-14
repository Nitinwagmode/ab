// api/mentorApi.tsx
import axios from 'axios';

const API_URL = 'https://backendscheduler.onrender.com/api/mentors'; // Update with your actual API URL

// Fetch all mentors
export const fetchMentors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a mentor by ID
export const fetchMentorById = async (mentorId: string) => {
  const response = await axios.get(`${API_URL}/${mentorId}`);
  return response.data;
};

// Create a new mentor
export const createMentor = async (mentorData: { name: string; email: string; password: string; tech: string }) => {
  const response = await axios.post(API_URL, mentorData);
  return response.data;
};

// Update an existing mentor
export const updateMentor = async (mentorId: string, mentorData: { name?: string; email?: string; password?: string; tech?: string }) => {
  const response = await axios.put(`${API_URL}/${mentorId}`, mentorData);
  return response.data;
};

// Delete a mentor
export const deleteMentor = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
