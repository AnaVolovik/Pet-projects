// SHOW REATAURANTS

document.addEventListener('DOMContentLoaded', () => {
  let allRestaurantsData = [];

  fetch('/get-restaurants-data')
    .then(response => response.json())
    .then(data => {
      allRestaurantsData = data;
      generateRestCards(data);
    });

  const restlist = document.getElementById('restaurantsWrapper');
  const viewAllRestaurants = document.getElementById('viewAllRestaurants');

  // View All button
  viewAllRestaurants.addEventListener('click', () => {
    const cards = document.querySelectorAll('.restaurants__card');

    cards.forEach((card) => {
      card.style.display = 'grid';
    });

    viewAllRestaurants.style = "display: none;";
  })

  // Generate Restaurant list
  function generateRestCards(data) {
    data.forEach(restaurant => {
      const card = `
        <div class="restaurants__card">
          <div class="restaurants__image">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="restaurants__promo promo">
              <div class="promo__discount">
                <span class="promo__icon">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.14453V1.9375C0 1.02344 0.738281 0.25 1.6875 0.25H8.85938C9.31641 0.25 9.73828 0.460938 10.0547 0.777344L17.4727 8.19531C18.1406 8.86328 18.1406 9.95312 17.4727 10.5859L10.3008 17.7578C9.66797 18.4258 8.57812 18.4258 7.91016 17.7578L0.492188 10.3398C0.175781 10.0234 0 9.60156 0 9.14453ZM3.9375 2.5C2.98828 2.5 2.25 3.27344 2.25 4.1875C2.25 5.13672 2.98828 5.875 3.9375 5.875C4.85156 5.875 5.625 5.13672 5.625 4.1875C5.625 3.27344 4.85156 2.5 3.9375 2.5Z" fill="white"/>
                  </svg>
                </span>
                <p class="promo__text">${restaurant.discount}</p>
              </div>
              <div class="promo__time">
                <span class="promo__icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0.53125C13.8164 0.53125 17.7188 4.43359 17.7188 9.25C17.7188 14.0664 13.8164 17.9688 9 17.9688C4.18359 17.9688 0.28125 14.0664 0.28125 9.25C0.28125 4.43359 4.18359 0.53125 9 0.53125ZM12.2344 11.5352C12.3047 11.4648 12.375 11.3242 12.375 11.1836C12.375 11.0078 12.2695 10.8672 12.1641 10.7617L10.125 9.25V4.1875C10.125 3.90625 9.84375 3.625 9.5625 3.625H8.4375C8.12109 3.625 7.875 3.90625 7.875 4.1875V9.67188C7.875 10.1289 8.05078 10.5156 8.40234 10.7617L10.7578 12.5195C10.8281 12.5898 10.9688 12.6602 11.0742 12.6602C11.2852 12.6602 11.4258 12.5547 11.5312 12.4141L12.2344 11.5352Z" fill="white"/>
                  </svg>
                </span>
                <p class="promo__text">${restaurant.time}</p>
              </div>
            </div>
          </div>
          <div class="restaurants__about">
            <div class="restaurants__logo">
              <img src="${restaurant.logo}" alt="${restaurant.name} logo">
            </div>
            <div class="restaurants__info">
              <h4 class="h4 restaurants__name">${restaurant.name}</h4>
              <p class="restaurants__rating rating">
                <span class="rating__icon">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1289 1.52344C11.6445 0.492188 13.1055 0.535156 13.5781 1.52344L16.4141 7.23828L22.6875 8.14062C23.8047 8.3125 24.2344 9.6875 23.418 10.5039L18.9062 14.9297L19.9805 21.1602C20.1523 22.2773 18.9492 23.1367 17.9609 22.6211L12.375 19.6562L6.74609 22.6211C5.75781 23.1367 4.55469 22.2773 4.72656 21.1602L5.80078 14.9297L1.28906 10.5039C0.472656 9.6875 0.902344 8.3125 2.01953 8.14062L8.33594 7.23828L11.1289 1.52344Z" fill="#FFB30E"/>
                  </svg>
                </span>
                <span class="rating__number">${restaurant.rating}</span>
              </p>
            </div>
          </div>
          <p class="restaurants__status">${restaurant.status}</p>
        </div>
      `;
      restlist.innerHTML += card;
    });
  }
});