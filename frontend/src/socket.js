import io from 'socket.io-client';

// Initialize socket connections
const apiUrl = import.meta.env.VITE_API_URL;
// Connect to the default namespace
export const socket = io(apiUrl);