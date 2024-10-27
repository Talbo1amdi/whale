// src/api/whaleProxy.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.whale-alert.io/v1/transactions', {
      params: {
        api_key: process.env.REACT_APP_WHALE_API_KEY,
        min_value: 10 * 100000000, // 10 BTC in satoshis
        currency: 'btc'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
