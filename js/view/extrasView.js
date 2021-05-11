class ExtrasView {
  // Nav
  _navs = document.querySelectorAll('.nav');
  _linkClickedId;
  _bagIcon = document.querySelector('.bag--icon');
  _hamburger = document.querySelector('.hamburger');
  _sideMenu = document.querySelector('.side-menu');

  // Filters
  _filtersContainer = document.querySelector('.filters');
  _filtersSize = document.querySelector('.filters__size');
  _filtersBtn = document.querySelector('.filters__btn');

  // Description product
  _productSection = document.querySelector('#product');
  _descriptionContainer = document.querySelector(
    '.product__description--details'
  );
  _descriptionTop = document.querySelectorAll('.product__description--top');
  _descriptionTexts = document.querySelectorAll('.product__description--text');

  // NAVIGATION
  addHandlerNav(handler) {
    this._navs.forEach(n => {
      n.addEventListener('click', function (e) {
        e.preventDefault();
        const id = e.target.closest('.nav__link');
        // Guard clause
        if (!id) return;

        handler(id.getAttribute('href'));
      });
    });
  }

  displaySection(id) {
    // Class add
    this._linkClickedId = id;
    document
      .querySelectorAll('section')
      .forEach(sec => sec.classList.add('hidden'));
    document.querySelector(this._linkClickedId).classList.remove('hidden');
  }

  // BAG ICON
  addHandlerBagClick(handler) {
    this._bagIcon.addEventListener('click', function (e) {
      handler();
    });
  }

  // FILTERS
  addHandlerFilters(handler) {
    this._filtersSize.addEventListener('click', function (e) {
      e.preventDefault();
      const filterClicked = e.target.closest('.filters__size--btn');
      if (!filterClicked) return;
      handler(filterClicked);
    });
  }

  activateFilter(filter) {
    filter.classList.toggle('active--size');
  }

  addHandlerFiltersBtn(handler) {
    this._filtersBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  activateFiltersContainer() {
    this._filtersContainer.classList.toggle('active--filters');
  }

  // DESCRIPTION
  addHandlerDescription(handler) {
    this._productSection.addEventListener('click', function (e) {
      e.preventDefault();
      const targetBtn = e.target.closest('.product__description--btn');
      if (!targetBtn) return;

      const targetTop = e.target.closest('.product__description--top');
      const targetText = e.target.closest('.product__description--top')
        .nextSibling.nextSibling;

      handler(targetText, targetTop, targetBtn);
    });
  }

  activateDescription(targetText, targetTop, targetBtn) {
    const tops = document.querySelectorAll('.product__description--top');
    tops.forEach(h => {
      h.classList.remove('active--top');
    });

    const texts = document.querySelectorAll('.product__description--text');
    texts.forEach(h => {
      h.classList.remove('active--text');
    });

    const arrows = document.querySelectorAll('.product__description--btn');
    arrows.forEach(a => {
      a.classList.remove('active--desc--btn');
    });

    targetText.classList.toggle('active--text');
    targetTop.classList.toggle('active--top');
    targetBtn.classList.toggle('active--desc--btn');
  }

  // HAMBURGER
  addHandlerHamburgerClick(handler) {
    this._hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target.closest('.hamburger');
      handler();
    });
  }

  activateHamburger() {
    this._hamburger.classList.toggle('active--hamburger');
  }

  activateMenu() {
    this._sideMenu.classList.toggle('active--side-menu');
  }

  closeMenu() {
    this._sideMenu.classList.remove('active--side-menu');
  }
}

export default new ExtrasView();
