/**
 * @param {String} anchor
 * @param {String} blockID
 */

export default class SmoothScroll {
  constructor(anchor, blockID) {
    this.anchor = anchor;
    this.blockID = blockID;
  }
  showSmoothScroll() {
    this.anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(this.blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
