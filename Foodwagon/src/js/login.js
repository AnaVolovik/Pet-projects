const loginPopup = document.querySelector('.login-popup');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const toolsLogin = document.querySelector('.tools__login');
const toolsLogout = document.querySelector('.tools__logout');
const toolsEmail = document.querySelector('.tools__email');
const emailLoginRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
const overlay = document.querySelector('.overlay');

// Open login popup
toolsLogin.addEventListener('click', () => {
  loginPopup.style.display = 'flex';
  overlay.classList.add('active');
});

// Close login popup
function closePopup() {
  loginPopup.style.display = 'none';
  overlay.classList.remove('active');
}
document.getElementById('closeloginPopup').addEventListener('click', closePopup);

// Validate Email
function validateLoginEmail(value) {
  return emailLoginRe.test(value);
}

// Update Email
function updateInput() {
  if (validateLoginEmail(emailInput.value)) {
    emailInput.style.color = '#9cda9c';
  } else {
    emailInput.style.color = '#dc7a7a';
    return false;
  }
}
emailInput.addEventListener('input', updateInput);

// Validate password
function validatePassword(password) {
  return password.length >= 8;
}

// Log In and send form
loginButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!validateLoginEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!validatePassword(password)) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    closePopup();

    toolsLogin.style.display = 'none';
    toolsLogout.style.display = 'flex';

    toolsLogout.addEventListener('click', handleLogout);
  } catch (error) {
    alert('Login failed. Please check your email and password.');
  }
});

// Log Out
function handleLogout() {
  toolsLogin.style.display = 'flex';
  toolsLogout.style.display = 'none';
}