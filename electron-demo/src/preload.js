console.log('Logging from preload!');
console.log('🦄🦄🦄');

// // console.log(window);
// // setTimeout(console.log(window), 5000);

// console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);


// console.log('Logging the window object: ', window);

window.onload = function injectJs() {
  const htmlBody = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'backend/injected.js');
  htmlBody.appendChild(script);
}

