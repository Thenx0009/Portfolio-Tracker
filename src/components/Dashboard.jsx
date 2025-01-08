import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [topStock, setTopStock] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioResponse = await fetch('http://localhost:8080/api/stocks/portfolio-value');
        if (!portfolioResponse.ok) {
          throw new Error('Failed to fetch portfolio value');
        }
        const portfolioData = await portfolioResponse.json();
        setTotalValue(portfolioData);

        const stocksResponse = await fetch('http://localhost:8080/api/stocks/portfolio-value');
        if (!stocksResponse.ok) {
          throw new Error('Failed to fetch stocks');
        }
        const stocks = await stocksResponse.json();

        let maxPerformance = 0;
        let bestStock = '';
        stocks.forEach((stock) => {
          const performance = stock.currentPrice - stock.buyPrice;
          if (performance > maxPerformance) {
            maxPerformance = performance;
            bestStock = stock.name;
          }
        });
        setTopStock(bestStock);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=''>
      <h1 className='text-center text-5xl font-semibold py-6 px-4 bg-green-400 w-max mx-auto rounded-xl '>Portfolio Dashboard</h1>

      <div className='flex justify-evenly items-center mt-24'>
      <p className='bg-gray-100 py-3 px-3 shadow-xl rounded-lg'>Total Portfolio Value: ${totalValue}</p>
      <p className='bg-gray-100 py-3 px-3 shadow-xl rounded-lg'>Top Performing Stock: {topStock}</p>
      </div>
    </div>
  );
};

export default Dashboard;