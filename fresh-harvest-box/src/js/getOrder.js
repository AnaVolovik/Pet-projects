// GET ORDER

document.addEventListener('DOMContentLoaded', () => {
  let allFruitsData = [];

  fetch('/get-fruits-data')
    .then(response => response.json())
    .then(data => {
      allFruitsData = data;
      generateFruitsList();
      window.addEventListener('resize', generateFruitsList);
    });

  const orderButton = document.getElementById('orderButton');
  const cartDesktop = document.getElementById('cartDesktop');
  const cartMobile = document.getElementById('cartMobile');

  const orderPopup = document.getElementById('orderPopup');
  const successPopup = document.getElementById('successPopup');
  const closeOrderPopup = document.getElementById('closeOrderPopup');
  const closeSuccessPopup = document.getElementById('closeSuccessPopup');
  const fruitsSection = document.getElementById('fruitsSection');
  const overlay = document.querySelector('.overlay');

  const orderForm = document.getElementById('orderForm');
  const formFruitsList = document.getElementById('formFruitsList');
  const sendOrder = document.querySelector('.form__button');

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const cardInput = document.getElementById('cardInput');
  const commentInput = document.getElementById('commentInput');

  const fullNameRe = /^[a-zA-Z]+\s[a-zA-Z]+$/;
  const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
  const cardRe = /^(\d{4}\s){3}\d{4}$/;
  const commentRe = /^[a-zA-Z0-9\s.,!?'"()-]*$/;

  // Show/hide popups
  function closePopup(popupBtn, popup) {
    popupBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.classList.remove('active');
    });
  }
  closePopup(closeOrderPopup, orderPopup);
  closePopup(closeSuccessPopup, successPopup);

  // Open Popups
  function openOrderPopup() {
    overlay.classList.add('active');
    orderPopup.style.display = 'flex';
    fruitsSection.scrollIntoView({ behavior: 'smooth', block: 'start'});
    generateFruitsList();
  }

  function openSuccessPopup() {
    successPopup.style.display = 'flex';
    fruitsSection.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  cartDesktop.addEventListener('click', openOrderPopup);
  cartMobile.addEventListener('click', openOrderPopup);
  orderButton.addEventListener('click', openOrderPopup);

  // Generate Fruits list
  function generateFruitsList() {
    formFruitsList.innerHTML = '';

    allFruitsData.forEach(fruit => {
      const card = `
        <div class="form__fruit item form-item" style="background-color: ${fruit.bgc}">
          <input class="item__input" type="checkbox" data-id="${fruit.id}" data-name="${fruit.name}">
          <h4 class="item__name form-item">${fruit.name}</h4>
          <p class="item__type form-item">${fruit.type}</p>
          <div class="item__image form-item">
            <img src="${fruit.image_url}" alt="${fruit.name}">
          </div>
          <p class="item__price form-item">${fruit.price}</p>
        </div>
      `;
      formFruitsList.innerHTML += card;
    });
  }

  // Validate FORM DATA

  function validate(value, regex) {
    return regex.test(value);
  }

  function updateStyle(inputElement, isValid) {
    inputElement.style.color = isValid ? '#A4CB66' : '#AE1332';
  }

  function validateAndUpdate(inputElement, regex) {
    const isValid = validate(inputElement.value, regex);
    updateStyle(inputElement, isValid);
    return isValid;
  }

  nameInput.addEventListener('input', () => validateAndUpdate(nameInput, fullNameRe));
  emailInput.addEventListener('input', () => validateAndUpdate(emailInput, emailRe));
  commentInput.addEventListener('input', () => validateAndUpdate(commentInput, commentRe));

  // process the card number input
  cardInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 16) value = value.slice(0, 16);

    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = formattedValue;

    validateAndUpdate(cardInput, cardRe);
  });

  // SEND FORM

  // Collect form data
  function collectFormData() {
    const formData = new FormData(orderForm);

    const selectedFruits = [];
    formFruitsList.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      const fruitData = {
        id: checkbox.dataset.id,
        name: checkbox.dataset.name
      };
      selectedFruits.push(fruitData);
    });

    formData.append('fruits', JSON.stringify(selectedFruits));

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    return data;
  }

  function validateForm() {
    const isNameValid = validateAndUpdate(nameInput, fullNameRe);
    const isEmailValid = validateAndUpdate(emailInput, emailRe);
    const isCardValid = validateAndUpdate(cardInput, cardRe);
    const isAnyFruitSelected = formFruitsList.querySelectorAll('input[type="checkbox"]:checked').length > 0;

    if (!isNameValid) {
      alert('Please enter a valid full name.');
    }

    if (!isEmailValid) {
      alert('Please enter a valid email address.');
    }

    if (!isCardValid) {
      alert('Please enter a valid card number.');
    }

    if (!isAnyFruitSelected) {
      alert('Please select at least one fruit.');
    }

    return isNameValid && isEmailValid && isCardValid && isAnyFruitSelected;
  }

  sendOrder.addEventListener('click', (event) => {
    event.preventDefault();

    if (validateForm()) {
      const data = collectFormData();
      
      fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        orderPopup.style.display = 'none';
        openSuccessPopup();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });

});
