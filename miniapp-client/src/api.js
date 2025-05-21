// src/api.js
import axios from 'axios';

const API_BASE_URL = '../api';

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/form`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
