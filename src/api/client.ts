import axios from 'axios';

/**
 * Base URL for the API.
 * Uses the VITE_API_URL environment variable if available, otherwise defaults to localhost.
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Axios client instance configured with the base URL and default headers.
 * This client should be used for all API requests to ensure consistency.
 */
export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
