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
    const { offsetWidth, offsetHeight } = el.parentNode;
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

export const toArray = v => Array.from(v);
