import axios from 'axios';

const API_URL = 'https://clothingbrand-server-pqo92iorf-malobs-projects.vercel.app/api';

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
