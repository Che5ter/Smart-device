'use strict';

var MOBILE_WIDTH = 768;
var adviceButton = document.querySelector('.promo__link--advice');

var changeText = function () {
  if (adviceButton) {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      adviceButton.innerHTML = 'Бесплатная консультация';
    } else {
      adviceButton.innerHTML = 'Получить бесплатную консультацию';
    }
  }
};

window.addEventListener('resize', function () {
  changeText();
});
