export default class Slider {
  constructor(slides, pagesNumber, prevBtn, nextBtn, firstPage, lastPage) {
    this.slideIndex = 0;
    this.isEnabled = true;
    this.slides = slides;
    this.pages = 1;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.pagesNumber = pagesNumber;
    this.firstPage = firstPage;
    this.lastPage = lastPage;
  }

  slideShow = (n) => {
    this.slideIndex = (n + this.slides.length) % this.slides.length;
  };

  hideItem = (direction) => {
    this.isEnabled = false;
    this.slides[this.slideIndex].classList.add(direction);
    this.slides[this.slideIndex].classList.remove('changeSlides');
    this.slides[this.slideIndex].addEventListener('animationend', function () {
      this.classList.remove('active', direction);
    });
  };

  showItem = (direction) => {
    this.slides[this.slideIndex].classList.add('next', direction);
    this.slides[this.slideIndex].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add('active', 'changeSlides');
    });

    this.slides[this.slideIndex].addEventListener('animationend', () => {
      this.isEnabled = true;
    });
  };

  showPages = () => {
    if (this.pages === 1) {
      this.prevBtn.setAttribute('disabled', '');
      this.firstPage.setAttribute('disabled', '');
      this.nextBtn.removeAttribute('disabled');
      this.lastPage.removeAttribute('disabled');
    } else if (
      this.pages === 6 &&
      window.matchMedia('(min-width: 1280px)').matches
    ) {
      this.nextBtn.setAttribute('disabled', '');
      this.lastPage.setAttribute('disabled', '');
      this.prevBtn.removeAttribute('disabled');
      this.firstPage.removeAttribute('disabled');
    } else if (
      this.pages === 8 &&
      window.matchMedia('(min-width: 767px)').matches
    ) {
      this.nextBtn.setAttribute('disabled', '');
      this.lastPage.setAttribute('disabled', '');
      this.prevBtn.removeAttribute('disabled');
      this.firstPage.removeAttribute('disabled');
    } else if (
      this.pages === 16 &&
      window.matchMedia('(min-width: 320px)').matches
    ) {
      this.nextBtn.setAttribute('disabled', '');
      this.lastPage.setAttribute('disabled', '');
      this.prevBtn.removeAttribute('disabled');
      this.firstPage.removeAttribute('disabled');
    } else {
      this.prevBtn.removeAttribute('disabled');
      this.firstPage.removeAttribute('disabled');
      this.nextBtn.removeAttribute('disabled');
      this.lastPage.removeAttribute('disabled');
    }
    this.pagesNumber.textContent = this.pages;
  };

  nextItem = (n) => {
    this.hideItem('to-left');
    this.slideShow(n + 1);
    this.showItem('from-right');

    this.pages += 1;
    this.showPages();
  };

  previousItem = (n) => {
    this.hideItem('to-right');
    this.slideShow(n - 1);
    this.showItem('from-left');

    this.pages -= 1;
    this.showPages();
  };

  async getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  amountCardsOnSlide() {
    return window.matchMedia('(min-width: 1280px)').matches
      ? 8
      : window.matchMedia('(min-width: 767px)').matches
      ? 6
      : 3;
  }

  appendCards(data, count) {
    let card = '';
    for (let i = 0; i < count; i++) {
      card += `
    <div class="slider__animal slider__item--${data[
      i
    ].name.toLowerCase()}" data-name="${data[i].name}">
      <div class="slider__img">
        <img
          src="../../assets/images/friends/${data[i].name.toLowerCase()}.png"
          alt="${data[i].name}"
        />
      </div>
      <div class="slider__description">
        <p class="slider__name">${data[i].name}</p>
        <a class="slider__link btn" href="#">Learn more</a>
      </div>
    </div>
    `;
    }
    return card;
  }

  initCards(data, count) {
    for (let i = 0; i < this.slides.length; i++) {
      data = data.sort(() => Math.random() - 0.5);
      this.slides[i].innerHTML = this.appendCards(data, count);
    }
  }
}
