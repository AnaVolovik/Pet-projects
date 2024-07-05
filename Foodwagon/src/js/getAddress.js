// GET ADDRESS

async function getSuggestions(query) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

async function sendForm(formData) {
  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error');
      }
      throw new Error('Network response was not ok');
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return await response.json();
    } else {
      return {};
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error.message };
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('formAddress');
  const input = document.getElementById('addressInput');
  const suggestionBox = document.getElementById('suggestions');
  const searchButton = document.getElementById('searchButton');
  const deliverPoint = document.getElementsByClassName('deliver__point')[0];
  const orderPoint = document.getElementById('orderPoint');
  const preloader = document.getElementById('preloader');

  function showPreloader() {
    preloader.style.display = 'block';
  }

  function hidePreloader() {
    preloader.style.display = 'none';
  }

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    showPreloader();

    const result = await sendForm(formData);

    hidePreloader();

    setTimeout(hidePreloader, 3000);

    if (result.error) {
      alert(result.error);
    }
  });

  input.addEventListener('input', function() {
    suggestionBox.style.display = 'block';
  });

  input.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSearch();
    }
  });
  
  searchButton.addEventListener('click', async () => {
    await handleSearch();
  });

  async function handleSearch() {
    const query = input.value;

    suggestionBox.classList.remove('not-found');

    if (query.length > 2) {
      suggestionBox.innerHTML = '';
      showPreloader();

      try {
        const suggestions = await getSuggestions(query);
        suggestionBox.innerHTML = '';
        if (suggestions.length > 0) {
          suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion.display_name;
            suggestionBox.appendChild(div);
          });
        } else {
          suggestionBox.style.display = 'block';
          suggestionBox.classList.add('not-found');
          suggestionBox.innerHTML = 'Address not found';
        }

      } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while processing data on the server');
      } finally {
        hidePreloader();
      }
    } else {
      alert('Enter an address longer than 2 characters');
    }
  }

  suggestionBox.addEventListener('click', function(event) {
    if (event.target.tagName === 'DIV') {
      const selectedAddress = event.target.textContent;
      input.value = selectedAddress;
      suggestionBox.innerHTML = '';
      suggestionBox.style.display = 'none';
      deliverPoint.textContent = selectedAddress;
      orderPoint.textContent = selectedAddress;
    }
  });

  //Toggle class _checked
  const deliverButton = document.querySelector('.form__button-deliver');
  const pickupButton = document.querySelector('.form__button-pickup');

  const toggleClass = () => {
    deliverButton.classList.toggle('_checked');
    pickupButton.classList.toggle('_checked');
  };

  deliverButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!deliverButton.classList.contains('_checked')) {
      toggleClass();
    }
  });

  pickupButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!pickupButton.classList.contains('_checked')) {
      toggleClass();
    }
  });
});