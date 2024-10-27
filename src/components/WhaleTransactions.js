import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WhaleTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const response = await axios.get(
            `https://api.whale-alert.io/v1/transactions`,
            {
              params: {
                api_key: process.env.REACT_APP_WHALE_API_KEY,
                min_value: 10 * 100000000, // 10 BTC in satoshis
                currency: 'btc'
              }
            }
          );
          console.log(response); // Log response here
          setTransactions(response.data.transactions);
        } catch (err) {
          console.error(err); // Log error for debugging
          setError('Failed to fetch transactions');
        }
      };
      

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Whale Transactions (Over 10 BTC)</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
            <p><strong>Transaction ID:</strong> {transaction.hash}</p>
            <p><strong>Amount:</strong> {transaction.amount} {transaction.symbol}</p>
            <p><strong>From:</strong> {transaction.from.owner_type} ({transaction.from.address})</p>
            <p><strong>To:</strong> {transaction.to.owner_type} ({transaction.to.address})</p>
          </div>
        ))
      )}
    </div>
  );
};
console.log("API Key:", process.env.REACT_APP_WHALE_API_KEY);

export default WhaleTransactions;
