# web-scripts
A collection of web scripts. I use these in Tampermonkey on Chrome. They may or may not work elsewhere.

Just drop the script you want below the UserScript section of a new Tampermonkey script. Don't forget to set @match or @include.

Example:
```JavaScript
// ==UserScript==
// @name         HelloWorld
// @namespace    http://github.com/temetvince/web-scripts
// @version      0.1
// @description  Hello world as an alert
// @author       Emmett Casey
// @match        https://www.google.com/
// @grant        none
// ==/UserScript==

main();

/**
 * Hello world as an alert.
 */
function main() {
    alert("Hello, world!");
}
```