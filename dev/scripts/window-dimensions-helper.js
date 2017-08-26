"use strict";

// windowDimensionsHelper (wDH) object
const wDH = {
    dimensions: [
        {
            description: "width (window)",
            id: "winWidth"
        },
        {
            description: "width (window+scrollbar)",
            id: "winWidthScrollbar"
        },
        {
            description: "height (window)",
            id: "winHeight"
        }
    ]
};

wDH.init = () => {
    // windows dimensions helper element (wdHE)
    const wdHE = document.createElement("div");
    wdHE.classList.add("wdHelper");

    for (let i = 0; i < wDH.dimensions.length; i++) {
        let dimension = wDH.dimensions[i];

        let dimDesc = document.createElement("p");
        dimDesc.classList.add("wdHelper__dimDesc");
        dimDesc.textContent = `${dimension.description} = `;

        let dimVal = document.createElement("span");
        // note: IE 11 does not support multiple arguments for classList.add()
        dimVal.classList.add("wdHelper__dimVal");
        dimVal.classList.add(`wdHelper__dimVal--${dimension.id}`);

        // store each dimVal <span> element on the wDH object
        wDH[dimension.id] = dimVal;

        // append dimVal <span> elements as children of dimDesc <p> elements
        dimDesc.appendChild(dimVal);
        // append dimDesc <p> elements as children of wdHE element
        wdHE.appendChild(dimDesc);
    }

    document.querySelector("body").appendChild(wdHE);

    wDH.calculateDimensions();
};

wDH.calculateDimensions = () => {
    wDH.dimensions[0].measurement = document.documentElement.offsetWidth;
    wDH.dimensions[1].measurement = window.innerWidth;
    wDH.dimensions[2].measurement = window.innerHeight;

    for (let i = 0; i < wDH.dimensions.length; i++) {
        let dimension = wDH.dimensions[i];
        wDH[dimension.id].textContent = `${dimension.measurement}px`;
    }
};

window.addEventListener("resize", () => {
    wDH.calculateDimensions();
});

document.addEventListener("DOMContentLoaded", () => {
    wDH.init();
});