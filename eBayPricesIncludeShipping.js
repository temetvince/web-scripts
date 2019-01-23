// ==UserScript==
// @name         eBayPricesIncludeShipping
// @namespace    http://github.com/temetvince/web-scripts
// @version      0.2
// @description  Updates all eBay search result prices to include shipping cost and more
// @author       Emmett Casey
// @match        https://www.ebay.com/*
// @grant        none
// ==/UserScript==

main();

/**
 * Updates all eBay search result prices to include shipping cost
 * and then hides the shipping cost to prevent user confusion.
 * Changes the color of the price to show it's been changed.
 */
function main() {
    const listings = filterForOnlySearchResults(document.getElementsByClassName("s-item"));

    for (const listing of listings) {
        try {
            updatePrices(listing, getCostsWithShipping(listing));
        }
        catch(err) {
            console.log("User Script Error: " + err);
            continue;
        }

        hideShipping(listing);
    }
}

/**
 * Filters the results which are part of an eBay search.
 *
 * @param {HTMLCollection} elements - The collection of elements to filter through.
 * @returns {Array} The elements which are part of an eBay search.
 */
function filterForOnlySearchResults(elements) {
    const searchResults = [];

    for (const result of elements) {
        if ("srp" === result.id.slice(0, 3)) {
            searchResults.push(result);
        }
    }

    return searchResults;
}

/**
 * Updates the prices of the listing in the DOM and changes their color.
 * This is destructive and the old price will be lost.
 *
 * @param {Element} listing - The eBay listing to update the prices.
 * @param {Array} prices - Numbers of the new prices to set in cents.
 *      (Ex: Bid price and Buy it now price)
 */
function updatePrices(listing, prices) {
    const priceElements = listing.getElementsByClassName("s-item__price");

    for (let i = priceElements.length - 1; i >= 0; i--) {
        const dollars = Math.round(prices[i]) / 100;

        priceElements[i].innerHTML = "$" + dollars.toFixed(2);
        priceElements[i].style.color = "#008000"; //Green
    }
}

/**
 * Gets the total costs of a listing with shipping included.
 *
 * @param {Element} listing - The eBay listing to calculate cost.
 * @returns {Array} Numbers of the total costs of the listing in cents.
 *      (Ex: Bid price and Buy it now price)
 */
function getCostsWithShipping(listing) {
    const costs = [];
    const prices = getPrices(listing);
    const shipping = getShipping(listing);

    for (const price of prices) {
        costs.push(price + shipping);
    }

    return costs;
}

/**
 * Gets the current base prices of a listing (excluding shipping).
 *
 * @param {Element} listing - The eBay listing to get the prices.
 * @return {Array} Numbers of the current base prices in cents.
 *      (Ex: Bid price and Buy it now price)
 */
function getPrices(listing) {
    const prices = [];
    const priceElements = listing.getElementsByClassName("s-item__price");

    for (const priceElement of priceElements) {
        const price = priceElement.innerHTML;
        const priceInDollars = Number(price.replace(/[^0-9.-]+/g,""));

        prices.push(priceInDollars * 100);
    }

    return prices;
}

/**
 * Gets the cost of shipping for a listing.
 *
 * @param {Element} listing - The eBay listing to get the shipping.
 * @return {number} The cost of shipping in cents.
 */
function getShipping(listing) {
    const shipping = listing.getElementsByClassName("s-item__shipping")[0].innerHTML;
    const priceInDollars = '+' === shipping[0] ? Number(shipping.replace(/[^0-9.-]+/g,"")) : 0;

    return priceInDollars * 100;
}

/**
 * Hides the shipping cost of a listing.
 * This modifies the CSS.
 *
 * @param {Element} listing - The eBay listing to hide shipping cost information.
 */
function hideShipping(listing) {
    const shipping = listing.getElementsByClassName("s-item__shipping s-item__logisticsCost")[0];

    shipping.style.visibility = "hidden";
}
