import React, { useState, useEffect } from 'react';

const StockPrice = () => {
  const [stockData, setStockData] = useState(null);
  const [ticker, setTicker] = useState('AAPL'); // Default ticker (AAPL)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStockPrice = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/stocks/${ticker}/price`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock price');
        }
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error('There was an error fetching the stock price:', error);
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, [ticker]);

  return (
    <>
      <div>
        <h1 className='text-center text-4xl py-4 px-3 bg-green-400 rounded-xl font-semibold w-max mx-auto'>Stock Price</h1>
        <div>
          <label>
            Enter Stock Ticker:
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())} // Make ticker uppercase
            />
          </label>
        </div>
        {loading ? (
          <p>Loading stock price...</p>
        ) : stockData ? (
          <div>
            <p>Ticker: {stockData.ticker}</p>
            <p>Current Price: ${stockData.currentPrice}</p>
          </div>
        ) : (
          <p>No data available or error fetching stock price.</p>
        )}
      </div>
    </>
  );
};

export default StockPrice;