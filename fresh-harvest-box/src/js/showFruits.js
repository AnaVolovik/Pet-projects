document.addEventListener('DOMContentLoaded', () => {
  let allFruitsData = [];

  fetch('/get-fruits-data')
    .then(response => response.json())
    .then(data => {
      allFruitsData = data;
      generateFruitsCards();
      window.addEventListener('resize', generateFruitsCards);
    });

  const fruitsList = document.getElementById('fruitsList');

  function getNumberOfCards() {
    const width = window.innerWidth;
    if (width >= 1024 && width <= 1920) {
      return 9;
    } else if (width >= 768 && width < 1024) {
      return 8;
    } else {
      return 6;
    }
  }

  // Generate Fruits list
  function generateFruitsCards() {
    const numberOfCards = getNumberOfCards();
    fruitsList.innerHTML = '';

    allFruitsData.slice(0, numberOfCards).forEach(fruit => {
      const card = `
        <div class="fruits__item item" style="background-color: ${fruit.bgc}">
          <h4 class="item__name">${fruit.name}</h4>
          <p class="item__type">${fruit.type}</p>
          <div class="item__image">
            <img src="${fruit.image_url}" alt="${fruit.name}">
          </div>
          <p class="item__price">${fruit.price}</p>
        </div>
      `;
      fruitsList.innerHTML += card;
    });
  }
});
