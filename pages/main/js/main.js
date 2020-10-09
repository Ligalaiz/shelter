class Menu {
  ignitor() {
    btn.classList.toggle('burger--active');
  }
  showMenu() {
    nav.classList.add('nav-show');
    overlay.classList.add('overlay--active');
    nav.classList.add('header__list--active');
    nav.classList.remove('nav-close');
  }
  closeMenu() {
    nav.classList.remove('nav-show');
    overlay.classList.remove('overlay--active');
    nav.classList.add('nav-close');
    nav.addEventListener(
      'animationend',
      () => {
        nav.classList.remove('header__list--active');
      },
      { once: true }
    );
  }
}

let isEnabled = false;
const btn = document.getElementById('burger'),
  nav = document.getElementById('nav'),
  overlay = document.getElementById('overlay');

const menu = new Menu();

btn.addEventListener('click', () => {
  isEnabled = isEnabled ? false : true;
  switch (isEnabled) {
    case true:
      menu.ignitor();
      menu.showMenu();
      break;
    case false:
      menu.closeMenu();
      menu.ignitor();
      break;
  }
});
