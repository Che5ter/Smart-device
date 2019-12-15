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
var mapToggleBlock = siteMap.querySelector('.page-footer__toggle-block');
var contactsToggleBlock = siteContacts.querySelector('.page-footer__toggle-block');

siteMap.classList.remove('page-footer__site-map--nojs');
siteContacts.classList.remove('page-footer__contacts--nojs');

var makeToggle = function (evt, target, firstBlock, secondBlock, firstClass, secondClass) {
  if (evt.target === target) {
    firstBlock.classList.toggle(firstClass);
    if (!secondBlock.classList.contains(secondClass)) {
      secondBlock.classList.add(secondClass);
    }
  } else if (evt.target.parentElement === target) {
    firstBlock.classList.toggle(firstClass);
    if (!secondBlock.classList.contains(secondClass)) {
      secondBlock.classList.add(secondClass);
    }
  }
};

infoBlock.addEventListener('click', function (evt) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    makeToggle(evt, mapToggleBlock, siteMap, siteContacts, 'page-footer__site-map--closed', 'page-footer__contacts--closed');
    makeToggle(evt, contactsToggleBlock, siteContacts, siteMap, 'page-footer__contacts--closed', 'page-footer__site-map--closed');
  }
});

/*
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

*/

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

var formFeedback = document.getElementById('feedback__form-input-tel');
var formModal = document.getElementById('modal-form__input-tel');
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

window.iMask(formFeedback, maskOptions);
window.iMask(formModal, maskOptions);

/* Плавный скролл по якорю */

// собираем все якоря; устанавливаем время анимации и количество кадров
var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
var animationTime = 300;
var framesCount = 20;

anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function (evt) {
    // убираем стандартное поведение
    evt.preventDefault();

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    var scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      var scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
