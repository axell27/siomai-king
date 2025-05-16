// App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './Home';
import AddItem from './AddItem';
import EditItem from './EditItem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddItem />} />
      <Route path="/edit/:id" element={<EditItem />} />
    </Routes>
  );
}

export default App;