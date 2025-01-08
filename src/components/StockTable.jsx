import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/stocks');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setStocks(data);
        } catch (error) {
          console.error("There was an error fetching the stocks:", error.message);
        }
      };

    fetchStocks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the stock');
      }
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (error) {
      console.error('There was an error deleting the stock:', error);
    }
  };

  return (
    <>
      <div className=' flex flex-col'>
        <h1 className='text-center text-4xl w-max mx-auto bg-green-400 py-4 px-5 rounded-xl font-semibold '>Your Stock Holdings</h1>
        <table className=' my-4 '>
          <thead className='bg-gray-200'>
            <tr className=''>
              <th className=''>Stock Name</th>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Buy Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.name}</td>
                <td>{stock.ticker}</td>
                <td>{stock.quantity}</td>
                <td>${stock.buyPrice}</td>
                <td>
                  <Link to={`/edit/${stock.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(stock.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center'>
        <Link className='bg-blue-400 py-3 px-5 font-semibold rounded-lg text-center ' to="/add">Add New Stock</Link>
        </div>
      </div>
    </>
  );
};

export default StockTable;