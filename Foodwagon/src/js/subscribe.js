// SUBSCRIBE

const subscribeForm = document.getElementById('subscribeForm');
const subscribeInput = document.getElementById('subscribeInput');
const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;

function validateEmail(value) {
  return emailRe.test(value);
}

function updateInput() {
  if (validateEmail(subscribeInput.value)) {
    subscribeInput.style.color = '#9cda9c';
  } else {
    subscribeInput.style.color = '#dc7a7a';
    return false;
  }
}

subscribeInput.addEventListener('input', updateInput);