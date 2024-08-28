import io from 'socket.io-client';

// Initialize socket connections
const baseURL = 'http://localhost:3000';

// Connect to the default namespace
export const socket = io(baseURL);