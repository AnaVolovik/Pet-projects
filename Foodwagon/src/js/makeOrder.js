
import allFoodData, { fetchFoodData } from './getAllFoodData.js';

// MAKE ORDER

document.addEventListener('DOMContentLoaded', () => {
  const deliverPointSelect = document.getElementById('deliverPoint');
  const formAddress = document.getElementById('formAddress');
  const orderPopup = document.querySelector('.order-popup');
  const confirmPopup = document.querySelector('.confirm-popup');
  const successPopup = document.querySelector('.success-popup');
  const overlay = document.querySelector('.overlay');
  const closeConfirmPopup = document.getElementById('closeConfirmPopup');
  const closeOrderPopup = document.getElementById('closeOrderPopup');
  const ctaButton = document.getElementById('ctaButton');
  const searchFoodSection = document.getElementById('searchFoodSection');
  const orderArray = document.getElementById('orderArray');
  const sendOrder = document.querySelector('.order__button');
  let foodArray = [];
  const maxPortions = 50;
  const localPrices = {};

  // Fetch food data and set up order buttons
  fetchFoodData().then(data => {
    setupOrderButtons(data);
  }).catch(error => {
    console.error('Error during data fetch:', error);
  });

  // Show/hide popups
  function closePopup(popupBtn, popup) {
    popupBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.classList.remove('active');

      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    });
  }

  closePopup(closeConfirmPopup, confirmPopup);
  closePopup(closeOrderPopup, orderPopup);

  // Scroll to Search-food section
  ctaButton.addEventListener('click', (event) => {
    event.preventDefault();
    searchFoodSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Add food items to foodArray and generate order item HTML
  let currentFoodItem = null;
  let currentRelativeContainer = null;

  function setupOrderButtons(foodItems) {
    const wrapper = document.querySelector('.wrapper');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');

    // Delegating events for orderBtn
    wrapper.addEventListener('click', (event) => {
      const button = event.target.closest('.orderBtn');

      if (button) {
        event.preventDefault();

        const selectedValue = deliverPointSelect.textContent.trim();

        if (selectedValue === 'Current Location') {
          formAddress.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const itemName = button.getAttribute('data-item').trim();
          const foodItem = foodItems.find(item => item.name.trim() === itemName);
          
          if (!foodItem) {
            console.error('Food item not found:', itemName);
            return;
          }

          currentFoodItem = foodItem;

          const relativeContainer = button.closest('._relative');
          if (!relativeContainer) {
            console.error('Не удалось найти контейнер _relative для кнопки заказа');
            return;
          }

          currentRelativeContainer = relativeContainer;

          if (confirmPopup.parentNode) {
            confirmPopup.parentNode.removeChild(confirmPopup);
          }
          
          relativeContainer.appendChild(confirmPopup);
          confirmPopup.style.display = 'flex';
          confirmPopup.scrollIntoView({ behavior: 'smooth', block: 'start'});
          overlay.classList.add('active');

          // Handle confirmYesBtn
          confirmYesBtn.onclick = () => {
            if (currentFoodItem) {
              confirmPopup.style.display = 'none';
              overlay.classList.remove('active');
              if (confirmPopup.parentNode) {
                confirmPopup.parentNode.removeChild(confirmPopup);
              }

              currentRelativeContainer.appendChild(orderPopup);
              currentRelativeContainer.appendChild(successPopup);
              orderPopup.style.display = 'flex';
              orderPopup.scrollIntoView({ behavior: 'smooth', block: 'start'});
              overlay.classList.add('active');

              foodArray.push(currentFoodItem);
              const orderItemHTML = generateOrderItem(currentFoodItem);
              orderArray.insertBefore(orderItemHTML, orderArray.lastElementChild);

              updateOrderPopup();

              currentFoodItem = null;
              currentRelativeContainer = null;
            }
          };

          // Handle confirmNoBtn
          confirmNoBtn.onclick = () => {
            if (currentFoodItem) {
              confirmPopup.style.display = 'none';
              overlay.classList.remove('active');
              if (confirmPopup.parentNode) {
                confirmPopup.parentNode.removeChild(confirmPopup);
              }

              foodArray.push(currentFoodItem);
              searchFoodSection.scrollIntoView({ behavior: 'smooth' });
              
              currentFoodItem = null;
              currentRelativeContainer = null;
            } else {
              console.error('No current food item when clicking "No"');
            }
          };
        }
      }
    });
  }

  // Update array in Order Popup
  function updateOrderPopup() {
    const portionValues = {};
    document.querySelectorAll('.order__portion-input').forEach(input => {
      const itemId = input.closest('.order__info').getAttribute('data-id');
      if (itemId !== null) {
        portionValues[itemId] = parseInt(input.value);
      }
    });

    orderArray.innerHTML = '';
  
    if (foodArray.length === 0) {
      orderPopup.style.display = 'none';
      overlay.classList.remove('active');
      if (orderPopup.parentNode) {
        orderPopup.parentNode.removeChild(orderPopup);
      }
      searchFoodSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      foodArray.forEach(foodItem => {
        const existingItem = orderArray.querySelector(`[data-id='${foodItem.id}']`);

        if (existingItem) {
          const portionInput = existingItem.querySelector('.order__portion-input');
          portionInput.value = parseInt(portionInput.value) + 1;

          updatePrice(existingItem);

          const deleteLink = existingItem.querySelector('.order__delete');
          if (deleteLink) {
            deleteLink.addEventListener('click', (event) => {
              event.preventDefault();
              deleteFoodItem(foodItem.id, existingItem);
            });
          }
        } else {
          const orderItemHTML = generateOrderItem(foodItem, portionValues[foodItem.id] || 1);
          orderArray.appendChild(orderItemHTML);
          const orderInfo = orderItemHTML.querySelector('.order__info');

          updatePrice(orderInfo);

          const deleteLink = orderItemHTML.querySelector('.order__delete');
          if (deleteLink) {
            deleteLink.addEventListener('click', (event) => {
              event.preventDefault();
              deleteFoodItem(foodItem.id, orderItemHTML);
            });
          }
        }
      });
    }
  }

  // Generate HTML for each food item
  function generateOrderItem(foodItem, portion = 1) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('order__wrapper');

    itemElement.innerHTML = `
      <div class="order__image">
        <img src="${foodItem.image_url}" alt="">
      </div>
      <div class="order__info" data-id="${foodItem.id}">
        <div class="order__detail">
          <p class="order__text font">Name:</p>
          <p class="order__name font">${foodItem.name}</p>
        </div>
        <div class="order__detail">
          <p class="order__text font">Restaurant:</p>
          <p class="order__restaurant font">
            <span class="item__point-icon">
              <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.04688 17.8984C0.914062 10.5156 0 9.74219 0 7C0 3.27344 2.98828 0.25 6.75 0.25C10.4766 0.25 13.5 3.27344 13.5 7C13.5 9.74219 12.5508 10.5156 7.41797 17.8984C7.10156 18.3906 6.36328 18.3906 6.04688 17.8984ZM6.75 9.8125C8.29688 9.8125 9.5625 8.58203 9.5625 7C9.5625 5.45312 8.29688 4.1875 6.75 4.1875C5.16797 4.1875 3.9375 5.45312 3.9375 7C3.9375 8.58203 5.16797 9.8125 6.75 9.8125Z" fill="#FFB30E"/>
              </svg>
            </span>
            <span>${foodItem.point}</span>
          </p>
        </div>
        <div class="order__detail">
          <p class="order__text font">Portion:</p>
          <div class="order__portion font">
            <button type="button" class="order__portion-decrease _disabled">-</button>
            <input type="number" class="order__portion-input" value="${portion}" min="1">
            <button type="button" class="order__portion-increase">+</button>
          </div>
        </div>
        <div class="order__detail">
          <p class="order__text font">Price:</p>
          <p class="order__price font" data-unit-price="${foodItem.price}">${foodItem.price}</p>
        </div>
        <a href="#" class="order__delete font">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L16 16M16 2L2 16" stroke="#FFB30E" stroke-width="2"/>
          </svg>
          <span>Delete</span>
        </a>
      </div>
    `;

    return itemElement;
  }

  // Delete item from foodArray and update total price
  function deleteFoodItem(foodId, orderItemHTML) {
    const index = foodArray.findIndex(item => item.id === foodId);

    if (index !== -1) {
      foodArray.splice(index, 1);
      delete localPrices[foodId];
      orderItemHTML.remove();

      updateOrderPopup();
    } else {
      console.error(`Food item with ID '${foodId}' not found in foodArray`);
    }
  }

  // Handle portion with buttons
  function handlePortionButtons(event) {
    const orderInfo = event.target.closest('.order__info');
    if (!orderInfo) return;

    const portionInput = orderInfo.querySelector('.order__portion-input');
    let currentValue = parseInt(portionInput.value);
  
    if (isNaN(currentValue) || currentValue < 1) {
      currentValue = 1;
      portionInput.value = 1;
    }

    if (event.target.classList.contains('order__portion-decrease')) {
      if (currentValue > 1) {
        portionInput.value = --currentValue;
        if (currentValue <= 1) {
          event.target.classList.add('_disabled');
        }
        const increaseBtn = orderInfo.querySelector('.order__portion-increase');
        increaseBtn.classList.remove('_disabled');
      }
    } else if (event.target.classList.contains('order__portion-increase')) {
      if (currentValue < maxPortions) {
        portionInput.value = ++currentValue;
        if (currentValue >= maxPortions) {
          event.target.classList.add('_disabled');
        }
        const decreaseBtn = orderInfo.querySelector('.order__portion-decrease');
        decreaseBtn.classList.remove('_disabled');
      }
    }

    updatePrice(orderInfo);
  }

  // Handle portion with input
  function handlePortionInput(event) {
    const orderInfo = event.target.closest('.order__info');
    if (!orderInfo) return;

    const portionInput = orderInfo.querySelector('.order__portion-input');
    const decreaseBtn = orderInfo.querySelector('.order__portion-decrease');
    const increaseBtn = orderInfo.querySelector('.order__portion-increase');
    let currentValue = parseInt(portionInput.value);

    if (isNaN(currentValue) || currentValue < 1) {
      portionInput.value = 1;
      currentValue = 1;
    }

    if (currentValue <= 1) {
      decreaseBtn.classList.add('_disabled');
    } else {
      decreaseBtn.classList.remove('_disabled');
    }

    if (currentValue >= maxPortions) {
      portionInput.value = maxPortions;
      currentValue = maxPortions;
      increaseBtn.classList.add('_disabled');
    } else {
      increaseBtn.classList.remove('_disabled');
    }

    updatePrice(orderInfo);
  }

  // Event listeners for dynamically added order items
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('order__portion-decrease') || event.target.classList.contains('order__portion-increase')) {
      handlePortionButtons(event);
    }
  });

  document.addEventListener('input', function(event) {
    if (event.target.matches('.order__portion-input')) {
      handlePortionInput(event);
    }
  });

  // Update local price
  function updatePrice(orderInfo) {
    const portionInput = orderInfo.querySelector('.order__portion-input');
    const priceElement = orderInfo.querySelector('.order__price');
  
    if (portionInput && priceElement) {
      const unitPriceString = priceElement.dataset.unitPrice;
      const unitPriceCleaned = unitPriceString.replace('$', '');
  
      if (unitPriceCleaned.trim() === '' || isNaN(parseFloat(unitPriceCleaned))) {
        console.error('Invalid unit price:', unitPriceString);
        return;
      }
  
      const unitPrice = parseFloat(unitPriceCleaned);
      const currentQuantity = parseInt(portionInput.value);
  
      if (!isNaN(currentQuantity) && currentQuantity >= 1 && !isNaN(unitPrice) && unitPrice >= 0) {
        const localPrice = (currentQuantity * unitPrice).toFixed(2);
        priceElement.textContent = `$${localPrice}`;

        // Update the price in the localPrices object
        const dishId = orderInfo.dataset.id;
        localPrices[dishId] = parseFloat(localPrice);
      }
    } else {
      console.error('Element not found:', portionInput, priceElement);
    }

    calculateTotalPrice(Object.values(localPrices));
  }

  // Calculate total price
  function calculateTotalPrice(pricesArray) {
    const totalPriceElement = document.getElementById('totalPrice');

    const totalPrice = pricesArray.reduce((total, price) => total + price, 0).toFixed(2);
    totalPriceElement.textContent = `$${totalPrice}`;
  }

  // Send order
  sendOrder.addEventListener('click', function(event) {
    event.preventDefault();

    const orderForm = document.getElementById('orderBody');
    const formData = new FormData(orderForm);

    fetch(orderForm.action, {
      method: orderForm.method,
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      clearOrderPopup();

      successPopup.style.display = 'flex';
      successPopup.scrollIntoView({ behavior: 'smooth', block: 'start'});
      overlay.classList.add('active');

      setTimeout(() => {
        successPopup.parentNode.removeChild(successPopup);
        overlay.classList.remove('active');
      }, 2000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  // Clear order popup when form was sent
  function clearOrderPopup() {
    const foodArrayCopy = [...foodArray];

    foodArrayCopy.forEach(foodItem => {
      const orderItemHTML = document.querySelector(`[data-id="${foodItem.id}"]`);
      if (orderItemHTML) {
        deleteFoodItem(foodItem.id, orderItemHTML);
      }
    });
  }
});