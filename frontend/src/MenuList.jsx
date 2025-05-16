import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuList({ menu, deleteMenuItem }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(id);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Siomai Menu</h1>
      <Link
        to="/add"
        className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Menu Item
      </Link>
      <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map(item => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">₱{item.price.toFixed(2)}</td>
              <td className="py-3 px-6 text-center">
                <Link
                  to={`/edit/${item.id}`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
