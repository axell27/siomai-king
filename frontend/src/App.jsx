import React from 'react';  // ADD THIS LINE
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddItem from './AddItem';
import { useEffect, useState } from 'react';

// rest of your code...


function Home() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('http://localhost/siomai-king/backend/api/menu.php')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🍽 Siomai Menu</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Item
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">₱{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddItem />} />
    </Routes>
  );
}

export default App;
