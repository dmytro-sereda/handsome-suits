'use strict';

import { async } from 'regenerator-runtime';
import { state } from './model.js';
import extrasView from './view/extrasView.js';
import bagView from './view/bagView.js';
import productView from './view/productView.js';

///////////////////////////////
// CONTROLLER

function updatePrice() {
  state.totalPrice = 0;
  state.bag.forEach(i => (state.totalPrice += i.price * i.amount));
  bagView.updateCheckoutPrice(state.totalPrice);
}

// Nav click implementation
function controlNav(id) {
  // Change sections
  extrasView.displaySection(id);

  // Close menu
  extrasView.activateHamburger();
  extrasView.activateMenu();

  // Update price
  updatePrice();
}

// Bag click implementation
function controlBagClick() {
  // Open section bag
  extrasView.displaySection('#bag');

  // Update price
  updatePrice();
}

// Product click implementation
function controlProduct(suit) {
  // Clear section
  productView.clearProductSection();

  // Display product section
  extrasView.displaySection('#product');

  // Render product
  productView.renderProductPage(suit);

  // Add current suit to model
  state.currentSuit = suit;

  // Activate last image
  productView.activateImg(productView.getLastImage());
}

// Product Img click implementation
function controlProductImg(src, target) {
  // Substitute main pic
  productView.substituteMainImg(src);

  // Add active pic
  productView.activateImg(target);
}

// Add to bag implementation
function controlAddToBag(size) {
  // Clear section
  bagView.clearSection();

  // Add size to state
  state.currentSuit.size = size;

  // Check for the similar items
  if (state.bag.length === 0) {
    // Add to array
    state.bag.push(state.currentSuit);

    // Open bag section
    extrasView.displaySection('#bag');
  } else {
    if (
      !state.bag.find(
        item =>
          item.code === state.currentSuit.code &&
          item.size === state.currentSuit.size
      )
    ) {
      // Add to array
      state.bag.push(state.currentSuit);

      // Open bag section
      extrasView.displaySection('#bag');
    } else console.log(2323);
  }

  // Add to bag
  bagView.renderToBag(state.bag);

  state.bag.forEach(el => (el.amount = 1));

  // Update price
  updatePrice();
}

// Delete from cart implementation
function controlDeleteItem(code, size) {
  // Clear section
  bagView.clearSection();

  // Delete from array
  const deleteItem = state.bag.findIndex(item => {
    return item.code === +code && item.size === size;
  });

  state.bag.splice(deleteItem, 1);

  // Render cart
  bagView.renderToBag(state.bag);

  // Update price
  updatePrice();
}

// Amount of items change
function controlAmountItems(amount, code, size) {
  // Find the suit
  const changedItemIndex = state.bag.findIndex(
    el => el.code === +code && el.size === size
  );
  // Change amount of items
  state.bag[changedItemIndex].amount = amount;
  // Update price
  updatePrice();
}

// Filters click implementation
function controlFilters(filter) {
  // Apply class
  extrasView.activateFilter(filter);
}

// Filters on small screen
function controlFiltersSmall() {
  // Open and close
  extrasView.activateFiltersContainer();
}

// Open description implementation
function controlDescription(targetText, targetTop, targetBtn) {
  extrasView.activateDescription(targetText, targetTop, targetBtn);
}

// Activate hamburger
function controlHamburger() {
  // Add class
  extrasView.activateHamburger();

  // Move menu
  extrasView.activateMenu();
}

function init() {
  extrasView.displaySection('#suits');
  extrasView.addHandlerNav(controlNav);
  extrasView.addHandlerFilters(controlFilters);
  extrasView.addHandlerDescription(controlDescription);
  extrasView.addHandlerFiltersBtn(controlFiltersSmall);
  extrasView.addHandlerBagClick(controlBagClick);
  extrasView.addHandlerHamburgerClick(controlHamburger);

  productView.addHandlerSuitsClick(controlProduct);
  productView.addHandlerImgClick(controlProductImg);

  bagView.addHandlerBtnClick(controlAddToBag);
  bagView.addHandlerDelete(controlDeleteItem);
  bagView.addHandlerSelect(controlAmountItems);
}

init();
