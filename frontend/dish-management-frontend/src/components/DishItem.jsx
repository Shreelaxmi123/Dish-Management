import React from 'react';

function DishItem({ dish }) {
  return (
    <div className="DishItem">
      <h3>{dish.dishName}</h3>
      <img src={dish.imageUrl} alt={dish.dishName} />
      <p>Published: {dish.isPublished ? 'Yes' : 'No'}</p>
      <p>Dish ID: {dish.dishId}</p> {/* Displaying dishId */}
    </div>
  );
}

export default DishItem;
