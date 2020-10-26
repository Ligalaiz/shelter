import Menu from './Menu.js';
import SmoothScroll from './SmoothScroll.js';

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