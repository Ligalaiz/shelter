/**
 * @param {String} btn
 * @param {String} nav
 * @param {String} overlay
 * @param {String} logo
 * @param {String} body
 */

export default class Menu {
  constructor(btn, nav, overlay,logo, body) {
    this.isEnabled = false;
    this.nav = nav;
    this.overlay = overlay;
    this.btn = btn;
    this.logo = logo;
    this.body = body;
  }

  ignitor() {
    this.btn.classList.toggle('burger--active');
  }

  showMenu() {
    this.nav.classList.add('nav-show');
    this.overlay.classList.add('overlay--active');
    this.nav.classList.add('header__list--active');
    this.nav.classList.remove('nav-close');
    this.logo.classList.add('header__logo-link--active');
    this.body.classList.add('body--overflow');
  }

  closeMenu() {
    this.nav.classList.remove('nav-show');
    this.overlay.classList.remove('overlay--active');
    this.nav.classList.add('nav-close');
    this.body.classList.remove('body--overflow');
    this.logo.classList.remove('header__logo-link--active');
    this.nav.addEventListener(
      'animationend',
      () => {
        this.nav.classList.remove('header__list--active');
      },
      { once: true }
    );
  }

  algoritmsForBtn() {
    this.isEnabled = this.isEnabled ? false : true;
    switch (this.isEnabled) {
      case true:
        this.ignitor();
        this.showMenu();
        break;
      case false:
        this.closeMenu();
        this.ignitor();
        break;
    }
  }

  algoritmsForClose() {
    this.isEnabled = false;
    this.closeMenu();
    this.btn.classList.remove('burger--active');
  }
}
