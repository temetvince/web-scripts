// ==UserScript==
// @name         KingdomTribesDistractionFree
// @namespace    http://github.com/temetvince/web-scripts
// @version      0.1
// @description  Removes all non-game UI when playing Kingdom Tribes.
// @author       Emmett Casey
// @match        https://apps.facebook.com/kingdomtribes/*
// @grant        none
// ==/UserScript==

/**
 * Removes the element from the dom.
 */
const remove = element => {
    element.parentNode.removeChild(element);
};

/**
 * Removes all non-game UI when playing Kingdom Tribes.
 */
const main = () => {
    const adsBar = document.getElementById("rightCol");
    const messenger = document.getElementById("pagelet_dock");
    const facebookBar = document.getElementById("pagelet_bluebar");

    remove(adsBar);
    remove(messenger);
    remove(facebookBar);
}

main();
