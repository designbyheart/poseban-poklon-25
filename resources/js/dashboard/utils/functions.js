// DOM helpers

/**
 *  Return offsetCoordinates
 * @param {HTMLElement} el
 */
export const getElCoordinates = el => ({
    left: el.offsetLeft,
    top: el.offsetTop
});

/**
 *
 * @param {HTMLElement} el
 * @param {String} ruleName
 */
export const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

/**
 * Convert given number to percentage in given dimension
 * @param {Number} n  Number to convert
 * @param {*} d Dimensions
 */
export const toPercentage = (n, d) => (n * 100) / d;
export const round = numb => Number(numb.toFixed(2));

/**
 *  Return offsetDimensions for specified parent
 * @param {HTMLElement} el
 */
export const getParentDimensions = el => {
    const { offsetWidth, offsetHeight } = el;
    return { offsetWidth, offsetHeight };
};
export const createElement = str => {
    const el = document.createElement("div");
    el.innerHTML = str;
    return el.firstElementChild;
};

export const insertAfter = (parent, el) => parent.appendChild(el);
export const on = (el, evt, fn, opts = {}) => {
    const delegatorFn = e =>
        e.target.matches(opts.target) && fn.call(e.target, e);
    el.addEventListener(
        evt,
        opts.target ? delegatorFn : fn,
        opts.options || false
    );
    if (opts.target) return delegatorFn;
};

// OTHERS
export const toArray = v => Array.from(v);

export function fileToBase64(file) {
    return new Promise(resolve => {
        var reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = function(event) {
            resolve(event.target.result);
        };

        // Convert data to base64
        if (file) reader.readAsDataURL(file);
    });
}
export const redirect = (url, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);
export const buildURLQuery = obj => {
    return Object.entries(obj)
        .map(pair => pair.map(encodeURIComponent).join("="))
        .join("&");
};

// Picks the key-value pairs corresponding to the given keys from an object
export const pick = (obj, arr) =>
    arr.reduce(
        (acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc),
        {}
    );
