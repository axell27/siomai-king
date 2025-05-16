// Home.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('http://localhost/siomai-king/backend/api/menu.php')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    fetch(`http://localhost/siomai-king/backend/delete.php?id=${id}`, {
      method: 'GET'
    })
    .then(() => {
      setMenu(menu.filter(item => item.id !== id));

      alert("Item deleted successfully!");
    })
    .catch(err => {
      console.error(err);
      alert("Failed to delete item.");
    });
  }
};

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

            {/* Edit Button */}
            <Link
              to={`/edit/${item.id}`}
              className="text-blue-500 hover:underline mr-4"
            >
              Edit
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;