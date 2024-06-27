document.addEventListener('DOMContentLoaded', () => {
  fetch('/get-food-data')
    .then(response => response.json())
    .then(data => generateFoodItems(data));
});

const viewAllLink = document.getElementById('viewAllLink');
const searchfoodBox = document.getElementById('searchFoodBox');
const foodlist = document.getElementById('foodlist');

// Show/hide food list
let foodListVisible = false;

viewAllLink.addEventListener('click', (event) => {
  event.preventDefault();

  if (!foodListVisible) {
    searchfoodBox.style.display = 'none';
    foodlist.style.display = 'flex';
    viewAllLink.innerHTML = `
      <span class="link__text">Show categories</span>
      <span class="link__icon">
        <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.91797 7.21484C8.16406 6.96875 8.16406 6.55859 7.91797 6.3125L2.61328 0.980469C2.33984 0.734375 1.92969 0.734375 1.68359 0.980469L1.05469 1.60938C0.808594 1.85547 0.808594 2.26562 1.05469 2.53906L5.26562 6.75L1.05469 10.9883C0.808594 11.2617 0.808594 11.6719 1.05469 11.918L1.68359 12.5469C1.92969 12.793 2.33984 12.793 2.61328 12.5469L7.91797 7.21484Z" fill="#FFB30E"/>
        </svg>
      </span>
    `;
  } else {
    searchfoodBox.style.display = 'flex';
    foodlist.style.display = 'none';
    viewAllLink.innerHTML = `
      <span class="link__text">View All</span>
      <span class="link__icon">
        <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.91797 7.21484C8.16406 6.96875 8.16406 6.55859 7.91797 6.3125L2.61328 0.980469C2.33984 0.734375 1.92969 0.734375 1.68359 0.980469L1.05469 1.60938C0.808594 1.85547 0.808594 2.26562 1.05469 2.53906L5.26562 6.75L1.05469 10.9883C0.808594 11.2617 0.808594 11.6719 1.05469 11.918L1.68359 12.5469C1.92969 12.793 2.33984 12.793 2.61328 12.5469L7.91797 7.21484Z" fill="#FFB30E"/>
        </svg>
      </span>
    `;
  }

  foodListVisible = !foodListVisible;
});

// Generate food list
function generateFoodItems(data) {
  const categories = {};

  data.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  for (const category in categories) {
    if (categories.hasOwnProperty(category)) {
      const categoryWrapper = document.createElement('div');
      categoryWrapper.classList.add('foodlist__category');

      const title = document.createElement('h2');
      title.classList.add('h2', 'foodlist__title');
      title.textContent = category;
      categoryWrapper.appendChild(title);

      const itemsContainer = document.createElement('div');
      itemsContainer.classList.add('foodlist__items');

      categories[category].forEach(foodItem => {
        const foodElement = document.createElement('div');
        foodElement.classList.add('foodlist__item', 'item');
        foodElement.id = foodItem.id;

        foodElement.innerHTML = `
        <div class="item__image">
          <img src="${foodItem.image_url}" alt="${foodItem.name}">
        </div>
        <p class="item__title">${foodItem.name}</p>
        <p class="item__point">
          <span class="item__point-icon">
            <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.04688 17.8984C0.914062 10.5156 0 9.74219 0 7C0 3.27344 2.98828 0.25 6.75 0.25C10.4766 0.25 13.5 3.27344 13.5 7C13.5 9.74219 12.5508 10.5156 7.41797 17.8984C7.10156 18.3906 6.36328 18.3906 6.04688 17.8984ZM6.75 9.8125C8.29688 9.8125 9.5625 8.58203 9.5625 7C9.5625 5.45312 8.29688 4.1875 6.75 4.1875C5.16797 4.1875 3.9375 5.45312 3.9375 7C3.9375 8.58203 5.16797 9.8125 6.75 9.8125Z" fill="#FFB30E"/>
            </svg>
          </span>
          <span class="item__point-text">${foodItem.point}</span>
        </p>
        <p class="item__price">${foodItem.price}</p>
        <button class="item__button button">
          <span class="button__text">Order Now</span>
        </button>
      `;

        itemsContainer.appendChild(foodElement);
      });

      categoryWrapper.appendChild(itemsContainer);

      foodlist.appendChild(categoryWrapper);
    }
  }
}

// Search-input in TOP section
document.getElementById('searchFood').addEventListener('focus', function() {
  if (window.innerWidth >= 768) {
    this.classList.add('expanded');
  }
});

document.getElementById('searchFood').addEventListener('blur', function() {
  if (window.innerWidth >= 768) {
    this.classList.remove('expanded');
  }
});