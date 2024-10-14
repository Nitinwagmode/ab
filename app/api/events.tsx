import axios from 'axios';

const API_URL = 'https://backendscheduler.onrender.com/api/events';

// Create a new event
export const createEvent = async (eventData, token) => {
  try {
    const response = await axios.post(API_URL, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to create event');
  }
};

// Get all events
export const getEvents = async (token,storedUserId) => {
  try {
    const response = await axios.get(`${API_URL}/:${storedUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to fetch events');
  }
};

// Delete an event
export const deleteEvent = async (eventId, token) => {
  try {
    await axios.delete(`${API_URL}/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to delete event');
  }
};

// Edit an event
export const editEvent = async (eventId, eventData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${eventId}`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to edit event');
  }
};
