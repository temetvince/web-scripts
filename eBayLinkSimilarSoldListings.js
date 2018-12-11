main();

/**
 * Updates all eBay search results to include a hyperlink to previously sold postings.
 */
function main() {
    const listings = filterForOnlySearchResults(document.getElementsByClassName("s-item"));

    for (const listing of listings) {
        const displayText = "View similar sold items";
        const url = getSearchUrl(listing);
        const soldListings = createSoldListingsLink(displayText, url);

        listing.getElementsByClassName("s-item__details clearfix")[0].appendChild(soldListings);
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
 * Constructs a url which will open a new eBay search using the title of the given listing.
 *
 * @param {Element} listing - The eBay listing to construct a new search url from.
 * @return {string} The url for a new eBay search.
 */
function getSearchUrl(listing) {
    const title = getTitle(listing);
    const searchString = getSearchString(title);

    return "https://www.ebay.com/sch/i.html?_from=R40&LH_Complete=1&LH_Sold=1&_ipg=200&_nkw=" + searchString;
}

/**
 * Gets the actual title of a given listing (sometimes eBay includes more than just the title the listing's title).
 *
 * @param {Element} listing - The eBay listing to get the actual title.
 * @return {string} The actual title with any extra eBay stuff removed.
 */
function getTitle(listing) {
    const fullTitle = listing.getElementsByClassName("s-item__title")[0].innerText;
    const newLineIndex = fullTitle.indexOf("\n");
    const actualTitle = fullTitle.substring(newLineIndex, fullTitle.length);

    return actualTitle;
}

/**
 * Gets a string that can be used in an eBay search url from a given string.
 *
 * @param {string} search - The string to search in normal space delminited English (Eg: "vintage watch").
 * @return {string} A string that can be used in an eBay search url (Eg: vintage+watch).
 */
function getSearchString(search) {
    let searchString = "";
    const tokens = search.split(" ");

    for (let i = 0; i < tokens.length; ++i) {
        if(i != tokens.length - 1) {
            searchString += tokens[i] + "+";
        }
        else {
            searchString += tokens[i];
        }
    }

    return searchString;
}

/**
 * Constructs a div that can be clicked as a hyperlink.
 *
 * @param {string} displayText - The text that will display to the user.
 * @param {string} url - The url which will open when the displayText is clicked.
 * @return {Element} A div that has a clickable hyperlink.
 */
function createSoldListingsLink(displayText, url) {
    const link = document.createElement("a");
    link.href = url;
    link.innerHTML = displayText;

    const linkContainer = document.createElement("span");
    linkContainer.className = "s-item__similar-items s-item__similarItemsInfo";
    linkContainer.appendChild(link);

    const parentContainer = document.createElement("div");
    parentContainer.className = "s-item__detail s-item__detail--primary";
    parentContainer.appendChild(linkContainer);

    return parentContainer;
}
