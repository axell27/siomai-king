import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddMenu({ addMenuItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addMenuItem({ name, price: parseFloat(price) });
    navigate('/'); // Redirect back to menu list
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Menu Item</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Enter siomai name"
        />

        <label className="block mb-2 font-semibold">Price (₱)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          placeholder="Enter price"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>

        <Link
          to="/"
          className="ml-4 text-gray-600 hover:underline"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
