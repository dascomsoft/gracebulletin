// Configuration de l'API
const isDev = import.meta.env.DEV;
const API_BASE_URL = isDev 
  ? 'http://localhost:3000'  // Mode développement avec proxy
  : './api';                 // Mode production (Electron)

export const config = {
  apiBaseUrl: API_BASE_URL,
  endpoints: {
    classes: `${API_BASE_URL}/classes`,
    students: `${API_BASE_URL}/students`,
    bulletins: `${API_BASE_URL}/bulletins`
  }
};

export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
