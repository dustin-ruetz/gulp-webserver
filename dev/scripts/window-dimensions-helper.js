"use strict";

const wdHelper = {
	// shorthand helper methods querySelector and querySelectorAll functions
	dqs: (query) => { return document.querySelector(query); },
	dqsa: (query) => { return document.querySelectorAll(query); },
};

wdHelper.init = () => {
	wdHelper.insertDimensionsContainer();
};

wdHelper.insertDimensionsContainer = () => {
	const dimensionsContainer = document.createElement("div");
	dimensionsContainer.id = "wdHelper"; // add id so element can be targeted with CSS
	dimensionsContainer.innerHTML = `
		<p id="windowWidth">width (window) = <span></span></p>
		<p id="windowWidthSb">width (window+scrollbar) = <span></span></p>
		<p id="windowHeight">height (window) = <span></span></p>
	`

	wdHelper.dqs("body").appendChild(dimensionsContainer);

	wdHelper.storeDimensionElements();
};

wdHelper.storeDimensionElements = () => {
	wdHelper.windowWidthE = wdHelper.dqs("#windowWidth span"); // width of window
	wdHelper.windowWidthSbE = wdHelper.dqs("#windowWidthSb span"); // width of window + scrollbar
	wdHelper.windowHeightE = wdHelper.dqs("#windowHeight span"); // height of window

	wdHelper.calculateDimensions();
};

wdHelper.calculateDimensions = () => {
	let windowWidth = document.documentElement.offsetWidth;
	wdHelper.windowWidthE.textContent = `${windowWidth}px`;

	let windowWidthSb = window.innerWidth;
	wdHelper.windowWidthSbE.textContent = `${windowWidthSb}px`;

	let windowHeight = window.innerHeight;
	wdHelper.windowHeightE.textContent = `${windowHeight}px`;
};

window.onresize = () => {
	wdHelper.calculateDimensions();
};

document.addEventListener("DOMContentLoaded", () => {
	wdHelper.init();
});