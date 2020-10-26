import Menu from './Menu.js';

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
  prevBtn = document.querySelector('.slider__btn--left'),
  nextBtn = document.querySelector('.slider__btn--right'),
  url =
    'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json';

const slider = new Slider(slides);

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

window.addEventListener('DOMContentLoaded', function () {
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