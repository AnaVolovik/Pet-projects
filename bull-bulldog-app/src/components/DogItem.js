import React from 'react';

const DogItem = ({ dog }) => {
  return (
    <div>
      <h3>{dog.name}</h3>
      <p>{dog.breed}</p>
      <p>{dog.age} years old</p>
    </div>
  );
};

export default DogItem;