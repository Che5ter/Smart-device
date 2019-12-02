'use strict';

var MOBILE_WIDTH = 768;
var TABLET_WIDTH = 1023;
var adviceButton = document.querySelector('.promo__link--advice');
var changingText = document.querySelector('.about-company__js-text-change');

var changeTextPromo = function () {
  if (adviceButton) {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      adviceButton.innerHTML = 'Бесплатная консультация';
    } else {
      adviceButton.innerHTML = 'Получить бесплатную консультацию';
    }
  }
};

var changeTextAboutCompany = function () {
  if (changingText) {
    if (document.body.clientWidth <= TABLET_WIDTH) {
      changingText.innerHTML = 'Наши поставщики - мировые производители электронных компонентов: OSRAM, CREE, HOLGLITRONIC, REFOND. Печатные платы и комплектующие Service Devices применяются на предприятиях Российских Железных Дорог..';
    } else {
      changingText.innerHTML = 'Наши поставщики - мировые производители электронных компонентов: OSRAM, CREE, HOLGLITRONIC, REFOND. Печатные платы и комплектующие Service Devices применяются на предприятиях Российских Железных Дорог (РЖД), РоссАвтоПрома (ВАЗ, АвтоГАЗ), МинАтома, СпецМедТехники. Среди наших клиентов крупнейшие Производители светотехники России.';
    }
  }
};

window.addEventListener('resize', function () {
  changeTextPromo();
  changeTextAboutCompany();
});
