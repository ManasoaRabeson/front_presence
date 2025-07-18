import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);  // Initialisation à null pour plus de clarté
  const apiPrefix = 'http://127.0.0.1:8000/api';
  const callApi = useCallback(
    async (
      endpoint,
      {
        method = 'GET',
        body = null,
        headers = {},
        params = {},  // <-- Ajout de params ici
        ...options
      } = {}
    ) => {
      setLoading(true);
      setError(null);
      setData([]);
  
      const token = sessionStorage.getItem('token');
      const finalHeaders = {
        ...headers,
        'Content-Type': 'application/json',
      };
  
      if (token) {
        finalHeaders.Authorization = `Bearer ${token}`;
      }
  
      try {
        const response = await axios({
          method,
          url: `${apiPrefix}${endpoint}`,
          data: body,
          headers: finalHeaders,
          params,       // <-- On transmet params ici à axios
          ...options,
        });
  
        setData(response.data);

        return response.data;
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Une erreur est survenue';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { loading, error, data, callApi };
};

export default useApi;
