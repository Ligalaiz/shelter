/**
 * @param {String} popup
 * @param {String} overlay
 * @param {String} slider
 * @param {String} url
 * @param {String} wrapperBody
 * @param {String} closeBtn
 */

export default class Popup {
  constructor(popup, overlay, slider, url, body, closeBtn) {
    this.popup = popup;
    this.overlay = overlay;
    this.slider = slider;
    this.url = url;
    this.body = body;
    this.closeBtn = closeBtn;
  }

  addDataToCard(data, namePet) {
    const pet = data.find((i) => i['name'] === namePet);
    this.popup.querySelector('.popup__title').textContent = pet['name'];
    this.popup.querySelector('.popup__img img').src = pet['img'].replace(
      'images',
      'images/friends'
    );
    this.popup.querySelector(
      '.popup__subtitle'
    ).textContent = `${pet['type']} - ${pet['breed']}`;
    this.popup.querySelector('.popup__text').textContent = pet['description'];
    this.popup.querySelector('.popup__age').textContent = pet['age'];
    this.popup.querySelector('.popup__inoculations').textContent =
      pet['inoculations'];
    this.popup.querySelector('.popup__diseases').textContent = pet['diseases'];
    this.popup.querySelector('.popup__parasites').textContent =
      pet['parasites'];
  }

  addListener(e) {
    if (e.target.closest('li>div')) {
      setTimeout(() => this.showPopup(), 1000);
    }
    let cardPet = e.target.closest('li>div');
    if (!cardPet) return;
    let namePet = cardPet.dataset.name;

    this.slider
      .getData(this.url)
      .then((data) => this.addDataToCard(data, namePet));
  }

  showPopup() {
    this.body.classList.add('body--overflow');
    this.popup.classList.toggle('popup--active');
    this.overlay.classList.add('overlay--active', 'overlay--active-index');
  }

  closePopup() {
    this.body.classList.remove('body--overflow');
    this.popup.classList.remove('popup--active');
    this.overlay.classList.remove('overlay--active', 'overlay--active-index');
  }

  makeHoverBtn() {
    this.closeBtn.classList.add('popup__close--hover');
  }
  
  removeHoverBtn() {
    this.closeBtn.classList.remove('popup__close--hover');
  }
}
