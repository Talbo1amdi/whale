// src/components/WhaleTransactions.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WhaleTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/whaleProxy');
        console.log('API Response:', response.data); // Log the API response
    
        if (response.data && Array.isArray(response.data.transactions)) {
          setTransactions(response.data.transactions);
          setError(null);
        } else {
          setError('No transactions found.');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
      }
    };

    // Initial fetch
    fetchTransactions();

    // Set up an interval to fetch transactions every 10 seconds
    const intervalId = setInterval(fetchTransactions, 10000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Whale Transactions (Over 1 BTC)</h1>
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

export default WhaleTransactions;
