export default class Slider {
  constructor(slides) {
    this.slideIndex = 0;
    this.isEnabled = true;
    this.slides = slides;
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
      this.classList.add('active','changeSlides');
    });

    this.slides[this.slideIndex].addEventListener('animationend', () => {
      this.isEnabled = true;
    });
  };

  nextItem = (n) => {
    this.hideItem('to-left');
    this.slideShow(n + 1);
    this.showItem('from-right');
  };

  previousItem = (n) => {
    this.hideItem('to-right');
    this.slideShow(n - 1);
    this.showItem('from-left');
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
      ? 3
      : window.matchMedia('(min-width: 767px)').matches
      ? 2
      : 1;
  }

  appendCards(data, count) {
    let card = '';
    for (let i = 0; i < count; i++) {
      card += `
    <div class="slider__animal slider__item--${data[i].name.toLowerCase()}" data-name="${data[i].name}">
      <div class="slider__img">
        <img
          src="./assets/images/friends/${data[i].name.toLowerCase()}.png"
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

// let slideIndex = 0;
// let isEnabled = true;

// function slideShow(n) {
//   slideIndex = (n + slides.length) % slides.length;
// }

// function hideItem(direction) {
//   isEnabled = false;
//   slides[slideIndex].classList.add(direction);
//   slides[slideIndex].classList.remove('changeSlides');
//   slides[slideIndex].addEventListener('animationend', function () {
//     this.classList.remove('active', direction);
//   });
// }

// function showItem(direction) {
//   slides[slideIndex].classList.add('next', direction);
//   slides[slideIndex].addEventListener('animationend', function () {
//     this.classList.remove('next', direction);
//     this.classList.add('active', 'changeSlides');
//     isEnabled = true;
//   });
// }

// function nextItem(n) {
//   hideItem('to-left');
//   slideShow(n + 1);
//   showItem('from-right');
// }

// function previousItem(n) {
//   hideItem('to-right');
//   slideShow(n - 1);
//   showItem('from-left');
// }

// prevBtn.addEventListener('click', function () {
//   if (isEnabled) {
//     setTimeout(previousItem(slideIndex), 200);
//   }
// });

// nextBtn.addEventListener('click', function () {
//   if (isEnabled) {
//     setTimeout(nextItem(slideIndex), 200);
//   }
// });

// const url =
//   'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json';

// async function getData(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (e) {
//     console.error(e);
//   }
// }

// function amountCardsOnSlide() {
//   return window.matchMedia('(min-width: 1280px)').matches
// //    ? 3
//     : window.matchMedia('(min-width: 767px)').matches
//////    ? 2
//     : 1;
// }

// function appendCards(data, count) {
//   let card = '';
//   for (let i = 0; i < count; i++) {
//     card += `
//   <div class="slider__animal slider__item--${data[i].name.toLowerCase()}">
//     <div class="slider__img">
//       <img
//         src="./assets/images/friends/${data[i].name.toLowerCase()}.png"
//         alt="${data[i].name}"
//       />
//     </div>
//     <div class="slider__description">
//       <p class="slider__name">${data[i].name}</p>
//       <a class="slider__link btn" href="#">Learn more</a>
//     </div>
//   </div>
//   `;
//   }
//   return card;
// }
// function initCards(data, count) {
//   for (let i = 0; i < slides.length; i++) {
//     data = data.sort(() => Math.random() - 0.5);
//     slides[i].innerHTML = appendCards(data, count);
//   }
// }

// window.addEventListener('DOMContentLoaded', function () {
//   getData(url).then((data) => {
//     let count = amountCardsOnSlide();
//     initCards(data, count);
//     window.addEventListener('resize', () => {
//       let count = amountCardsOnSlide();
//       initCards(data, count);
//     });
//     function appendRandomSlides() {
//       data = data.sort(() => Math.random() - 0.5);
//       document.querySelector(
//         '.slider__item.changeSlides'
//       ).innerHTML = appendCards(data, count);
//     }

//     prevBtn.addEventListener('click', function () {
//       appendRandomSlides();
//     });
//     nextBtn.addEventListener('click', function () {
//       appendRandomSlides();
//     });
//   });
// });
