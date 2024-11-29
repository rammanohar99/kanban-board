import axios from 'axios';

export const fetchTickets = async () => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    const { tickets, users } = response.data; // Extract tickets and users
    return { tickets, users }; // Return tickets and users
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { tickets: [], users: [] }; // Return empty arrays in case of an error
  }
};
