import React from 'react';
import DishItem from './DishItem';

function DishList({ dishes }) {
  return (
    <div className="DishList">
      {dishes.map(dish => (
        <DishItem key={dish.dishId} dish={dish} />
      ))}
    </div>
  );
}

export default DishList;

