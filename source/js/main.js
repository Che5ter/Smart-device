'use strict';

var MOBILE_WIDTH = 768;
var TABLET_WIDTH = 1023;
var adviceButton = document.querySelector('.promo__link--advice');
var changingText = document.querySelector('.about-company__js-text-change');
var siteMap = document.querySelector('.site-map');
var mapButton = document.querySelector('.page-footer__toggle-button--map-open');
var contactButton = document.querySelector('.page-footer__toggle-button--contact-close');

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

var checkResolutionMobile = function () {
  if (siteMap && mapButton && contactButton) {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      if (!siteMap.classList.contains('visually-hidden')) {
        siteMap.classList.add('visually-hidden');
        mapButton.classList.remove('visually-hidden');
        contactButton.classList.remove('visually-hidden');
      }
    }
  }
};

var checkResolutionOther = function () {
  if (siteMap && mapButton && contactButton) {
    if (document.body.clientWidth > MOBILE_WIDTH - 17) {
      if (siteMap.classList.contains('visually-hidden')) {
        siteMap.classList.remove('visually-hidden');
        mapButton.classList.add('visually-hidden');
        contactButton.classList.add('visually-hidden');
      }
    }
  }
};

window.addEventListener('resize', function () {
  checkResolutionOther();
  checkResolutionMobile();
  changeTextPromo();
  changeTextAboutCompany();
});

checkResolutionMobile();
