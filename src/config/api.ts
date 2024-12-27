// Use environment variable or fallback for production
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-production-api.com' 
  : 'http://localhost:3000';