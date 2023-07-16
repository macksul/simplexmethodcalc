document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('.calculator button');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const value = button.textContent;

      if (value === '=') {
        try {
          display.value = eval(display.value);
        } catch (error) {
          display.value = 'Error';
        }
      } else if (value === 'C') {
        display.value = '';
      } else {
        display.value += value;
      }
    });
  });
});

// post data to flask server
function postData(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
}