// ==UserScript==
// @name         FacebookGamesRemoveAds
// @namespace    http://github.com/temetvince/web-scripts
// @version      0.1
// @description  Removes the games bar that shows when playing facebook games.
// @author       Emmett Casey
// @match        https://apps.facebook.com/*
// @grant        none
// ==/UserScript==

main();

/**
 * Removes the games bar that shows when playing facebook games.
 */
function main() {
    const adsBar = document.getElementById("rightCol");

    adsBar.parentNode.removeChild(adsBar);
}
