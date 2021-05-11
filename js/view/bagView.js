class BagView {
  _parentEl = document.querySelector('#product');
  _checkoutSection = document.querySelector('.bag__checkout');
  _itemsSection = document.querySelector('.bag__items--container');
  _checkoutPrice = document.querySelector('.checkout__price');
  // _itemsSection = document.querySelector('.bag__items');

  addHandlerBtnClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const addToBagBtn = e.target.closest('.btn');
      if (!addToBagBtn) return;
      const size = addToBagBtn
        .closest('.product__description--info--container')
        .querySelector('.product__description--select').value;
      handler(size);
    });
  }

  renderToBag(arr) {
    const markup = arr.map(suit => this._generateMarkup(suit)).join('');
    this._itemsSection.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup(suit) {
    return `
    <div class="bag__item">
      <div class="bag__item--img--container">
        <img
          srcset="${suit.mainImage}"
          alt="Suit Image"
          class="bag__item--img"
        />
      </div>

      <div class="bag__item--text--container">
        <div class="bag__item--text">
          <h4 class="heading-4 mb-sm">
            ${suit.name}
          </h4>

          <div class="product__description--item">
            <p class="product__description--label">QTY:</p>
            <select
              name="Select quantity"
              class="product__description--select"
            >
              <option value="1" class="product__description--option">
                1
              </option>
              <option value="2" class="product__description--option">
                2
              </option>
              <option value="3" class="product__description--option">
                3
              </option>
            </select>
          </div>

          <div class="product__description--item">
            <p class="product__description--label">Size:</p>
            <p class="product__description--size">${suit.size}</p>
          </div>

          <div class="product__description--item">
            <p class="product__description--label">Item Price:</p>
            <p class="product__description--price">${suit.price}$</p>
          </div>
        </div>

        <svg class="bag__item--icon" data-code="${suit.code}">
          <use xlink:href="img/sprite.svg#trash"></use>
        </svg>
      </div>
    </div>`;
  }

  addHandlerDelete(handler) {
    this._itemsSection.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target.closest('.bag__item--icon');
      if (!target) return;

      const code = target.dataset.code;
      const size = target
        .closest('.bag__item--text--container')
        .querySelector('.product__description--size').textContent;
      handler(code, size);
    });
  }

  addHandlerSelect(handler) {
    this._itemsSection.addEventListener('input', function (e) {
      // e.preventDefault();
      const target = e.target.closest('.product__description--select');
      if (!target) return;

      const amount = target.value;
      const size = target
        .closest('.bag__item--text--container')
        .querySelector('.product__description--size').textContent;
      const code = target
        .closest('.bag__item--text--container')
        .querySelector('.bag__item--icon').dataset.code;
      handler(amount, code, size);
    });
  }

  clearSection() {
    this._itemsSection.innerHTML = '';
  }

  updateCheckoutPrice(price) {
    this._checkoutPrice.textContent = `${price}$`;
  }
}

export default new BagView();
