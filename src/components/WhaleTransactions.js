// src/components/WhaleTransactions.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WhaleTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Call the server-side API route to bypass CORS
        const response = await axios.get('/api/whaleProxy');
        
        // Check if the response contains the transactions data
        if (response.data && response.data.transactions) {
          setTransactions(response.data.transactions);
        } else {
          setError('No transactions found.');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
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

export default WhaleTransactions;
