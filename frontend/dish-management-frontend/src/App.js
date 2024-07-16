import React, { useEffect, useState } from 'react';
import './App.css';
import DishList from './components/DishList';

function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/dishes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDishes(data); // Update state with fetched dishes
      })
      .catch(error => {
        console.error('Error fetching dishes:', error);
      });
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dish Management Dashboard</h1>
      </header>
      <main className="App-main">
        <DishList dishes={dishes} />
      </main>
    </div>
  );
}

export default App;
