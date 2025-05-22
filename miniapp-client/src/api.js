// src/api.js
import axios from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const API_BASE_URL = '../api';

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/form`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pageTitle')}</h1>
      <button>{t('submitButton')}</button>
    </div>
  );
}

export default App;
