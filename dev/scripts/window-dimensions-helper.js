"use strict";

const wdHelper = {
    // shorthand helper methods for querySelector and querySelectorAll functions
    dqs: (query) => document.querySelector(query),
    dqsa: (query) => document.querySelectorAll(query)
};

wdHelper.init = () => {
    wdHelper.insertDimensionsContainer();
};

wdHelper.insertDimensionsContainer = () => {
    const dimensionsContainer = document.createElement("div");

    // add id so element can be targeted with CSS
    dimensionsContainer.id = "wdHelper";

    // fill dimensionsContainer with HTML elements
    dimensionsContainer.innerHTML = `
        <p id="windowWidth">width (window) = <span></span></p>
        <p id="windowWidthScrollbar">width (window+scrollbar) = <span></span></p>
        <p id="windowHeight">height (window) = <span></span></p>
    `

    wdHelper.dqs("body").appendChild(dimensionsContainer);

    wdHelper.storeDimensionElements();
};

wdHelper.storeDimensionElements = () => {
    // store the following elements that correspond to:
        // 1. width of the window
        // 2. width of the window + scrollbar
        // 3. height of the window
    wdHelper.windowWidth = wdHelper.dqs("#windowWidth span");
    wdHelper.windowWidthScrollbar = wdHelper.dqs("#windowWidthScrollbar span");
    wdHelper.windowHeight = wdHelper.dqs("#windowHeight span");

    wdHelper.calculateDimensions();
};

wdHelper.calculateDimensions = () => {
    // calculate then update the dimension elements
    let windowWidth = document.documentElement.offsetWidth;
    wdHelper.windowWidth.textContent = `${windowWidth}px`;

    let windowWidthScrollbar = window.innerWidth;
    wdHelper.windowWidthScrollbar.textContent = `${windowWidthScrollbar}px`;

    let windowHeight = window.innerHeight;
    wdHelper.windowHeight.textContent = `${windowHeight}px`;
};

// on resize of window, call calculateDimensions()
window.onresize = () => {
    wdHelper.calculateDimensions();
};

// document ready
document.addEventListener("DOMContentLoaded", () => {
    wdHelper.init();
});