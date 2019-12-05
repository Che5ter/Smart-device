'use strict';

var MOBILE_WIDTH = 768;
var TABLET_WIDTH = 1023;
var adviceButton = document.querySelector('.promo__link--advice');
var changingText = document.querySelector('.about-company__js-text-change');
var siteMap = document.querySelector('.site-map');
var mapButton = document.querySelector('.page-footer__toggle-button--map-open');
var contactButton = document.querySelector('.page-footer__toggle-button--contact-close');
var buttonModalClose = document.querySelector('.modal-form button[type="button"]');
var buttonModalOpen = document.querySelector('.main-nav__feedback');
var overlay = document.querySelector('.overlay');
var form = document.querySelector('.modal-form form');
var elements = document.querySelectorAll('.modal-form input, .modal-form textarea');

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
    if (document.body.clientWidth > MOBILE_WIDTH) {
      if (siteMap.classList.contains('visually-hidden')) {
        siteMap.classList.remove('visually-hidden');
        mapButton.classList.add('visually-hidden');
        contactButton.classList.add('visually-hidden');
      }
    }
  }
};

var closeModal = function (evt) {
  if (evt.target.offsetParent === null || evt.target.offsetParent.tagName === 'BODY') {
    overlay.classList.remove('overlay--show');
    overlay.classList.add('overlay--close');
  }
};

overlay.addEventListener('click', closeModal);

buttonModalClose.addEventListener('click', function () {
  overlay.classList.remove('overlay--show');
  overlay.classList.add('overlay--close');
});

buttonModalOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  overlay.classList.remove('overlay--close');
  overlay.classList.add('overlay--show');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 || evt.keyCode === 88) {
    overlay.classList.remove('overlay--show');
    overlay.classList.add('overlay--close');
  }
});

window.addEventListener('resize', function () {
  checkResolutionOther();
  checkResolutionMobile();
  changeTextPromo();
  changeTextAboutCompany();
});

checkResolutionMobile();


// Добавление в Localstorage значений формы в модальном окне

var saveLocalStorage = function (list) {
  list.forEach(function (element) {
    var id = element.getAttribute('id');
    localStorage.setItem(id, element.value);
  });
};


form.addEventListener('change', function (evt) {
  if (evt.target.matches('input') || evt.target.matches('textarea')) {
    saveLocalStorage(elements);
  }
});


window.addEventListener('load', function () {
  if (localStorage.getItem('modal-form__input-text') !== null) {
    elements.forEach(function (element) {
      element.value = localStorage.getItem(element.getAttribute('id'));
    });
  }
});
