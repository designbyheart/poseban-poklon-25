(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    placeholder: {
      type: String,
      "default": 'Search..'
    },
    data: {
      type: Object,
      required: true
    },
    showAction: {
      type: Boolean,
      "default": false
    },
    inputClassses: {
      type: [String, Object, Array]
    },
    autoFocus: {
      type: Boolean,
      "default": false
    },
    showPinned: {
      type: Boolean,
      "default": false
    },
    backgroundOverlay: {
      type: Boolean,
      "default": false
    },
    searchLimit: {
      type: Number,
      "default": 10
    }
  },
  data: function data() {
    return {
      searchQuery: '',
      filteredData: [],
      currentSelected: -1,
      inputFocused: false,
      insideSuggestions: false
    };
  },
  watch: {
    // UPDATE SUGGESTIONS LIST
    searchQuery: function searchQuery(val) {
      var _this = this;
      if (val == '') {
        this.inputInit();
        if (this.bodyOverlay) this.$store.commit('TOGGLE_CONTENT_OVERLAY', false);
      } else {
        if (this.backgroundOverlay && !this.bodyOverlay) this.$store.commit('TOGGLE_CONTENT_OVERLAY', true);
        var exactEle = this.data.data.filter(function (item) {
          var _item$label, _this$searchQuery;
          return item === null || item === void 0 || (_item$label = item.label) === null || _item$label === void 0 ? void 0 : _item$label.toLowerCase().startsWith((_this$searchQuery = _this.searchQuery) === null || _this$searchQuery === void 0 ? void 0 : _this$searchQuery.toLowerCase());
        });
        var containEle = this.data.data.filter(function (item) {
          var _item$label2, _this$searchQuery2, _item$label3;
          return !(item !== null && item !== void 0 && (_item$label2 = item.label) !== null && _item$label2 !== void 0 && _item$label2.toLowerCase().startsWith((_this$searchQuery2 = _this.searchQuery) === null || _this$searchQuery2 === void 0 ? void 0 : _this$searchQuery2.toLowerCase())) && (item === null || item === void 0 || (_item$label3 = item.label) === null || _item$label3 === void 0 ? void 0 : _item$label3.toLowerCase().indexOf(_this.searchQuery.toLowerCase())) > -1;
        });
        this.filteredData = exactEle.concat(containEle).slice(0, this.searchLimit);
        if (!this.filteredData[0]) this.currentSelected = -1;
      }

      // ADD: No result found
      if (!this.filteredData.length && this.searchQuery) {
        this.filteredData = [{
          highlightAction: false,
          index: -1,
          label: 'No results found.',
          labelIcon: 'AlertCircleIcon',
          url: null
        }];
      }
    },
    autoFocus: function autoFocus(val) {
      if (val) this.focusInput();else this.searchQuery = '';
    },
    filteredData: function filteredData() {
      this.currentSelected = 0;

      // Prevent selecting if first item in list dont have url e.g. 'No Reult'
      if (this.filteredData[0]) {
        if (!this.filteredData[0].url) {
          this.currentSelected = -1;
        }
      }
    }
  },
  computed: {
    bodyOverlay: function bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    actionClasses: function actionClasses() {
      var _this2 = this;
      return function (isHighlighted) {
        if (isHighlighted) return "stroke-current text-".concat(_this2.data.highlightColor);
      };
    }
  },
  methods: {
    escPressed: function escPressed() {
      this.$emit('closeSearchbar');
      this.searchQuery = '';
      this.filteredData = [];
    },
    inputInit: function inputInit() {
      if (this.showPinned) {
        var starredData = this.data.data.filter(function (item) {
          return item.highlightAction;
        });
        this.filteredData = starredData;
      } else {
        this.filteredData = [];
      }
    },
    updateInputFocus: function updateInputFocus() {
      var _this3 = this;
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (val) {
        if (this.searchQuery == '') this.inputInit();
        setTimeout(function () {
          _this3.inputFocused = true;
        }, 100);
      } else {
        if (this.insideSuggestions) return;
        setTimeout(function () {
          _this3.inputFocused = false;
        }, 100);
        this.escPressed();
      }
    },
    suggestionSelected: function suggestionSelected() {
      if (this.bodyOverlay && this.filteredData[0].url) this.$store.commit('TOGGLE_CONTENT_OVERLAY', false);
      if (this.filteredData.length) {
        if (this.filteredData[0].url) {
          this.searchQuery = '';
          if (this.currentSelected >= 0) this.$emit('selected', this.filteredData[this.currentSelected]);else this.$emit('selected', this.filteredData[0]);
          this.filteredData = [];
        }
      }
    },
    actionClicked: function actionClicked() {
      this.$emit('actionClicked', this.filteredData[this.currentSelected]);
      if (!this.filteredData[this.currentSelected].highlightAction) this.filteredData.splice(this.currentSelected, 1);
    },
    increaseIndex: function increaseIndex() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!val && this.currentSelected > 0) this.currentSelected--;else if (val && this.currentSelected < this.filteredData.length - 1 && this.filteredData[this.currentSelected + 1].index > -1) this.currentSelected++;
      this.fixScrolling();
    },
    focusInput: function focusInput() {
      this.$refs.input.$el.querySelector('input').focus();
    },
    fixScrolling: function fixScrolling() {
      if (this.currentSelected > 0) {
        var liH = this.$refs.option[this.currentSelected].clientHeight;
        var ulH = this.$refs.scrollContainer.clientHeight;
        if (ulH - liH * this.currentSelected < liH) {
          this.$refs.scrollContainer.scrollTop = Math.round((this.currentSelected + 1 - ulH / liH + 1) * liH);
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.autoFocus) this.focusInput();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_vx_auto_suggest_VxAutoSuggest_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/vx-auto-suggest/VxAutoSuggest.vue */ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-perfect-scrollbar */ "./node_modules/vue-perfect-scrollbar/dist/index.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      "default": "#fff"
    }
  },
  data: function data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: '',
      showFullSearch: false,
      unreadNotifications: [{
        index: 0,
        title: 'New Message',
        msg: 'Are your going to meet me tonight?',
        icon: 'MessageSquareIcon',
        time: this.randomDate({
          sec: 10
        }),
        category: 'primary'
      }, {
        index: 1,
        title: 'New Order Recieved',
        msg: 'You got new order of goods.',
        icon: 'PackageIcon',
        time: this.randomDate({
          sec: 40
        }),
        category: 'success'
      }, {
        index: 2,
        title: 'Server Limit Reached!',
        msg: 'Server have 99% CPU usage.',
        icon: 'AlertOctagonIcon',
        time: this.randomDate({
          min: 1
        }),
        category: 'danger'
      }, {
        index: 3,
        title: 'New Mail From Peter',
        msg: 'Cake sesame snaps cupcake',
        icon: 'MailIcon',
        time: this.randomDate({
          min: 6
        }),
        category: 'primary'
      }, {
        index: 4,
        title: 'Bruce\'s Party',
        msg: 'Chocolate cake oat cake tiramisu',
        icon: 'CalendarIcon',
        time: this.randomDate({
          hr: 2
        }),
        category: 'warning'
      }],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false,
      user: this.$store.state.AppActiveUser,
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
  },
  watch: {
    '$route': function $route() {
      if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false;
    },
    '$store.state.AppActiveUser': function $storeStateAppActiveUser() {
      this.user = this.$store.state.AppActiveUser;
    }
  },
  computed: {
    // HELPER
    sidebarWidth: function sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint: function breakpoint() {
      return this.$store.state.breakpoint;
    },
    // NAVBAR STYLE
    classObj: function classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";else if (this.sidebarWidth == "reduced") return "navbar-reduced";else if (this.sidebarWidth) return "navbar-full";
    },
    // BOOKMARK & SEARCH
    data: function data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages: function starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get: function get() {
        return this.starredPages.slice(0, 10);
      },
      set: function set(list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list);
      }
    },
    starredPagesMore: {
      get: function get() {
        return this.starredPages.slice(10);
      },
      set: function set(list) {
        this.$store.dispatch('arrangeStarredPagesMore', list);
      }
    },
    userTextAvatar: function userTextAvatar() {
      return this.user.name.charAt(0);
    }
  },
  methods: {
    showSidebar: function showSidebar() {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
    },
    selected: function selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    actionClicked: function actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch: function showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar: function showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime: function elapsedTime(startTime) {
      var x = new Date(startTime);
      var now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;
      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);
      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);
      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);
      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);
      var years = timeDiff;
      if (years > 0) {
        return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
      } else if (days > 0) {
        return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
      } else if (hours > 0) {
        return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? " sec ago" : 'just now');
      }
      return 'Just Now';
    },
    outside: function outside() {
      this.showBookmarkPagesDropdown = false;
    },
    // Method for creating dummy notification time
    randomDate: function randomDate(_ref) {
      var hr = _ref.hr,
        min = _ref.min,
        sec = _ref.sec;
      var date = new Date();
      if (hr) date.setHours(date.getHours() - hr);
      if (min) date.setMinutes(date.getMinutes() - min);
      if (sec) date.setSeconds(date.getSeconds() - sec);
      return date;
    },
    logout: function logout() {
      document.querySelector('form[name="logout"]').submit();
    }
  },
  directives: {
    'click-outside': {
      bind: function bind(el, binding) {
        var bubble = binding.modifiers.bubble;
        var handler = function handler(e) {
          if (bubble || !el.contains(e.target) && el !== e.target) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener('click', handler);
      },
      unbind: function unbind(el) {
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    VxAutoSuggest: _components_vx_auto_suggest_VxAutoSuggest_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    VuePerfectScrollbar: vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_1___default.a,
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_2___default.a
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-perfect-scrollbar */ "./node_modules/vue-perfect-scrollbar/dist/index.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VxSidebarGroup_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VxSidebarGroup.vue */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue");
/* harmony import */ var _VxSidebarItem_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VxSidebarItem.vue */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue");



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vx-sidebar',
  props: {
    sidebarItems: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    parent: {
      type: String
    },
    openGroupHover: {
      type: Boolean,
      "default": false
    },
    reduceNotRebound: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      clickNotClose: false,
      // disable close sidebar on outside click
      reduce: false,
      // determines if sidebar is reduce - component property
      showCloseButton: false,
      // show close button in smaller devices
      isMouseEnter: false,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 1,
        swipeEasing: true
      },
      windowWidth: window.innerWidth,
      //width of windows
      showShadowBottom: false
    };
  },
  computed: {
    isSidebarActive: {
      get: function get() {
        return this.$store.state.isSidebarActive;
      },
      set: function set(val) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', val);
      }
    },
    reduceSidebar: function reduceSidebar() {
      return Boolean(this.reduce && this.reduceButton);
    },
    reduceButton: {
      get: function get() {
        return this.$store.state.reduceButton;
      },
      set: function set(val) {
        this.$store.commit('TOGGLE_REDUCE_BUTTON', val);
      }
    },
    sidebarItemsMin: function sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin;
    },
    isGroupActive: function isGroupActive() {
      var _this = this;
      return function (sidebarItem) {
        var path = _this.$route.fullPath;
        var open = false;
        var _func = function func(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach(function (item) {
              if (path == item.url) {
                open = true;
              } else if (item.submenu) {
                _func(item);
              }
            });
          }
        };
        _func(sidebarItem);
        return open;
      };
    }
  },
  watch: {
    reduce: function reduce(val) {
      if (val == true) {
        this.$store.dispatch('updateSidebarWidth', 'reduced');
      } else {
        this.$store.dispatch('updateSidebarWidth', 'default');
      }
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    },
    reduceButton: function reduceButton() {
      this.setSidebarWidth();
    },
    '$route': function $route() {
      if (this.isSidebarActive && this.showCloseButton) this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false);
    }
  },
  methods: {
    sidebarMouseEntered: function sidebarMouseEntered() {
      if (this.reduce) this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', false);
      this.isMouseEnter = true;
    },
    sidebarMouseLeave: function sidebarMouseLeave() {
      if (this.reduce) {
        this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', true);
      }
      this.isMouseEnter = false;
    },
    toggleReduce: function toggleReduce(val) {
      this.reduceButton = val;
      this.setSidebarWidth();
    },
    handleWindowResize: function handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth: function setSidebarWidth() {
      if (this.windowWidth < 1200) {
        if (this.windowWidth < 992) this.$store.commit('UPDATE_WINDOW_BREAKPOINT', 'md');else this.$store.commit('UPDATE_WINDOW_BREAKPOINT', 'lg');
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false);
        if (this.reduceButton) this.reduce = false;
        // this.reduceButton = false;
        this.showCloseButton = true;
        this.clickNotClose = false;
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar');
        this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', false);
      } else {
        this.$store.commit('UPDATE_WINDOW_BREAKPOINT', 'xl');
        if (this.reduceButton) this.reduce = true;else this.reduce = false;
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
        if (this.reduceButton && !this.isMouseEnter) this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', true);else this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', false);
        this.clickNotClose = true;
        this.showCloseButton = false;
        if (this.reduceSidebar) this.$store.dispatch('updateSidebarWidth', 'reduced');else this.$store.dispatch('updateSidebarWidth', 'default');
      }
    },
    psSectionScroll: function psSectionScroll() {
      if (this.$refs.mainSidebarPs.$el.scrollTop > 0) this.showShadowBottom = true;else this.showShadowBottom = false;
    },
    onSwipeLeft: function onSwipeLeft() {
      if (this.isSidebarActive && this.showCloseButton) this.isSidebarActive = false;
    },
    onSwipeRightSidebarSwipeArea: function onSwipeRightSidebarSwipeArea() {
      if (!this.isSidebarActive && this.showCloseButton) this.isSidebarActive = true;
    }
  },
  components: {
    VxSidebarGroup: _VxSidebarGroup_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    VxSidebarItem: _VxSidebarItem_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    VuePerfectScrollbar: vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  mounted: function mounted() {
    var _this2 = this;
    this.$nextTick(function () {
      window.addEventListener('resize', _this2.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VxSidebarItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VxSidebarItem.vue */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vx-sidebar-group',
  props: {
    openHover: {
      "default": false,
      type: Boolean
    },
    open: {
      "default": false,
      type: Boolean
    },
    group: {
      type: Object
    },
    groupIndex: {
      type: Number
    }
  },
  data: function data() {
    return {
      maxHeight: '0px',
      openItems: false
    };
  },
  computed: {
    sidebarItemsMin: function sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin;
    },
    styleItems: function styleItems() {
      return {
        maxHeight: this.maxHeight
      };
    },
    itemIcon: function itemIcon() {
      return function (index) {
        if (!((index.match(/\./g) || []).length > 1)) return "CircleIcon";
      };
    },
    isGroupActive: function isGroupActive() {
      var _this = this;
      return function (sidebarItem) {
        var path = _this.$route.fullPath;
        var open = false;
        var _func = function func(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach(function (item) {
              if (path == item.url) {
                open = true;
              } else if (item.submenu) {
                _func(item);
              }
            });
          }
        };
        _func(sidebarItem);
        return open;
      };
    }
  },
  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    '$route': function $route() {
      var _this2 = this;
      if (this.sidebarItemsMin) return;
      var scrollHeight = this.scrollHeight;
      if (this.openItems && !this.open) {
        this.maxHeight = "".concat(scrollHeight, "px");
        setTimeout(function () {
          _this2.maxHeight = "".concat(0, "px");
        }, 50);
      } else if (this.open) {
        this.maxHeight = "".concat(scrollHeight, "px");
        setTimeout(function () {
          _this2.maxHeight = 'none';
        }, 300);
      }
    },
    maxHeight: function maxHeight() {
      this.openItems = this.maxHeight != '0px';
    },
    // OPEN AND CLOSES DROPDOWN MENU ON SIDEBAR COLLAPSE AND DEFAULT VIEW
    '$store.state.sidebarItemsMin': function $storeStateSidebarItemsMin(val) {
      var _this3 = this;
      var scrollHeight = this.$refs.items.scrollHeight;
      if (!val && this.open) {
        this.maxHeight = "".concat(scrollHeight, "px");
        setTimeout(function () {
          _this3.maxHeight = 'none';
        }, 300);
      } else {
        this.maxHeight = "".concat(scrollHeight, "px");
        setTimeout(function () {
          _this3.maxHeight = '0px';
        }, 50);
      }
      if (val && this.open) {
        this.maxHeight = "".concat(scrollHeight, "px");
        setTimeout(function () {
          _this3.maxHeight = '0px';
        }, 250);
      }
    }
  },
  methods: {
    clickGroup: function clickGroup() {
      var _this4 = this;
      if (!this.openHover) {
        var thisScrollHeight = this.$refs.items.scrollHeight;
        if (this.maxHeight == '0px') {
          this.maxHeight = "".concat(thisScrollHeight, "px");
          setTimeout(function () {
            _this4.maxHeight = 'none';
          }, 300);
        } else {
          this.maxHeight = "".concat(thisScrollHeight, "px");
          setTimeout(function () {
            _this4.maxHeight = "".concat(0, "px");
          }, 50);
        }
        this.$parent.$children.map(function (child) {
          if (child.isGroupActive) {
            if (child !== _this4 && !child.open && child.maxHeight != '0px') {
              setTimeout(function () {
                child.maxHeight = "".concat(0, "px");
              }, 50);
            }
          }
        });
      }
    },
    mouseover: function mouseover() {
      if (this.openHover) {
        var scrollHeight = this.$refs.items.scrollHeight;
        this.maxHeight = "".concat(scrollHeight, "px");
      }
    },
    mouseout: function mouseout() {
      if (this.openHover) {
        var scrollHeight = 0;
        this.maxHeight = "".concat(scrollHeight, "px");
      }
    }
  },
  components: {
    VxSidebarItem: _VxSidebarItem_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mounted: function mounted() {
    this.openItems = this.open;
    if (this.open) {
      this.maxHeight = 'none';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VxSidebarItem',
  props: {
    icon: {
      "default": "",
      type: String
    },
    iconSmall: {
      "default": false,
      type: Boolean
    },
    iconPack: {
      "default": 'material-icons',
      type: String
    },
    href: {
      "default": '#',
      type: String
    },
    to: {
      "default": null,
      type: String
    },
    slug: {
      "default": null,
      type: String
    },
    index: {
      "default": null,
      type: [String, Number]
    },
    featherIcon: {
      "default": true,
      type: Boolean
    },
    target: {
      "default": '_self',
      type: String
    },
    isDisabled: {
      "default": false,
      type: Boolean
    }
  },
  data: function data() {
    return {
      activeLink: false
    };
  },
  watch: {
    '$route': function $route() {
      this.CheckIsActive();
    }
  },
  methods: {
    CheckIsActive: function CheckIsActive() {
      if (this.to) {
        if (this.to == this.$router.path && this.to || this.$route.meta.parent == this.slug) this.activeLink = true;else this.activeLink = false;
        // if (this.$route.path.slice(1).includes(this.to.slice(1)) && this.to.slice(1)) this.activeLink = true
        // else this.activeLink = false
      }
    }
  },
  updated: function updated() {
    this.CheckIsActive();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/main/Main.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/main/Main.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_components_vx_sidebar_VxSidebar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/layouts/components/vx-sidebar/VxSidebar.vue */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue");
/* harmony import */ var _components_TheNavbar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/TheNavbar.vue */ "./resources/js/dashboard/layouts/components/TheNavbar.vue");
/* harmony import */ var _components_TheFooter_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/TheFooter.vue */ "./resources/js/dashboard/layouts/components/TheFooter.vue");
/* harmony import */ var _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/../themeConfig.js */ "./resources/js/themeConfig.js");
/* harmony import */ var _layouts_components_vx_sidebar_sidebarItems_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/layouts/components/vx-sidebar/sidebarItems.js */ "./resources/js/dashboard/layouts/components/vx-sidebar/sidebarItems.js");
/* harmony import */ var vue_backtotop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-backtotop */ "./node_modules/vue-backtotop/src/main.js");






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      navbarType: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].navbarType || 'floating',
      navbarColor: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].navbarColor || '#fff',
      footerType: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].footerType || 'static',
      routerTransition: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].routerTransition || 'none',
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      sidebarItems: _layouts_components_vx_sidebar_sidebarItems_js__WEBPACK_IMPORTED_MODULE_4__["default"],
      disableCustomizer: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].disableCustomizer,
      windowWidth: window.innerWidth,
      //width of windows
      hideScrollToTop: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].hideScrollToTop,
      disableThemeTour: _themeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"].disableThemeTour
    };
  },
  watch: {
    '$route': function $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark: function isThemeDark(val) {
      if (this.navbarColor == "#fff" && val) {
        this.updateNavbarColor("#10163a");
      } else {
        this.updateNavbarColor("#fff");
      }
    }
  },
  computed: {
    isAppPage: function isAppPage() {
      if (this.$route.path.includes('/apps/')) return true;else return false;
    },
    isThemeDark: function isThemeDark() {
      return this.$store.state.theme == 'dark';
    },
    sidebarWidth: function sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    bodyOverlay: function bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass: function contentAreaClass() {
      if (this.sidebarWidth == "default") return "content-area-default";else if (this.sidebarWidth == "reduced") return "content-area-reduced";else if (this.sidebarWidth) return "content-area-full";
    },
    navbarClasses: function navbarClasses() {
      return {
        'navbar-hidden': this.navbarType == 'hidden',
        'navbar-sticky': this.navbarType == 'sticky',
        'navbar-static': this.navbarType == 'static',
        'navbar-floating': this.navbarType == 'floating'
      };
    },
    footerClasses: function footerClasses() {
      return {
        'footer-hidden': this.footerType == 'hidden',
        'footer-sticky': this.footerType == 'sticky',
        'footer-static': this.footerType == 'static'
      };
    }
  },
  methods: {
    changeRouteTitle: function changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbarColor: function updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false;else this.isNavbarDark = true;
    },
    handleWindowResize: function handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth: function setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false);
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar');
        this.disableThemeTour = true;
      } else if (this.windowWidth < 1200) {
        this.$store.dispatch('updateSidebarWidth', 'reduced');
      } else {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
      }
    },
    toggleHideScrollToTop: function toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  },
  components: {
    VxSidebar: _layouts_components_vx_sidebar_VxSidebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    TheNavbar: _components_TheNavbar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    TheFooter: _components_TheFooter_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    BackToTop: vue_backtotop__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  created: function created() {
    this.setSidebarWidth();
    if (this.navbarColor == "#fff" && this.isThemeDark) {
      this.updateNavbarColor("#10163a");
    } else {
      this.updateNavbarColor(this.navbarColor);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=template&id=3143caf5":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=template&id=3143caf5 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "vx-auto-suggest"
  }, [_c("div", {
    staticClass: "flex items-center relative"
  }, [_c("vs-input", {
    ref: "input",
    staticClass: "z-50",
    "class": _vm.inputClassses,
    attrs: {
      placeholder: _vm.placeholder,
      "icon-pack": "feather",
      icon: "icon-search",
      "icon-no-border": ""
    },
    on: {
      keyup: [function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) return null;
        return _vm.escPressed.apply(null, arguments);
      }, function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) return null;
        return _vm.increaseIndex(false);
      }, function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) return null;
        return _vm.increaseIndex.apply(null, arguments);
      }, function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.suggestionSelected.apply(null, arguments);
      }],
      focus: _vm.updateInputFocus,
      blur: function blur($event) {
        return _vm.updateInputFocus(false);
      }
    },
    model: {
      value: _vm.searchQuery,
      callback: function callback($$v) {
        _vm.searchQuery = $$v;
      },
      expression: "searchQuery"
    }
  })], 1), _vm._v(" "), _c("ul", {
    ref: "scrollContainer",
    staticClass: "auto-suggest-suggestions-list z-50 rounded-lg mt-2 shadow-lg overflow-hidden",
    "class": {
      hidden: !_vm.inputFocused
    },
    attrs: {
      tabindex: "-1"
    },
    on: {
      mouseenter: function mouseenter($event) {
        _vm.insideSuggestions = true;
      },
      mouseleave: function mouseleave($event) {
        _vm.insideSuggestions = false;
      },
      focus: _vm.updateInputFocus,
      blur: function blur($event) {
        return _vm.updateInputFocus(false);
      }
    }
  }, _vm._l(_vm.filteredData, function (suggestion, index) {
    return _c("li", {
      key: index,
      ref: "option",
      refInFor: true,
      staticClass: "auto-suggest__suggestion flex items-center justify-between py-3 cursor-pointer",
      "class": {
        "vx-auto-suggest__current-selected": _vm.currentSelected == index,
        "pointer-events-none": suggestion.index < 0
      },
      on: {
        mouseenter: function mouseenter($event) {
          _vm.currentSelected = index;
        },
        click: _vm.suggestionSelected
      }
    }, [_c("div", {
      staticClass: "flex items-center"
    }, [_c("feather-icon", {
      staticClass: "mr-4",
      attrs: {
        icon: suggestion.labelIcon,
        svgClasses: "h-5 w-5"
      }
    }), _vm._v(" "), _c("span", [_vm._v(_vm._s(suggestion.label))])], 1), _vm._v(" "), _vm.showAction ? _c("feather-icon", {
      attrs: {
        icon: _vm.data.actionIcon,
        svgClasses: [_vm.actionClasses(suggestion.highlightAction), "h-5 w-5"]
      },
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return _vm.actionClicked.apply(null, arguments);
        }
      }
    }) : _vm._e()], 1);
  }), 0)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=template&id=b808be1c&functional=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=template&id=b808be1c&functional=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render(_c, _vm) {
  return _c("footer", {
    staticClass: "the-footer flex-wrap justify-between",
    "class": _vm.classes
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=template&id=42adc4e7":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=template&id=42adc4e7 ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "relative"
  }, [_c("div", {
    staticClass: "vx-navbar-wrapper"
  }, [_c("vs-navbar", {
    staticClass: "vx-navbar navbar-custom",
    "class": _vm.classObj,
    attrs: {
      color: _vm.navbarColor
    }
  }, [_c("feather-icon", {
    staticClass: "sm:inline-flex xl:hidden cursor-pointer mr-1",
    attrs: {
      icon: "MenuIcon"
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.showSidebar.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _c("vs-spacer"), _vm._v(" "), _c("div", {
    staticClass: "the-navbar__user-meta flex items-center ml-2"
  }, [_c("div", {
    staticClass: "text-right leading-tight hidden sm:block"
  }, [_c("p", {
    staticClass: "font-semibold"
  }, [_vm._v(_vm._s(_vm.user.name))]), _vm._v(" "), _c("small")]), _vm._v(" "), _c("vs-dropdown", {
    staticClass: "cursor-pointer",
    attrs: {
      "vs-custom-content": "",
      "vs-trigger-click": ""
    }
  }, [_c("div", {
    staticClass: "con-img ml-3"
  }, [_c("div", {
    staticClass: "rounded-full shadow-md cursor-pointer flex justify-center items-center w-12 h-12"
  }, [_c("h1", {
    staticClass: "text-primary"
  }, [_vm._v(_vm._s(_vm.userTextAvatar))])])]), _vm._v(" "), _c("vs-dropdown-menu", {
    staticClass: "vx-navbar-dropdown"
  }, [_c("ul", {
    staticStyle: {
      "min-width": "9rem"
    }
  }, [_c("li", {
    staticClass: "flex py-2 px-4 cursor-pointer"
  }, [_c("a", {
    attrs: {
      href: "/profile/edit"
    }
  }, [_c("feather-icon", {
    attrs: {
      icon: "UserIcon",
      svgClasses: "w-4 h-4"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "ml-2"
  }, [_vm._v("Profile")])], 1)]), _vm._v(" "), _c("vs-divider", {
    staticClass: "m-1"
  }), _vm._v(" "), _c("form", {
    attrs: {
      name: "logout",
      action: "/logout",
      method: "post"
    }
  }, [_c("li", {
    staticClass: "flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white",
    on: {
      click: _vm.logout
    }
  }, [_c("feather-icon", {
    attrs: {
      icon: "LogOutIcon",
      svgClasses: "w-4 h-4"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "ml-2"
  }, [_vm._v("Logout")])], 1), _vm._v(" "), _c("input", {
    attrs: {
      type: "hidden",
      name: "_token"
    },
    domProps: {
      value: _vm.csrf
    }
  })])], 1)])], 1)], 1)], 1)], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=template&id=52fce9a6":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=template&id=52fce9a6 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "parentx"
  }, [_c("vs-sidebar", {
    directives: [{
      name: "hammer",
      rawName: "v-hammer:swipe.left",
      value: _vm.onSwipeLeft,
      expression: "onSwipeLeft",
      arg: "swipe",
      modifiers: {
        left: true
      }
    }],
    ref: "mainSidebar",
    staticClass: "sidebarx main-menu-sidebar items-no-padding",
    attrs: {
      parent: _vm.parent,
      hiddenBackground: _vm.clickNotClose,
      reduce: _vm.reduce,
      "default-index": "-1",
      "click-not-close": _vm.clickNotClose,
      "reduce-not-rebound": _vm.reduceNotRebound
    },
    model: {
      value: _vm.isSidebarActive,
      callback: function callback($$v) {
        _vm.isSidebarActive = $$v;
      },
      expression: "isSidebarActive"
    }
  }, [_c("div", {
    on: {
      mouseenter: _vm.sidebarMouseEntered,
      mouseleave: _vm.sidebarMouseLeave
    }
  }, [_c("div", {
    staticClass: "header-sidebar flex items-end justify-between",
    attrs: {
      slot: "header"
    },
    slot: "header"
  }, [_c("div", {
    staticClass: "logo flex items-center"
  }, [_c("a", {
    attrs: {
      href: "/"
    }
  }, [_vm.logo ? _c("img", {
    staticClass: "w-9/12 mr-4",
    attrs: {
      src: _vm.logo,
      alt: "logo"
    }
  }) : _vm._e()]), _vm._v(" "), _vm.title ? _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isMouseEnter || !_vm.reduce,
      expression: "isMouseEnter || !reduce"
    }],
    staticClass: "logo-text"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]), _vm._v(" "), _c("div", [_vm.showCloseButton ? [_c("feather-icon", {
    staticClass: "m-0 cursor-pointer",
    attrs: {
      icon: "XIcon"
    },
    on: {
      click: function click($event) {
        return _vm.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false);
      }
    }
  })] : _vm._e()], 2)]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showShadowBottom,
      expression: "showShadowBottom"
    }],
    staticClass: "shadow-bottom"
  }), _vm._v(" "), _c("VuePerfectScrollbar", {
    ref: "mainSidebarPs",
    staticClass: "scroll-area--main-sidebar pt-2",
    attrs: {
      settings: _vm.settings
    },
    on: {
      "ps-scroll-y": _vm.psSectionScroll
    }
  }, [_vm._l(_vm.sidebarItems, function (sidebarItem, index) {
    return _vm.$acl.check(sidebarItem.role) ? [sidebarItem.header && !_vm.sidebarItemsMin ? _c("span", {
      key: "header-".concat(index),
      staticClass: "navigation-header truncate"
    }, [_vm._v(_vm._s(sidebarItem.header))]) : !sidebarItem.header ? [!sidebarItem.submenu ? _c("vx-sidebar-item", {
      key: "sidebarItem-".concat(index),
      ref: "sidebarLink",
      refInFor: true,
      attrs: {
        index: index,
        to: sidebarItem.slug != "external" ? sidebarItem.url : "",
        href: sidebarItem.slug == "external" ? sidebarItem.url : "",
        icon: sidebarItem.icon,
        target: sidebarItem.target,
        isDisabled: sidebarItem.isDisabled,
        slug: sidebarItem.slug
      }
    }, [_c("span", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.sidebarItemsMin,
        expression: "!sidebarItemsMin"
      }],
      staticClass: "truncate"
    }, [_vm._v(_vm._s(_vm.$t(sidebarItem.name)))]), _vm._v(" "), sidebarItem.tag && (_vm.isMouseEnter || !_vm.reduce) ? _c("vs-chip", {
      staticClass: "ml-auto",
      attrs: {
        color: sidebarItem.tagColor
      }
    }, [_vm._v(_vm._s(sidebarItem.tag))]) : _vm._e()], 1) : [_c("vx-sidebar-group", {
      key: "group-".concat(index),
      ref: "sidebarGrp",
      refInFor: true,
      attrs: {
        openHover: _vm.openGroupHover,
        group: sidebarItem,
        groupIndex: index,
        open: _vm.isGroupActive(sidebarItem)
      }
    })]] : _vm._e()] : _vm._e();
  })], 2)], 1)]), _vm._v(" "), !_vm.isSidebarActive ? _c("div", {
    directives: [{
      name: "hammer",
      rawName: "v-hammer:swipe.right",
      value: _vm.onSwipeRightSidebarSwipeArea,
      expression: "onSwipeRightSidebarSwipeArea",
      arg: "swipe",
      modifiers: {
        right: true
      }
    }],
    staticClass: "sidebar-swipe-area",
    attrs: {
      id: "sidebar-swipe-area"
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=template&id=c37719ae":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=template&id=c37719ae ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "vs-sidebar-group",
    "class": [{
      "vs-sidebar-group-open": _vm.openItems
    }, {
      "vs-sidebar-group-active": _vm.open
    }, {
      "disabled-item pointer-events-none": _vm.group.isDisabled
    }],
    on: {
      mouseover: _vm.mouseover,
      mouseout: _vm.mouseout
    }
  }, [_c("div", {
    staticClass: "group-header w-full",
    on: {
      click: _vm.clickGroup
    }
  }, [_c("span", {
    staticClass: "flex items-center w-full"
  }, [_vm.group.icon || this.groupIndex > Math.floor(this.groupIndex) ? _c("feather-icon", {
    attrs: {
      icon: _vm.group.icon || "CircleIcon",
      svgClasses: {
        "w-3 h-3": this.groupIndex % 1 != 0
      }
    }
  }) : _vm._e(), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.sidebarItemsMin,
      expression: "!sidebarItemsMin"
    }],
    staticClass: "truncate mr-3 select-none"
  }, [_vm._v(_vm._s(_vm.$t(_vm.group.name)))]), _vm._v(" "), _vm.group.tag && !_vm.sidebarItemsMin ? _c("vs-chip", {
    staticClass: "ml-auto mr-4",
    attrs: {
      color: _vm.group.tagColor
    }
  }, [_vm._v(_vm._s(_vm.group.tag))]) : _vm._e()], 1), _vm._v(" "), _c("feather-icon", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.sidebarItemsMin,
      expression: "!sidebarItemsMin"
    }],
    "class": [{
      rotate90: _vm.openItems
    }, "feather-grp-header-arrow"],
    attrs: {
      icon: "ChevronRightIcon",
      "svg-classes": "w-4 h-4"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "vs-sidebar--tooltip"
  }, [_vm._v(_vm._s(_vm.group.name))])], 1), _vm._v(" "), _c("ul", {
    ref: "items",
    staticClass: "vs-sidebar-group-items",
    style: _vm.styleItems
  }, _vm._l(_vm.group.submenu, function (groupItem, index) {
    return _c("li", {
      key: index
    }, [groupItem.submenu ? _c("vx-sidebar-group", {
      attrs: {
        group: groupItem,
        groupIndex: Number("".concat(_vm.groupIndex, ".").concat(index)),
        open: _vm.isGroupActive(groupItem),
        openHover: _vm.openHover
      }
    }) : _c("vx-sidebar-item", {
      attrs: {
        index: _vm.groupIndex + "." + index,
        to: groupItem.url,
        icon: _vm.itemIcon(_vm.groupIndex + "." + index),
        slug: groupItem.slug,
        "icon-small": "",
        target: groupItem.target
      }
    }, [_c("span", {
      staticClass: "truncate"
    }, [_vm._v(_vm._s(_vm.$t(groupItem.name)))]), _vm._v(" "), groupItem.tag ? _c("vs-chip", {
      staticClass: "ml-auto",
      attrs: {
        color: groupItem.tagColor
      }
    }, [_vm._v(_vm._s(groupItem.tag))]) : _vm._e()], 1)], 1);
  }), 0)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=template&id=7c9e5f4e":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=template&id=7c9e5f4e ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "vs-sidebar--item",
    "class": [{
      "vs-sidebar-item-active": _vm.activeLink
    }, {
      "disabled-item pointer-events-none": _vm.isDisabled
    }]
  }, [_vm.to ? _c("router-link", {
    "class": [{
      "router-link-active": _vm.activeLink
    }],
    attrs: {
      to: _vm.to,
      target: _vm.target,
      exact: ""
    }
  }, [!_vm.featherIcon ? _c("vs-icon", {
    attrs: {
      "icon-pack": _vm.iconPack,
      icon: _vm.icon
    }
  }) : _c("feather-icon", {
    "class": {
      "w-3 h-3": _vm.iconSmall
    },
    attrs: {
      icon: _vm.icon
    }
  }), _vm._v(" "), _vm._t("default")], 2) : _c("a", {
    attrs: {
      target: _vm.target,
      href: _vm.href
    }
  }, [!_vm.featherIcon ? _c("vs-icon", {
    attrs: {
      "icon-pack": _vm.iconPack,
      icon: _vm.icon
    }
  }) : _c("feather-icon", {
    "class": {
      "w-3 h-3": _vm.iconSmall
    },
    attrs: {
      icon: _vm.icon
    }
  }), _vm._v(" "), _vm._t("default")], 2)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/main/Main.vue?vue&type=template&id=277097a0":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/main/Main.vue?vue&type=template&id=277097a0 ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "layout--main",
    "class": [_vm.navbarClasses, _vm.footerClasses, {
      "app-page": _vm.isAppPage
    }]
  }, [_c("vx-sidebar", {
    attrs: {
      sidebarItems: _vm.sidebarItems,
      logo: _vm.applicationParams.siteLogo,
      title: "",
      parent: ".layout--main"
    }
  }), _vm._v(" "), _c("div", {
    "class": [_vm.contentAreaClass, {
      "show-overlay": _vm.bodyOverlay
    }],
    attrs: {
      id: "content-area"
    }
  }, [_c("div", {
    attrs: {
      id: "content-overlay"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "content-wrapper"
  }, [_c("the-navbar", {
    "class": [{
      "text-white": _vm.isNavbarDark && !_vm.isThemeDark
    }, {
      "text-base": !_vm.isNavbarDark && _vm.isThemeDark
    }],
    attrs: {
      navbarColor: _vm.navbarColor
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "router-view"
  }, [_c("div", {
    staticClass: "router-content",
    "class": {
      "mt-0": _vm.navbarType == "hidden"
    }
  }, [_c("transition", {
    attrs: {
      name: _vm.routerTransition
    }
  }, [_vm.$route.meta.breadcrumb || _vm.$route.meta.pageTitle ? _c("div", {
    staticClass: "router-header flex flex-wrap items-center mb-6"
  }, [_c("div", {
    staticClass: "content-area__heading",
    "class": {
      "pr-4 border-0 md:border-r border-t-0 border-b-0 border-l-0 border-solid border-grey-light": _vm.$route.meta.breadcrumb
    }
  }, [_c("h2", {
    staticClass: "mb-1"
  }, [_vm._v(_vm._s(_vm.routeTitle))])]), _vm._v(" "), _vm.$route.meta.breadcrumb ? _c("vx-breadcrumb", {
    staticClass: "ml-4 md:block hidden",
    attrs: {
      route: _vm.$route
    }
  }) : _vm._e(), _vm._v(" "), _c("vs-dropdown", {
    staticClass: "ml-auto md:block hidden cursor-pointer",
    attrs: {
      "vs-trigger-click": ""
    }
  }, [_c("vs-button", {
    attrs: {
      radius: "",
      icon: "icon-settings",
      "icon-pack": "feather"
    }
  }), _vm._v(" "), _c("vs-dropdown-menu", {
    staticClass: "w-32"
  }, [_c("vs-dropdown-item", [_c("div", {
    staticClass: "flex items-center",
    on: {
      click: function click($event) {
        return _vm.$router.push("/pages/profile");
      }
    }
  }, [_c("feather-icon", {
    staticClass: "inline-block mr-2",
    attrs: {
      icon: "UserIcon",
      svgClasses: "w-4 h-4"
    }
  }), _vm._v(" "), _c("span", [_vm._v("Profile")])], 1)]), _vm._v(" "), _c("vs-dropdown-item", [_c("div", {
    staticClass: "flex items-center",
    on: {
      click: function click($event) {
        return _vm.$router.push("/apps/todo");
      }
    }
  }, [_c("feather-icon", {
    staticClass: "inline-block mr-2",
    attrs: {
      icon: "CheckSquareIcon",
      svgClasses: "w-4 h-4"
    }
  }), _vm._v(" "), _c("span", [_vm._v("Tasks")])], 1)]), _vm._v(" "), _c("vs-dropdown-item", [_c("div", {
    staticClass: "flex items-center",
    on: {
      click: function click($event) {
        return _vm.$router.push("/apps/email");
      }
    }
  }, [_c("feather-icon", {
    staticClass: "inline-block mr-2",
    attrs: {
      icon: "MailIcon",
      svgClasses: "w-4 h-4"
    }
  }), _vm._v(" "), _c("span", [_vm._v("Inbox")])], 1)])], 1)], 1)], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "content-area__content"
  }, [!_vm.hideScrollToTop ? _c("back-to-top", {
    attrs: {
      bottom: "5%",
      visibleoffset: "500"
    }
  }, [_c("vs-button", {
    staticClass: "shadow-lg",
    attrs: {
      "icon-pack": "feather",
      icon: "icon-arrow-up"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("transition", {
    attrs: {
      name: _vm.routerTransition,
      mode: "out-in"
    }
  }, [_c("router-view", {
    on: {
      changeRouteTitle: _vm.changeRouteTitle
    }
  })], 1)], 1)], 1)])], 1), _vm._v(" "), _c("the-footer")], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*=========================================================================================\n    File Name: vxAutoSuggest.scss\n    Description: Styles for vx-auto-suggest component. Imported in VxAutoSuggest.vue file\n    ----------------------------------------------------------------------------------------\n    Item Name: Vuesax Admin - VueJS Dashboard Admin Template\n      Author: Pixinvent\n    Author URL: http://www.themeforest.net/user/pixinvent\n==========================================================================================*/\n.vx-auto-suggest {\n  position: relative;\n}\n.vx-auto-suggest .vs-input .vs-con-input .vs-inputx {\n  z-index: 10;\n}\n.vx-auto-suggest .auto-suggest-suggestions-list {\n  position: absolute;\n  background: #fff;\n  width: 100%;\n}\n.vx-auto-suggest .auto-suggest-suggestions-list .auto-suggest__suggestion {\n  padding: 0.8rem 1rem;\n}\n.vx-auto-suggest .auto-suggest-suggestions-list .auto-suggest__suggestion.vx-auto-suggest__current-selected {\n  background: #F1F1F1;\n}\n.navbar-sticky .vx-auto-suggest .auto-suggest-suggestions-list {\n  margin-left: 0.5rem;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*=========================================================================================\n  File Name: vxSidebar.scss\n  Description: Styles for vx-sidebar component. Imported in VxSidebar.vue file\n  ----------------------------------------------------------------------------------------\n  Item Name: Vuesax Admin - VueJS Dashboard Admin Template\n  Author: Pixinvent\n  Author URL: http://www.themeforest.net/user/pixinvent\n==========================================================================================*/\n/*=========================================================================================\n    File Name: _variables.scss\n    Description: partial- SCSS varibales\n    ----------------------------------------------------------------------------------------\n    Item Name: Vuesax Admin - VueJS Dashboard Admin Template\n      Author: Pixinvent\n    Author URL: http://www.themeforest.net/user/pixinvent\n==========================================================================================*/\n/*========================================================\n        SPACING\n=========================================================*/\n/*========================================================\n        COLORS\n=========================================================*/\n/*========================================================\n        TYPOGRAPHY\n=========================================================*/\n/*========================================================\n        TYPOGRAPHY\n=========================================================*/\n/*========================================================\n        DARK THEME\n=========================================================*/\n.main-menu-sidebar {\n  white-space: nowrap;\n}\n.main-menu-sidebar .vs-sidebar--background {\n  z-index: 51000;\n}\n.main-menu-sidebar .vs-sidebar {\n  z-index: 51000;\n  position: fixed;\n}\n.main-menu-sidebar .vs-sidebar .vs-sidebar--items {\n  padding: 0;\n}\n.main-menu-sidebar .vs-sidebar.vs-sidebar-reduce {\n  max-width: 80px;\n}\n.main-menu-sidebar .vs-sidebar.vs-sidebar-reduce:hover {\n  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08) !important;\n}\n.main-menu-sidebar .vs-sidebar.vs-sidebar-reduce:hover:not(.vs-sidebar-reduceNotRebound):not(.vs-sidebar-reduceNotHoverExpand) .vs-sidebar-group .group-header i {\n  display: block;\n}\n.main-menu-sidebar .vs-sidebar.vs-sidebar-reduce .vs-sidebar-group .group-header i {\n  display: none;\n}\n.main-menu-sidebar .header-sidebar {\n  padding: 20px 19px 16px 23px;\n  width: 100%;\n}\n.main-menu-sidebar .header-sidebar .logo img {\n  padding: 4px 0;\n}\n.main-menu-sidebar .header-sidebar .logo .logo-text {\n  font-size: 22px;\n  font-weight: 600;\n  color: #7367F0;\n  animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;\n}\n.main-menu-sidebar .header-sidebar .feather-icon svg {\n  color: #7367F0;\n}\n.main-menu-sidebar .shadow-bottom {\n  position: absolute;\n  z-index: 2;\n  height: 60px;\n  width: 100%;\n  pointer-events: none;\n  margin-top: -1.3rem;\n  filter: blur(5px);\n  background: linear-gradient(rgb(255, 255, 255) 41%, rgba(255, 255, 255, 0.11) 95%, rgba(255, 255, 255, 0) 100%);\n}\n.main-menu-sidebar .scroll-area--main-sidebar {\n  position: relative;\n  margin: auto;\n  width: 100%;\n  height: calc(100vh - 69px);\n}\n.main-menu-sidebar .scroll-area--main-sidebar > .vs-sidebar-group {\n  padding: 0 15px;\n}\n.main-menu-sidebar .scroll-area--main-sidebar > .vs-sidebar--item {\n  padding: 0 15px;\n}\n.main-menu-sidebar .navigation-header {\n  font-size: 0.9rem;\n  display: block;\n  margin-top: 2rem;\n  margin-bottom: 0.8rem;\n  margin-left: 2.2rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  color: #999;\n}\n.main-menu-sidebar .feather-icon {\n  color: #565656;\n  margin-right: 14px;\n}\n.main-menu-sidebar .feather-icon .feather {\n  width: 20px;\n  height: 20px;\n}\n.main-menu-sidebar .con-vs-chip {\n  min-height: 24px;\n  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.1);\n}\n.main-menu-sidebar .con-vs-chip .vs-chip--text {\n  color: #fff;\n  font-size: 0.8rem;\n}\n.main-menu-sidebar .vs-sidebar--item {\n  transition: none;\n  overflow: visible !important;\n}\n.main-menu-sidebar .vs-sidebar--item:hover a {\n  color: inherit;\n}\n.main-menu-sidebar .vs-sidebar--item:hover a > * {\n  transform: translateX(5px);\n}\n.main-menu-sidebar .vs-sidebar--item.vs-sidebar-item-active {\n  border-right: none !important;\n  font-weight: 400;\n  z-index: 1;\n  position: relative;\n}\n.main-menu-sidebar .vs-sidebar--item a {\n  font-size: 1rem;\n  transition: none;\n  border-radius: 4px;\n  opacity: unset;\n  color: #626262;\n  padding: 10px 15px;\n}\n.main-menu-sidebar .vs-sidebar--item a > * {\n  transition: transform 0.25s ease;\n}\n.main-menu-sidebar .vs-sidebar--item a span {\n  font-size: 15px;\n}\n.main-menu-sidebar .vs-sidebar--item.disabled-item a span {\n  color: #e2e2e2;\n}\n.main-menu-sidebar .vs-sidebar--item .router-link-active {\n  background: linear-gradient(118deg, rgba(var(--vs-primary), 1), rgba(var(--vs-primary), 0.7));\n  font-weight: 400;\n  box-shadow: 0px 0px 10px 1px rgba(var(--vs-primary), 0.7);\n}\n.main-menu-sidebar .vs-sidebar--item .router-link-active .feather-icon {\n  color: #fff;\n}\n.main-menu-sidebar .vs-sidebar--item .router-link-active span {\n  color: #fff;\n}\n#sidebar-demo .vs-sidebar {\n  z-index: 52000;\n}\n#sidebar-demo .vs-sidebar-staticPosition {\n  z-index: 10000;\n}\n#sidebar-demo #parentx-demo-7 .parentx:not(.show-custom-sidebar) .vs-sidebar {\n  display: none;\n  z-index: 1 !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*=========================================================================================\n  File Name: vxSidebarGroup.scss\n  Description: Styles for vx-sidebar-group component. Imported in VxSidebarGroup.vue file\n  ----------------------------------------------------------------------------------------\n  Item Name: Vuesax Admin - VueJS Dashboard Admin Template\n  Author: Pixinvent\n  Author URL: http://www.themeforest.net/user/pixinvent\n==========================================================================================*/\n.vs-sidebar-group {\n  overflow: hidden;\n}\n.vs-sidebar-group .group-header {\n  transition: all 0.5s ease;\n  font-size: 15px;\n  padding: 10px 15px;\n  cursor: pointer;\n}\n.vs-sidebar-group .group-header .feather-grp-header-arrow {\n  position: absolute !important;\n  right: 8px;\n  top: 12px;\n  transition: all 0.2s ease-out;\n  transform: rotate(0deg);\n  display: inline-block;\n}\n.vs-sidebar-group .group-header .feather-grp-header-arrow.rotate90 {\n  transform: rotate(90deg);\n}\n.vs-sidebar-group .group-header > * {\n  transition: all 0.25s ease;\n}\n.vs-sidebar-group .group-header:hover > * {\n  transform: translateX(5px);\n}\n.vs-sidebar-group .group-header .con-vs-chip {\n  margin-bottom: 0;\n}\n.vs-sidebar-group .vs-icon {\n  font-size: 1.5rem;\n}\n.vs-sidebar-group:hover > .group-header {\n  transform: unset;\n}\n.vs-sidebar-group .vs-sidebar-group .group-header {\n  padding-left: 20px;\n}\n.vs-sidebar-group.vs-sidebar-group-open > .group-header {\n  cursor: pointer;\n  background: #f6f6f6;\n  border-radius: 6px;\n  margin-bottom: 7px;\n}\n.vs-sidebar-group.vs-sidebar-group-open > .vs-sidebar-group-items {\n  padding-left: 0;\n}\n.vs-sidebar-group.vs-sidebar-group-open > .vs-sidebar-group-items .vs-sidebar--item span {\n  padding-left: 2rem;\n  padding: 0;\n}\n.vs-sidebar-group.vs-sidebar-group-open > .vs-sidebar-group-items .vs-sidebar--item:last-child {\n  border-bottom: 0px;\n}\n.vs-sidebar-group.vs-sidebar-group-open .vs-sidebar-group {\n  overflow: visible;\n}\n.vs-sidebar-group.vs-sidebar-group-active > .group-header {\n  background: #f6f6f6;\n  border-radius: 6px;\n}\n.vs-sidebar-group .vs-sidebar-group-items {\n  opacity: 0;\n}\n.vs-sidebar-group .vs-sidebar-group-items .vs-sidebar--item a {\n  padding: 10px 15px 10px 20px;\n}\n.vs-sidebar-group .vs-sidebar-group-items .vs-sidebar--item a .feather-icon {\n  margin-right: 20px;\n}\n.vs-sidebar-group .vs-sidebar-group-items .vs-sidebar--item:last-child a {\n  margin-bottom: 0;\n}\n.vs-sidebar-group .vs-sidebar-group-items li:last-child {\n  padding-bottom: 7px;\n}\n.vs-sidebar-group .vs-sidebar-group-items .vs-sidebar-group span .feather-icon {\n  margin-right: 20px;\n}\n.vs-sidebar-group .vs-sidebar-group-items .vs-sidebar-group .feather-icon {\n  margin-right: 0px;\n}\n.vs-sidebar-group.disabled-item span {\n  color: #e2e2e2;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VxAutoSuggest_vue_vue_type_template_id_3143caf5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VxAutoSuggest.vue?vue&type=template&id=3143caf5 */ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=template&id=3143caf5");
/* harmony import */ var _VxAutoSuggest_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VxAutoSuggest.vue?vue&type=script&lang=js */ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _VxAutoSuggest_vue_vue_type_style_index_0_id_3143caf5_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss */ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VxAutoSuggest_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VxAutoSuggest_vue_vue_type_template_id_3143caf5__WEBPACK_IMPORTED_MODULE_0__["render"],
  _VxAutoSuggest_vue_vue_type_template_id_3143caf5__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxAutoSuggest.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss":
/*!**************************************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_style_index_0_id_3143caf5_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=style&index=0&id=3143caf5&lang=scss");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_style_index_0_id_3143caf5_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_style_index_0_id_3143caf5_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_style_index_0_id_3143caf5_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_style_index_0_id_3143caf5_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=template&id=3143caf5":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=template&id=3143caf5 ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_template_id_3143caf5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxAutoSuggest.vue?vue&type=template&id=3143caf5 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/vx-auto-suggest/VxAutoSuggest.vue?vue&type=template&id=3143caf5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_template_id_3143caf5__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxAutoSuggest_vue_vue_type_template_id_3143caf5__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/layouts/components/TheFooter.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/TheFooter.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TheFooter_vue_vue_type_template_id_b808be1c_functional_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheFooter.vue?vue&type=template&id=b808be1c&functional=true */ "./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=template&id=b808be1c&functional=true");
/* harmony import */ var _TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheFooter.vue?vue&type=script&lang=js */ "./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheFooter_vue_vue_type_template_id_b808be1c_functional_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _TheFooter_vue_vue_type_template_id_b808be1c_functional_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  true,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/layouts/components/TheFooter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TheFooter.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=template&id=b808be1c&functional=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=template&id=b808be1c&functional=true ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_b808be1c_functional_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TheFooter.vue?vue&type=template&id=b808be1c&functional=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheFooter.vue?vue&type=template&id=b808be1c&functional=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_b808be1c_functional_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_b808be1c_functional_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/layouts/components/TheNavbar.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/TheNavbar.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TheNavbar_vue_vue_type_template_id_42adc4e7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheNavbar.vue?vue&type=template&id=42adc4e7 */ "./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=template&id=42adc4e7");
/* harmony import */ var _TheNavbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheNavbar.vue?vue&type=script&lang=js */ "./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TheNavbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheNavbar_vue_vue_type_template_id_42adc4e7__WEBPACK_IMPORTED_MODULE_0__["render"],
  _TheNavbar_vue_vue_type_template_id_42adc4e7__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/layouts/components/TheNavbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheNavbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TheNavbar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheNavbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=template&id=42adc4e7":
/*!***********************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=template&id=42adc4e7 ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TheNavbar_vue_vue_type_template_id_42adc4e7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TheNavbar.vue?vue&type=template&id=42adc4e7 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/TheNavbar.vue?vue&type=template&id=42adc4e7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TheNavbar_vue_vue_type_template_id_42adc4e7__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TheNavbar_vue_vue_type_template_id_42adc4e7__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VxSidebar_vue_vue_type_template_id_52fce9a6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VxSidebar.vue?vue&type=template&id=52fce9a6 */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=template&id=52fce9a6");
/* harmony import */ var _VxSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VxSidebar.vue?vue&type=script&lang=js */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _VxSidebar_vue_vue_type_style_index_0_id_52fce9a6_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VxSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VxSidebar_vue_vue_type_template_id_52fce9a6__WEBPACK_IMPORTED_MODULE_0__["render"],
  _VxSidebar_vue_vue_type_template_id_52fce9a6__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_style_index_0_id_52fce9a6_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=style&index=0&id=52fce9a6&lang=scss");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_style_index_0_id_52fce9a6_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_style_index_0_id_52fce9a6_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_style_index_0_id_52fce9a6_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_style_index_0_id_52fce9a6_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=template&id=52fce9a6":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=template&id=52fce9a6 ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_template_id_52fce9a6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebar.vue?vue&type=template&id=52fce9a6 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebar.vue?vue&type=template&id=52fce9a6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_template_id_52fce9a6__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebar_vue_vue_type_template_id_52fce9a6__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue":
/*!*********************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VxSidebarGroup_vue_vue_type_template_id_c37719ae__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VxSidebarGroup.vue?vue&type=template&id=c37719ae */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=template&id=c37719ae");
/* harmony import */ var _VxSidebarGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VxSidebarGroup.vue?vue&type=script&lang=js */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _VxSidebarGroup_vue_vue_type_style_index_0_id_c37719ae_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VxSidebarGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VxSidebarGroup_vue_vue_type_template_id_c37719ae__WEBPACK_IMPORTED_MODULE_0__["render"],
  _VxSidebarGroup_vue_vue_type_template_id_c37719ae__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebarGroup.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss":
/*!******************************************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_style_index_0_id_c37719ae_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=style&index=0&id=c37719ae&lang=scss");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_style_index_0_id_c37719ae_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_style_index_0_id_c37719ae_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_style_index_0_id_c37719ae_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_style_index_0_id_c37719ae_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=template&id=c37719ae":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=template&id=c37719ae ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_template_id_c37719ae__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebarGroup.vue?vue&type=template&id=c37719ae */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarGroup.vue?vue&type=template&id=c37719ae");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_template_id_c37719ae__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarGroup_vue_vue_type_template_id_c37719ae__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VxSidebarItem_vue_vue_type_template_id_7c9e5f4e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VxSidebarItem.vue?vue&type=template&id=7c9e5f4e */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=template&id=7c9e5f4e");
/* harmony import */ var _VxSidebarItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VxSidebarItem.vue?vue&type=script&lang=js */ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VxSidebarItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VxSidebarItem_vue_vue_type_template_id_7c9e5f4e__WEBPACK_IMPORTED_MODULE_0__["render"],
  _VxSidebarItem_vue_vue_type_template_id_7c9e5f4e__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=script&lang=js":
/*!********************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebarItem.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=template&id=7c9e5f4e":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=template&id=7c9e5f4e ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarItem_vue_vue_type_template_id_7c9e5f4e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VxSidebarItem.vue?vue&type=template&id=7c9e5f4e */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/components/vx-sidebar/VxSidebarItem.vue?vue&type=template&id=7c9e5f4e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarItem_vue_vue_type_template_id_7c9e5f4e__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_VxSidebarItem_vue_vue_type_template_id_7c9e5f4e__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/layouts/components/vx-sidebar/sidebarItems.js":
/*!******************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/components/vx-sidebar/sidebarItems.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

/* harmony default export */ __webpack_exports__["default"] = ([{
  url: "/dashboard",
  name: "sidebar.home",
  slug: "home",
  icon: "HomeIcon",
  role: 'editor'
}, {
  url: "/store",
  name: "sidebar.store",
  slug: "store",
  icon: "ShoppingCartIcon",
  submenu: [{
    url: "/dashboard/products",
    name: "sidebar.products",
    slug: "products"
  }, {
    url: "/dashboard/producents",
    name: "sidebar.producents",
    slug: "producents"
  }, {
    url: "/dashboard/categories",
    name: "sidebar.categories",
    slug: "categories"
  }, {
    url: "/dashboard/filters",
    name: "sidebar.filters",
    slug: "filters"
  }, {
    url: "/dashboard/attributes",
    name: "sidebar.attributes",
    slug: "attributes"
  }, {
    url: "/dashboard/shipping_methods",
    name: "sidebar.shippingMethods",
    slug: "shipping_methods"
  }, {
    url: "/dashboard/payment_methods",
    name: "sidebar.paymentMethods",
    slug: "payment_methods"
  }, {
    url: "/dashboard/banners",
    name: "sidebar.banners",
    slug: "banners"
  }, {
    url: "/dashboard/coupons",
    name: "sidebar.coupons",
    slug: "coupons"
  }, {
    url: "/dashboard/promotions",
    name: "sidebar.promotions",
    slug: "promotions"
  }, {
    url: "/dashboard/gift_cards",
    name: "sidebar.giftCards",
    slug: "gift_cards"
  }],
  role: 'editor'
}, {
  url: "/sales",
  name: "sidebar.sales",
  slug: "sales",
  icon: "ShoppingBagIcon",
  submenu: [{
    url: "/dashboard/orders",
    name: "sidebar.orders",
    slug: "orders"
  }, {
    url: "/dashboard/vouchers",
    name: "sidebar.vouchers",
    slug: "vouchers"
  }],
  role: 'editor'
}, {
  url: "/content",
  name: "sidebar.content",
  slug: "content",
  icon: "BookmarkIcon",
  submenu: [{
    url: "/dashboard/reviews",
    name: "sidebar.reviews",
    slug: "reviews"
  }, {
    url: "/dashboard/pages",
    name: "sidebar.pages",
    slug: "pages"
  }],
  role: 'editor'
}, {
  url: "/dashboard/users",
  name: "sidebar.users",
  slug: "users",
  icon: "UsersIcon",
  role: 'admin'
}, {
  url: "/dashboard/subscriptions",
  name: "sidebar.newsletter",
  slug: "subscriptions",
  icon: "MailIcon",
  role: 'admin'
}, {
  url: "/dashboard/builder_layouts",
  name: "sidebar.pageBuilder",
  slug: "page_builder",
  icon: "GridIcon",
  submenu: [{
    url: "/dashboard/builder_layouts/home",
    name: "sidebar.homeBuilder",
    slug: "builder_layouts_home"
  }],
  role: 'editor'
}, {
  url: "/settings",
  name: "sidebar.settings",
  slug: "settings",
  icon: "SettingsIcon",
  submenu: [{
    url: "/dashboard/settings",
    name: "sidebar.settings",
    slug: "settings"
  }
  /*{
      url: "/dashboard/currencies",
      name: "sidebar.currencies",
      slug: "currencies",
  }*/],
  role: 'editor'
}]);

/***/ }),

/***/ "./resources/js/dashboard/layouts/main/Main.vue":
/*!******************************************************!*\
  !*** ./resources/js/dashboard/layouts/main/Main.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Main_vue_vue_type_template_id_277097a0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.vue?vue&type=template&id=277097a0 */ "./resources/js/dashboard/layouts/main/Main.vue?vue&type=template&id=277097a0");
/* harmony import */ var _Main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.vue?vue&type=script&lang=js */ "./resources/js/dashboard/layouts/main/Main.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Main_vue_vue_type_template_id_277097a0__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Main_vue_vue_type_template_id_277097a0__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/layouts/main/Main.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/layouts/main/Main.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/main/Main.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Main.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/main/Main.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/layouts/main/Main.vue?vue&type=template&id=277097a0":
/*!************************************************************************************!*\
  !*** ./resources/js/dashboard/layouts/main/Main.vue?vue&type=template&id=277097a0 ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_277097a0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Main.vue?vue&type=template&id=277097a0 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/layouts/main/Main.vue?vue&type=template&id=277097a0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_277097a0__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_277097a0__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=17.js.map