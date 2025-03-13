window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (
        (document.body.scrollTop > 105 ||
            document.documentElement.scrollTop > 105) &&
        window.innerWidth > 996
    ) {
        navbarScroll.classList.add("navbar-scroll");
        navbarScroll.style.top = "-115px";
    } else {
        navbarScroll.classList.remove("navbar-scroll");
        navbarScroll.style.top = "0";
    }
}

var menuMobileDropdown = document.getElementsByClassName("menu-item-link");
var i;

for (i = 0; i < menuMobileDropdown.length; i++) {
    menuMobileDropdown[i].addEventListener("click", function() {
        if (this.nextElementSibling.classList.contains("active")) {
            this.nextElementSibling.classList.remove("active");
            this.classList.remove("list-open");
        } else {
            this.nextElementSibling.classList.add("active");
            this.classList.add("list-open");
        }
    });
}

var mainCategoryDropdown = document.getElementsByClassName(
    "dropdown-links-item"
);

for (i = 0; i < mainCategoryDropdown.length; i++) {
    mainCategoryDropdown[i].addEventListener("click", function() {
        if (this.nextElementSibling.classList.contains("active")) {
            this.nextElementSibling.classList.remove("active");
            this.classList.remove("active-padding-list");
        } else {
            this.nextElementSibling.classList.add("active");
            this.classList.add("active-padding-list");
        }
    });
}
