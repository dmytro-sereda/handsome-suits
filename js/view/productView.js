class ProductView {
  _parentEl = document.querySelector('.suits__container--wrapper');
  _productSection = document.querySelector('#product');
  // _imgContainer = document.querySelector('.product__img--container');
  // _mainImg = document.querySelector('.product__display--img');
  // _images = document.querySelectorAll('.product__img--wrapper');

  addHandlerSuitsClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target.closest('.suits__item');
      if (!target) return;
      const suit = {
        images: [
          target.dataset.img1,
          target.dataset.img2,
          target.children[0].children[0].getAttribute('srcset'),
        ],
        mainImage: target.children[0].children[0].getAttribute('srcset'),
        name: target.children[2].textContent,
        price: target.children[3].textContent.slice(0, -1),
        code: +target.dataset.code,
        amount: 1,
      };
      handler(suit);
    });
  }

  renderProductPage(suit) {
    const markup = this._generateMarkup(suit);
    this._productSection.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup(suit) {
    return `
    <div class="product__img--container">
    
    ${suit.images
      .map(img =>
        img.length > 0
          ? `
          <div class="product__img--wrapper">
            <img
              srcset="${img}"
              alt="Suit image"
              class="product__img"
            />
          </div>
        `
          : ''
      )
      .join('')}
    </div>

  <div class="product__display">
    <img
      srcset="${suit.mainImage}"
      alt="Suit image"
      class="product__display--img"
    />
  </div>

  <div class="product__description">
    <div class="product__description--info--container">
      <h4 class="heading-4 mb-md">
      ${suit.name}
      </h4>

      <div class="product__description--char">
        <div class="product__description--item">
          <p class="product__description--label">Item Price:</p>
          <p class="product__description--price">${suit.price}$</p>
        </div>

        <div class="product__description--item">
          <p class="product__description--label">Color:</p>
          <div class="product__description--color"></div>
        </div>

        <div class="product__description--item">
          <p class="product__description--label">Size:</p>
          <select class="product__description--select">
            <option value="S" class="product__description--option">
              S
            </option>
            <option value="M" class="product__description--option">
              M
            </option>
            <option value="L" class="product__description--option">
              L
            </option>
            <option value="XL" class="product__description--option">
              XL
            </option>
            <option value="XXL" class="product__description--option">
              XXL
            </option>
          </select>
        </div>
      </div>

      <a href="#" class="btn"><span>Add</span> to bag</a>
    </div>

    <div class="product__description--details">
      <div class="product__description--info">
        <div class="product__description--top">
          <p class="product__description--heading">Description</p>

          <svg class="product__description--btn">
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </div>
        <p class="product__description--text">
          A FULLY LINED ATTICUS SUIT WITH PEAK LAPELS. CRAFTED OF HIGH
          TWIST MOHAIR SILK.
        </p>
      </div>

      <div class="product__description--info">
        <div class="product__description--top">
          <p class="product__description--heading">Delivery</p>

          <svg class="product__description--btn">
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </div>
        <p class="product__description--text">
          A FULLY LINED ATTICUS SUIT WITH PEAK LAPELS. CRAFTED OF HIGH
          TWIST MOHAIR SILK.
        </p>
      </div>

      <div class="product__description--info">
        <div class="product__description--top">
          <p class="product__description--heading">Details</p>

          <svg class="product__description--btn">
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </div>
        <p class="product__description--text">
          A FULLY LINED ATTICUS SUIT WITH PEAK LAPELS. CRAFTED OF HIGH
          TWIST MOHAIR SILK.
        </p>
      </div>
    </div>
  </div>`;
  }

  clearProductSection() {
    this._productSection.innerHTML = '';
  }

  addHandlerImgClick(handler) {
    // this._imgContainer.addEventListener('click', function (e) {
    this._productSection.addEventListener('click', function (e) {
      const target = e.target.closest('.product__img');
      if (!target) return;
      const src = target.getAttribute('srcset');

      handler(src, target.closest('.product__img--wrapper'));
    });
  }

  getLastImage() {
    const images = document.querySelectorAll('.product__img--wrapper');
    return images[images.length - 1];
  }

  substituteMainImg(src) {
    const mainImg = document.querySelector('.product__display--img');
    mainImg.srcset = src;
  }

  activateImg(target) {
    const images = document.querySelectorAll('.product__img--wrapper');
    images.forEach(img => img.classList.remove('active--img'));
    target.classList.add('active--img');
  }
}

export default new ProductView();
