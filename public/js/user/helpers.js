// help
export const nodeListToArray = nodeList => [...nodeList];

export function labelsTextToNumber(arr) {
  let temp = [];
  arr.forEach(string => {
    temp.push(parseInt(string.substring(0, string.length - 1)));
  });
  return temp;
}
/**
 * Adds an event listener to an element with the ability to use event delegation.
 * @param {Element} el
 * @param {String} evt
 * @param {Function} fn
 * @param {Object} opts
 */
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
/**
 * Removes an event listener from an element.
 * @param {Element} el
 * @param {String} evt
 * @param {Function} fn
 * @param {Object} opts
 */
export const off = (el, evt, fn, opts = false) =>
  el.removeEventListener(evt, fn, opts);

export const getTextContent = arr => arr.map(label => label.textContent);

export const take = (arr, n = 1) => arr.slice(0, n);

// Show an element
export const show = function(elem, visibleClass) {
  // Get the natural height of the element
  const getHeight = () => {
    elem.style.display = "block"; // Make it visible
    const height = elem.scrollHeight + "px"; // Get it's height
    elem.style.display = ""; //  Hide it again
    return height;
  };

  const height = getHeight(); // Get the natural height
  elem.classList.add(visibleClass); // Make the element visible
  elem.style.height = height; // Update the max-height

  // Once the transition is complete, remove the inline max-height so the content can scale responsively
  window.setTimeout(function() {
    elem.style.height = "";
  }, 350);
};

// Hide an element
export const hide = function(elem) {
  // Give the element a height to change from
  elem.style.height = elem.scrollHeight + "px";

  // Set the height back to 0
  window.setTimeout(function() {
    elem.style.height = "0";
  }, 1);

  // When the transition is complete, hide it
  window.setTimeout(function() {
    elem.classList.remove("nav-visible");
  }, 350);
};

export const windowWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

export const setStyle = (el, ruleName, val) => (el.style[ruleName] = val);

export function loadJSON(callback, path) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", path, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
