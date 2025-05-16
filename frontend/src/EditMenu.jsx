import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditMenu({ menu, editMenuItem }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the item to edit by id from menu array
  const itemToEdit = menu.find(item => item.id === parseInt(id));

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setPrice(itemToEdit.price);
    }
  }, [itemToEdit]);

  if (!itemToEdit) {
    return (
      <div>
        <p>Menu item not found!</p>
        <Link to="/">Go back to menu list</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editMenuItem(itemToEdit.id, { name, price: parseFloat(price) });
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Menu Item</h1>
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
          Save
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
