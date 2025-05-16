import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit fired!');  // <- TEST LOG

    const item = { name, price: parseFloat(price) };

    try {
      const response = await fetch('/api/menu.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(item),
});


      if (response.ok) {
        alert('Item added!');
        navigate('/');
      } else {
        alert('Failed to add item.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">➕ Add Siomai Item</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="mt-1 w-full border px-3 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            className="mt-1 w-full border px-3 py-2 rounded"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
