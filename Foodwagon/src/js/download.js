// Download
  const googlePlay = document.querySelector('#googlePlay');
  const appStore = document.querySelector('#appStore');

  console.log(googlePlay);
  
  googlePlay.addEventListener('click', () => {
    window.open('https://play.google.com/store/apps?hl=en', '_blank');
  });
  
  appStore.addEventListener('click', () => {
    window.open('https://www.apple.com/iphone/', '_blank');
  });


