// src/api/whaleProxy.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiKey = process.env.REACT_APP_WHALE_API_KEY;
    console.log('API Key:', apiKey); // Log API key
    
    const response = await axios.get('https://api.whale-alert.io/v1/transactions', {
      params: {
        api_key: apiKey,
        min_value: 10000000, // 0.1 BTC in satoshis
        currency: 'btc'
      }
    });

    console.log('API Response:', response.data); // Log the response data
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Whale API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
