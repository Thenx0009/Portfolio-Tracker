import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockTable from './components/StockTable';
import StockPrice from './components/StockPrice'; 
import NavBar from './components/NavBar';

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<StockForm />} />
        <Route path="/edit/:id" element={<StockForm />} />
        <Route path="/stocks" element={<StockTable />} />
        <Route path="/price" element={<StockPrice />} />
      </Routes>
    </Router>
    </>
  )
}

export default App