import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StockForm = () => {
  const [stock, setStock] = useState({
    name: '',
    ticker: '',
    quantity: "Quantity",
    buyPrice: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
      });

      if (response.ok) {
        console.log('Stock added successfully');
        navigate('/stocks');
      } else {
        console.error('Failed to submit the stock:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error submitting the stock:', error);
    }
  };

  return (
    <> 
    <div className='flex justify-center items-center '>
      <form onSubmit={handleSubmit} className='space-x-4'>
        <input className='bg-gray-100 py-4 px-3 rounded-lg outline-none'
          name="name"
          placeholder="Stock Name"
          value={stock.name}
          onChange={handleChange}
        />
        <input className='bg-gray-100 py-4 px-3 rounded-lg outline-none'
          name="ticker"
          placeholder="Ticker"
          value={stock.ticker}
          onChange={handleChange}
        />
        <input className='bg-gray-100 py-4 px-3 rounded-lg outline-none'
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={stock.quantity}
          onChange={handleChange}
        />
        <input className='bg-gray-100 py-4 px-3 rounded-lg outline-none'
          name="buyPrice"
          placeholder="Buy Price"
          type="number"
          value={stock.buyPrice}
          onChange={handleChange}
        />
        <button className='bg-green-400 py-3 px-10 rounded-xl font-semibold' type="submit">Save</button>
      </form>
      </div>
    </>
  );
};

export default StockForm;