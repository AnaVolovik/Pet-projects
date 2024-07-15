// SUBSCRIBE

const subscribeForm = document.getElementById('subscribeForm');
const subscribeInput = document.getElementById('subscribeInput');
const subscribeButton = document.getElementById('subscribeButton');
const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;

function validateEmail(value) {
  return emailRe.test(value);
}

function updateInput() {
  if (validateEmail(subscribeInput.value)) {
    subscribeInput.style.color = '#A4CB66';
    return true;
  } else {
    subscribeInput.style.color = '#AE1332';
    return false;
  }
}

subscribeInput.addEventListener('input', updateInput);

subscribeForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const isValid = updateInput();

  if (!isValid) {
    alert("Please enter a valid email address.");
  } else {
    console.log('Form will be submitted');

    const email = subscribeInput.value.trim();

    fetch(`/subscribe?email=${encodeURIComponent(email)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      subscribeButton.innerHTML = 'Subscribed!';
      subscribeButton.classList.add('subscribed');
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  }
});