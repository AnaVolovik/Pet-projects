import allFoodData, { fetchFoodData } from './getAllFoodData.js';

// SLIDER

document.addEventListener('DOMContentLoaded', () => {
  let items, cards, popularArrowLeft, popularArrowRight, foodArrowLeft, foodArrowRight;
  let activeIndexPopular = 0;
  let activeIndexFood = 0;

  fetchFoodData().then(data => {
    const randomFoodItems = getRandomFoodItems(data, 10);
    generatePopularFoodContent(randomFoodItems);

    items = document.querySelectorAll('.popular__item');
    cards = document.querySelectorAll('.search-food__card');
    popularArrowLeft = document.getElementById('popularArrowLeft');
    popularArrowRight = document.getElementById('popularArrowRight');
    foodArrowLeft = document.getElementById('foodArrowLeft');
    foodArrowRight = document.getElementById('foodArrowRight');

    // Add event listeners after initializing variables
    if (popularArrowLeft && popularArrowRight) {
      popularArrowLeft.addEventListener('click', () => handlePopularArrowClick('left'));
      popularArrowRight.addEventListener('click', () => handlePopularArrowClick('right'));
    }
    if (foodArrowLeft && foodArrowRight) {
      foodArrowLeft.addEventListener('click', () => handleFoodArrowClick('left'));
      foodArrowRight.addEventListener('click', () => handleFoodArrowClick('right'));
    }

    updateClasses();
  }).catch(error => {
      console.error('Error during data fetch:', error);
  });

  // Add/remove _active, _active-last classes for items and cards
  function updateClasses() {
    const width = window.innerWidth;
    let activeCountPopular = 3;
    let activeCountFood = 4;

    // Determine active counts based on window width
    if (width >= 1024 && width < 1920) {
      activeCountPopular = 3;
      activeCountFood = 4;
    } else if (width >= 768 && width < 1024) {
      activeCountPopular = 3;
      activeCountFood = 3;
    } else if (width >= 480 && width < 768) {
      activeCountPopular = 2;
      activeCountFood = 2;
    } else if (width < 480) {
      activeCountPopular = 1;
      activeCountFood = 1;
    }

    // Remove all current _active and _active-last classes
    items.forEach(item => {
      item.classList.remove('_active', '_active-last');
    });
    cards.forEach(item => {
      item.classList.remove('_active', '_active-last');
    });

    // Set _active and _active-last classes for Popular items
    items.forEach((item, index) => {
      if (index >= activeIndexPopular && index < activeIndexPopular + activeCountPopular) {
        item.classList.add('_active');
        if (index === activeIndexPopular + activeCountPopular - 1) {
          item.classList.add('_active-last');
        }
      }
    });

    // Set _active and _active-last classes for Food cards
    cards.forEach((item, index) => {
      if (index >= activeIndexFood && index < activeIndexFood + activeCountFood) {
        item.classList.add('_active');
        if (index === activeIndexFood + activeCountFood - 1) {
          item.classList.add('_active-last');
        }
      }
    });

    // Disable Popular arrows
    popularArrowLeft.classList.toggle('_disabled', activeIndexPopular <= 0);
    popularArrowRight.classList.toggle('_disabled', activeIndexPopular + activeCountPopular >= items.length);

    // Disable Food arrows
    foodArrowLeft.classList.toggle('_disabled', activeIndexFood <= 0);
    foodArrowRight.classList.toggle('_disabled', activeIndexFood + activeCountFood >= cards.length);
  }

  // Function to handle arrow click for Popular slider
  function handlePopularArrowClick(direction) {
    if (direction === 'left') {
      if (activeIndexPopular > 0) {
        activeIndexPopular--;
      }
    } else if (direction === 'right') {
      activeIndexPopular++;
    }
    updateClasses();
  }

  // Function to handle arrow click for Food slider
  function handleFoodArrowClick(direction) {
    if (direction === 'left') {
      if (activeIndexFood > 0) {
        activeIndexFood--;
      }
    } else if (direction === 'right') {
      activeIndexFood++;
    }
    updateClasses();
  }

  // Get random food items
  function getRandomFoodItems(allFoodData, count) {
    const shuffled = allFoodData.sort(() => 0.5 - Math.random());
    const randomItems = shuffled.slice(0, count);
    return randomItems;
  }

  // Generate content
  function generatePopularFoodContent(allFoodData) {
    const container = document.getElementById('popularItems');

    if (!container) {
      console.error('Element with id "popularItems" not found.');
      return;
    }
    container.innerHTML = '';

    allFoodData.forEach(item => {
      const foodElement = document.createElement('div');
      foodElement.classList.add('popular__item', 'item');
      foodElement.id = item.id;

      foodElement.innerHTML = `
        <div class="item__image">
          <img src="${item.image_url}" alt="${item.name}">
        </div>
        <p class="item__title">${item.name}</p>
        <p class="item__point">
          <span class="item__point-icon">
            <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.04688 17.8984C0.914062 10.5156 0 9.74219 0 7C0 3.27344 2.98828 0.25 6.75 0.25C10.4766 0.25 13.5 3.27344 13.5 7C13.5 9.74219 12.5508 10.5156 7.41797 17.8984C7.10156 18.3906 6.36328 18.3906 6.04688 17.8984ZM6.75 9.8125C8.29688 9.8125 9.5625 8.58203 9.5625 7C9.5625 5.45312 8.29688 4.1875 6.75 4.1875C5.16797 4.1875 3.9375 5.45312 3.9375 7C3.9375 8.58203 5.16797 9.8125 6.75 9.8125Z" fill="#FFB30E"/>
            </svg>
          </span>
          <span class="item__point-text">${item.point}</span>
        </p>
        <p class="item__price">${item.price}</p>
        <button class="item__button button orderBtn" data-item="${item.name}">
          <span class="button__text">Order Now</span>
        </button>
      `;

      container.appendChild(foodElement);
    });
  }

  window.addEventListener('resize', updateClasses);
});