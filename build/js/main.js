'use strict';

var MAX_SYMBOL_TEXT = 211;
var infoBlock = document.querySelector('.page-footer__info-block');
var buttonModalClose = document.querySelector('.modal-form__button-close');
var buttonModalOpen = document.querySelector('.main-nav__feedback');
var overlay = document.querySelector('.overlay');
var form = document.querySelector('.modal-form form');
var elements = document.querySelectorAll('.modal-form input, .modal-form textarea');
var aboutCompanyParagraphs = document.querySelectorAll('.about-company__wrapper p');
var siteMap = document.querySelector('.page-footer__site-map');
var siteContacts = document.querySelector('.page-footer__contacts');

siteMap.classList.remove('page-footer__site-map--nojs');
siteContacts.classList.remove('page-footer__contacts--nojs');

infoBlock.addEventListener('click', function (evt) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    if (evt.target === document.querySelector('.page-footer__site-map .page-footer__toggle-block')) {
      siteMap.classList.toggle('page-footer__site-map--closed');
      if (!siteContacts.classList.contains('.page-footer__contacts--closed')) {
        siteContacts.classList.add('page-footer__contacts--closed');
      }
    } else if (evt.target.parentElement === document.querySelector('.page-footer__site-map .page-footer__toggle-block')) {
      siteMap.classList.toggle('page-footer__site-map--closed');
      if (!siteContacts.classList.contains('.page-footer__contacts--closed')) {
        siteContacts.classList.add('page-footer__contacts--closed');
      }
    }
    if (evt.target === document.querySelector('.page-footer__contacts .page-footer__toggle-block')) {
      siteContacts.classList.toggle('page-footer__contacts--closed');
      if (!siteMap.classList.contains('.page-footer__site-map--closed')) {
        siteMap.classList.add('page-footer__site-map--closed');
      }
    } else if (evt.target.parentElement === document.querySelector('.page-footer__contacts .page-footer__toggle-block')) {
      siteContacts.classList.toggle('page-footer__contacts--closed');
      if (!siteMap.classList.contains('.page-footer__site-map--closed')) {
        siteMap.classList.add('page-footer__site-map--closed');
      }
    }
  }
});

var closeModal = function (evt) {
  if (evt.target.offsetParent === null || evt.target.offsetParent.tagName === 'BODY') {
    overlay.classList.remove('overlay--show');
    overlay.classList.add('overlay--close');
    document.body.style.overflow = '';
  }
};

overlay.addEventListener('click', closeModal);

buttonModalClose.addEventListener('click', function () {
  overlay.classList.remove('overlay--show');
  overlay.classList.add('overlay--close');
  document.body.style.overflow = '';
});

buttonModalOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  document.body.style.overflow = 'hidden';
  overlay.classList.remove('overlay--close');
  overlay.classList.add('overlay--show');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 || evt.keyCode === 88) {
    overlay.classList.remove('overlay--show');
    overlay.classList.add('overlay--close');
    document.body.style.overflow = '';
  }
});

window.addEventListener('resize', function () {
  makeParagraphLimitation(aboutCompanyParagraphs);
});


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

// Ставим ограничение на кол-во символов в параграфе блока о компании

var makeParagraphLimitation = function (someBlocks) {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    someBlocks.forEach(function (element) {
      var paragraphText = element.textContent;
      if (paragraphText.length > MAX_SYMBOL_TEXT) {
        element.textContent = (paragraphText.slice(0, MAX_SYMBOL_TEXT) + '..');
      }
    });
  }
};
