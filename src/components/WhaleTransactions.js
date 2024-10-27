import React, { useEffect, useState } from 'react';
import axios from 'axios';
import handler from '../api/whaleProxy';

const WhaleTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/whaleProxy');
        console.log('API Response:', response.data); // Log the API response
    
        // Ensure the response has transactions
        if (response.data && response.data.transactions && Array.isArray(response.data.transactions)) {
          // If there are new transactions, update the state
          if (response.data.transactions.length > 0) {
            setTransactions(prevTransactions => {
              const newTransactions = response.data.transactions.filter(transaction => 
                !prevTransactions.some(existingTransaction => existingTransaction.id === transaction.id)
              );
              return [...newTransactions, ...prevTransactions];
            });
            setError(null);
          } else {
            setError('No transactions found.');
          }
        } else {
          setError('No transactions found.');
        }
      } catch (err) {
        console.error('Error fetching data from Whale API:', err.response ? err.response.data : err.message); // Log the error
        setError('Failed to fetch transactions');
      }
    };
    

    // Initial fetch
    // fetchTransactions();
    handler()


    // Set up an interval to fetch transactions every 10 seconds
    const intervalId = setInterval(handler, 10000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [transactions]);

  return (
    <div>
      <h1>Whale Transactions (Over 0.01 BTC)</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        transactions.length > 0 ? (
          transactions.map(transaction => (
            <div key={transaction.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <p><strong>Transaction ID:</strong> {transaction.hash}</p>
              <p><strong>Amount:</strong> {transaction.amount} {transaction.symbol}</p>
              <p><strong>From:</strong> {transaction.from.owner_type} ({transaction.from.address})</p>
              <p><strong>To:</strong> {transaction.to.owner_type} ({transaction.to.address})</p>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )
      )}
    </div>
  );
  
};

export default WhaleTransactions;
