import React from 'react';
import DogItem from './DogItem';

const DogList = () => {
  const dogs = [
    { id: 1, name: 'Rex', breed: 'Labrador', age: 3 },
    { id: 2, name: 'Bella', breed: 'German Shepherd', age: 4 },
    // Сделать вывод данных из БД
  ];

  return (
    <div>
      {dogs.map((dog) => (
        <DogItem key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogList;