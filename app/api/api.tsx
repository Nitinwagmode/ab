import axios from 'axios';

// Base URL for the API
// const API_URL = 'https://backendscheduler.onrender.com/api/auth';
const API_URL = 'https://backendscheduler.onrender.com/api/auth';

// Interface for user login and signup payloads
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  tech: string;
}

// Login API call
export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    console.log(response.data); // Log the full response to inspect it
    // Return the token from the response
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || 'Login failed');
  }
};

// Signup API call
export const signup = async (signupData: SignupData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, signupData);
    // Return the token from the response
    return response.data.token;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || 'Signup failed');
  }
};
