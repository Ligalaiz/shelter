import Menu from './Menu.js';
import SmoothScroll from './SmoothScroll.js';
import Slider from './Slider.js';
import Popup from './Popup.js';

const btn = document.getElementById('burger'),
  nav = document.getElementById('nav'),
  overlay = document.getElementById('overlay'),
  activeMenuItem = document.querySelector('.header__link--active'),
  logo = document.querySelector('.header__logo-link'),
  body = document.querySelector('body'),
  anchor = document.querySelector('a[href="#toTop"]'),
  blockID = anchor.getAttribute('href');

// Mobile menu
const menu = new Menu(btn, nav, overlay, logo, body);

btn.addEventListener('click', () => menu.algoritmsForBtn());
overlay.addEventListener('click', () => menu.algoritmsForClose());
activeMenuItem.addEventListener('click', () => menu.algoritmsForClose());
document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') menu.algoritmsForClose();
});

// Smooth scroll to top
const smoothScroll = new SmoothScroll(anchor, blockID);
smoothScroll.showSmoothScroll();

// Slider
const slides = document.querySelectorAll('.slider__item'),
  prevBtn = document.querySelector('.slider__btn--toLeft'),
  nextBtn = document.querySelector('.slider__btn--toRight'),
  firstPage = document.querySelector('.slider__btn--dToLeft'),
  lastPage = document.querySelector('.slider__btn--dToRight'),
  pagesNumber = document.querySelector('.slider__btn--number'),
  url =
    'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json';

const slider = new Slider(
  slides,
  pagesNumber,
  prevBtn,
  nextBtn,
  firstPage,
  lastPage
);

prevBtn.addEventListener('click', function () {
  if (slider.isEnabled) {
    setTimeout(slider.previousItem(slider.slideIndex), 200);
  }
});

nextBtn.addEventListener('click', function () {
  if (slider.isEnabled) {
    setTimeout(slider.nextItem(slider.slideIndex), 200);
  }
});

firstPage.addEventListener('click', function () {
  if (slider.isEnabled) {
    slider.pages = 2;
    setTimeout(slider.previousItem(slider.slideIndex), 200);
  }
});

lastPage.addEventListener('click', function () {
  if (slider.isEnabled) {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      slider.pages = 5;
    } else if (window.matchMedia('(min-width: 767px)').matches) {
      slider.pages = 7;
    } else if (window.matchMedia('(min-width: 320px)').matches) {
      slider.pages = 15;
    }

    setTimeout(slider.nextItem(slider.slideIndex), 200);
  }
});

window.addEventListener('DOMContentLoaded', function () {
  slider.showPages();
  slider.getData(url).then((data) => {
    let count = slider.amountCardsOnSlide();
    slider.initCards(data, count);

    window.addEventListener('resize', () => {
      count = slider.amountCardsOnSlide();
      for (let i = 0; i < slides.length; i++) {
        slides[i].innerHTML = slider.appendCards(data, count);
      }
    });

    function appendRandomSlides() {
      data = data.sort(() => Math.random() - 0.5);
      document.querySelector(
        '.slider__item.changeSlides'
      ).innerHTML = slider.appendCards(data, count);
    }

    prevBtn.addEventListener('click', function () {
      appendRandomSlides();
    });
    nextBtn.addEventListener('click', function () {
      appendRandomSlides();
    });
  });
});

// Popup
const popup = document.querySelector('.popup'),
  closeBtn = popup.querySelector('.popup__close'),
  list = document.querySelector('.slider__list'),
  helpItemMenu = document.querySelector('.header__link--help'),
  contactItemMenu = document.querySelector('.header__link--contacts');

const popupPet = new Popup(popup, overlay, slider, url, body, closeBtn);

list.addEventListener('click', function (e) {
  e.preventDefault();
  popupPet.addListener(e);
});

closeBtn.addEventListener('click', function () {
  popupPet.closePopup();
});

overlay.addEventListener('click', function () {
  popupPet.closePopup();
});

helpItemMenu.addEventListener('click', (e) => e.preventDefault());
contactItemMenu.addEventListener('click', (e) => e.preventDefault());

overlay.addEventListener('mouseover', function () {
  popupPet.makeHoverBtn();
});

overlay.addEventListener('mouseout', function () {
  popupPet.removeHoverBtn();
});
