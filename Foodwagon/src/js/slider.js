document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.popular__item');
  const cards = document.querySelectorAll('.search-food__card');
  const popularArrowLeft = document.getElementById('popularArrowLeft');
  const popularArrowRight = document.getElementById('popularArrowRight');
  const foodArrowLeft = document.getElementById('foodArrowLeft');
  const foodArrowRight = document.getElementById('foodArrowRight');

  const filterGroups = {
    popularArrowLeft: document.getElementById("filterGroupPL"),
    popularArrowRight: document.getElementById("filterGroupPR"),
    foodArrowLeft: document.getElementById("filterGroupFL"),
    foodArrowRight: document.getElementById("filterGroupFR")
  };

  let activeIndexPopular = 0;
  let activeIndexFood = 0;

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

  updateClasses();

  // Add/remove _disabled class for slider arrows
  function updateArrowFilter(arrow, filterGroup) {
    if (arrow.classList.contains('_disabled')) {
      filterGroup.removeAttribute('filter');
    } else {
      filterGroup.setAttribute('filter', 'url(#filter0_dd_401_1471)');
    }
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

  // Event listeners for Popular slider arrows
  popularArrowLeft.addEventListener('click', () => handlePopularArrowClick('left'));
  popularArrowRight.addEventListener('click', () => handlePopularArrowClick('right'));

  // Event listeners for Food slider arrows
  foodArrowLeft.addEventListener('click', () => handleFoodArrowClick('left'));
  foodArrowRight.addEventListener('click', () => handleFoodArrowClick('right'));

  window.addEventListener('resize', updateClasses);
});