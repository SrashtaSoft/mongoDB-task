import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  width="40"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
                />
              </td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td className={category.is_active ? 'active' : 'inactive'}>
                {category.is_active ? 'Active' : 'Inactive'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: {categories.length}</p>
    </div>
  );
}

export default App;

