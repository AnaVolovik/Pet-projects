// MENU BURGER

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementsByTagName('body')[0];
  const iconMenu = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');
  const mediaMobile = 'max-width: $md2';
  const menuLink = document.querySelectorAll('.menu__link');
  const menuList = document.querySelector('.menu__list');


  let listElement = document.createElement('li');
  listElement.classList.add('menu__item', 'hidden');

  listElement.innerHTML = `
    <svg id="cartMobile" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.1667 6.16659H14.6667V4.99992C14.6667 3.76224 14.175 2.57526 13.2998 1.70009C12.4247 0.824917 11.2377 0.333252 10 0.333252C8.76234 0.333252 7.57535 0.824917 6.70019 1.70009C5.82502 2.57526 5.33335 3.76224 5.33335 4.99992V6.16659H1.83335C1.52393 6.16659 1.22719 6.2895 1.0084 6.50829C0.789603 6.72709 0.666687 7.02383 0.666687 7.33325V20.1666C0.666687 21.0948 1.03544 21.9851 1.69181 22.6415C2.34819 23.2978 3.23843 23.6666 4.16669 23.6666H15.8333C16.7616 23.6666 17.6518 23.2978 18.3082 22.6415C18.9646 21.9851 19.3333 21.0948 19.3333 20.1666V7.33325C19.3333 7.02383 19.2104 6.72709 18.9916 6.50829C18.7728 6.2895 18.4761 6.16659 18.1667 6.16659ZM7.66668 4.99992C7.66668 4.38108 7.91252 3.78759 8.3501 3.35C8.78769 2.91242 9.38118 2.66659 10 2.66659C10.6189 2.66659 11.2123 2.91242 11.6499 3.35C12.0875 3.78759 12.3333 4.38108 12.3333 4.99992V6.16659H7.66668V4.99992ZM17 20.1666C17 20.476 16.8771 20.7728 16.6583 20.9915C16.4395 21.2103 16.1428 21.3333 15.8333 21.3333H4.16669C3.85727 21.3333 3.56052 21.2103 3.34173 20.9915C3.12294 20.7728 3.00002 20.476 3.00002 20.1666V8.49992H5.33335V9.66659C5.33335 9.97601 5.45627 10.2728 5.67506 10.4915C5.89385 10.7103 6.1906 10.8333 6.50002 10.8333C6.80944 10.8333 7.10618 10.7103 7.32497 10.4915C7.54377 10.2728 7.66668 9.97601 7.66668 9.66659V8.49992H12.3333V9.66659C12.3333 9.97601 12.4563 10.2728 12.6751 10.4915C12.8938 10.7103 13.1906 10.8333 13.5 10.8333C13.8094 10.8333 14.1062 10.7103 14.325 10.4915C14.5438 10.2728 14.6667 9.97601 14.6667 9.66659V8.49992H17V20.1666Z" fill="#FFFFFF"/>
    </svg>`;
  menuList.appendChild(listElement);

  let isActive = function() {
    iconMenu.classList.toggle('_active');
    menu.classList.toggle('_active');
    body.classList.toggle('fixBody');
    
    if (iconMenu.classList.contains('_active')) {
      listElement.classList.remove('hidden');
      const cartMobile = document.getElementById('cartMobile');
      cartMobile.onclick = isActive;
    } else {
      if (listElement) {
        listElement.classList.add('hidden');
      }
    }
  }

  iconMenu.onclick = isActive;

  if ( mediaMobile ) {
    for ( let i = 0; i < menuLink.length; i++) {
      menuLink[i].onclick = isActive;
    }
  }
});