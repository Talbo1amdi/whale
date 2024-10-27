import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.whale-alert.io/v1/transactions', {
      params: {
        api_key: process.env.REACT_APP_WHALE_API_KEY,
        min_value: 10 * 1000000,
        currency: 'btc'
      }
    });
    console.log('API Response:', response.data); // Log the API response
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Whale API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
