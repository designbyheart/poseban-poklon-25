const on = (el, evt, fn, opts = {}) => {
    const delegatorFn = e =>
        e.target.matches(opts.target) && fn.call(e.target, e);
    el.addEventListener(
        evt,
        opts.target ? delegatorFn : fn,
        opts.options || false
    );
    if (opts.target) return delegatorFn;
};

const bodyElement = document.getElementsByClassName("has-background-light")[0];
const hamburger = document.getElementsByClassName("header-hamburger")[0];
const hamburgerMenu = document.getElementsByClassName(
    "header-menu-container"
)[0];
const navbarScroll = document.getElementById("navbar");
const mobileSearch = document.getElementsByClassName(
    "header-mobile-container"
)[0];
const mobileSearchBtn = document.getElementsByClassName("mobile-search")[0];
const mobileSearchBtnX = document.getElementsByClassName(
    "header-mobile-search-times"
)[0];

if (hamburger) {
    on(hamburger, "click", () => {
        hamburger.classList.toggle("is-times");
        hamburgerMenu.classList.toggle("is-active");
        navbarScroll.classList.toggle("overflow-scroll");
        bodyElement.classList.toggle("overflow-hidden");
    });
}

if (mobileSearchBtn) {
    on(mobileSearchBtn, "click", () => {
        mobileSearch.classList.add("is-active");
    });
}

if (mobileSearchBtnX) {
    on(mobileSearchBtnX, "click", () => {
        mobileSearch.classList.remove("is-active");
    });
}

const dropDownSidebar = document.getElementsByClassName(
    "cat-sidebar-dropdown"
)[0];
const dropDownCont = document.getElementsByClassName(
    "cat-sidebar-dropdown-list"
)[0];

if (dropDownSidebar) {
    on(dropDownSidebar, "click", () => {
        for (var i = 0; i < dropDownSidebar.length; i++) {
            dropDownCont[i].classList.toggle("is-open");
            dropDownCont[i].classList.toggle("is-none");
        }
    });
}
