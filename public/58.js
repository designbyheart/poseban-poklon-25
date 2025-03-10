(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[58],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _mixins_tables_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/tables/helper */ "./resources/js/dashboard/mixins/tables/helper.js");
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
//Library for sending requests


//Table helper functions


//Datepicker component

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Datepicker: vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_mixins_tables_helper__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      instance: 'newsletterSubscription',
      instanceSlug: 'subscriptions',
      downloadSubscriptionsPopup: {
        active: false,
        from: new Date(),
        to: new Date()
      }
    };
  },
  methods: {
    showSubscriptionsPopup: function showSubscriptionsPopup() {
      this.downloadSubscriptionsPopup.active = true;
    },
    downloadSubscriptions: function downloadSubscriptions() {
      var requestUrl = '/dashboard/subscriptions/download';
      var requestParams = {
        from: this.convertDate(this.downloadSubscriptionsPopup.from),
        to: this.convertDate(this.downloadSubscriptionsPopup.to)
      };
      Object(axios__WEBPACK_IMPORTED_MODULE_0__["default"])({
        method: 'post',
        url: requestUrl,
        responseType: 'blob'
      }, requestParams).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'newsletter_subscriptions.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
  },
  created: function created() {
    //Set the instance
    this.setInstance(this.instance);
  },
  mounted: function mounted() {
    //Load items
    this.getItems();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=template&id=5ed645be":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=template&id=5ed645be ***!
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
  return _c("div", [_c("vs-table", {
    attrs: {
      "max-items": _vm.per_page,
      sst: true,
      data: _vm.items,
      noDataText: _vm.$t("messages.notFound")
    },
    on: {
      sort: _vm.handleSort
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref) {
        var data = _ref.data;
        return _vm._l(data, function (subscription, indexItem) {
          return _c("vs-tr", {
            key: indexItem
          }, [_c("vs-td", [_c("span", {
            staticClass: "text-sm"
          }, [_vm._v(_vm._s(subscription.email))])]), _vm._v(" "), _c("vs-td", [_c("vs-button", {
            attrs: {
              color: "danger",
              icon: "delete"
            },
            on: {
              click: function click($event) {
                return _vm.showDeleteAlert(subscription.id);
              }
            }
          })], 1)], 1);
        });
      }
    }])
  }, [_c("template", {
    slot: "header"
  }, [_c("div", {
    staticClass: "vx-row w-full pb-3 m-0"
  }, [_c("div", {
    staticClass: "vx-col flex items-center w-1/2 p-0"
  }, [_c("h3", {
    staticClass: "mb-0 mr-3"
  }, [_vm._v("\n                        " + _vm._s(_vm.getTableTitle()) + "\n                    ")]), _vm._v(" "), _c("vs-button", {
    on: {
      click: _vm.showSubscriptionsPopup
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.export")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col flex items-center justify-end w-1/2 p-0"
  }, [_c("vs-input", {
    staticClass: "w-full",
    attrs: {
      icon: "search",
      placeholder: _vm.$t("actions.search")
    },
    model: {
      value: _vm.search,
      callback: function callback($$v) {
        _vm.search = $$v;
      },
      expression: "search"
    }
  })], 1)])]), _vm._v(" "), _c("template", {
    slot: "thead"
  }, [_c("vs-th", {
    attrs: {
      "sort-key": "email"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("email")) + "\n            ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("actions")) + "\n            ")])], 1)], 2), _vm._v(" "), _c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col flex justify-end items-center w-full p-3"
  }, [_c("vs-pagination", {
    attrs: {
      total: _vm.pagination.totalPages
    },
    model: {
      value: _vm.pagination.currentPage,
      callback: function callback($$v) {
        _vm.$set(_vm.pagination, "currentPage", $$v);
      },
      expression: "pagination.currentPage"
    }
  })], 1)]), _vm._v(" "), _c("vs-popup", {
    attrs: {
      title: _vm.$t("modals.downloadSubscriptions.title"),
      active: _vm.downloadSubscriptionsPopup.active
    },
    on: {
      "update:active": function updateActive($event) {
        return _vm.$set(_vm.downloadSubscriptionsPopup, "active", $event);
      }
    }
  }, [_c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-1/2 mb-3 overflow-visible"
  }, [_c("p", {
    staticClass: "text-sm font-bold mb-2"
  }, [_vm._v(_vm._s(_vm.$t("modals.downloadSubscriptions.properties.from")))]), _vm._v(" "), _c("datepicker", {
    attrs: {
      format: "dd.MM.yy"
    },
    model: {
      value: _vm.downloadSubscriptionsPopup.from,
      callback: function callback($$v) {
        _vm.$set(_vm.downloadSubscriptionsPopup, "from", $$v);
      },
      expression: "downloadSubscriptionsPopup.from"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/2 mb-3 overflow-visible"
  }, [_c("p", {
    staticClass: "text-sm font-bold mb-2"
  }, [_vm._v(_vm._s(_vm.$t("modals.downloadSubscriptions.properties.to")))]), _vm._v(" "), _c("datepicker", {
    attrs: {
      format: "dd.MM.yy"
    },
    model: {
      value: _vm.downloadSubscriptionsPopup.to,
      callback: function callback($$v) {
        _vm.$set(_vm.downloadSubscriptionsPopup, "to", $$v);
      },
      expression: "downloadSubscriptionsPopup.to"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("vs-button", {
    on: {
      click: _vm.downloadSubscriptions
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.download")))])], 1)])])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--23-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--23-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.vs-popup--content{\n\n    overflow: visible;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--23-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--23-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--23-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--23-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css");

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

/***/ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/pedja/work/poklon/poklon/node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js'");

/***/ }),

/***/ "./resources/js/dashboard/mixins/tables/helper.js":
/*!********************************************************!*\
  !*** ./resources/js/dashboard/mixins/tables/helper.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
//Application routes


//Library for working with requests

var tableHelper = {
  props: {},
  data: function data() {
    return {
      instance: '',
      items: [],
      per_page: 20,
      pagination: {
        currentPage: 1,
        nextPageUrl: '',
        totalPages: 1
      },
      search: '',
      sortKey: '',
      sortOrder: '',
      API: _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__["API"]
    };
  },
  watch: {
    'pagination.currentPage': function paginationCurrentPage(value, oldValue) {
      this.getItems();
    },
    'search': function search() {
      this.getItems();
    }
  },
  methods: {
    setInstance: function setInstance(instance) {
      this.instance = instance;
    },
    getItems: function getItems(params) {
      var _this = this;
      var instance = this.instance;
      var requestParams = {
        params: {
          per_page: this.per_page,
          sort_key: 'created_at',
          sort_order: 'desc'
        }
      };
      if (params !== undefined) {
        requestParams.params = params;
      }
      if (this.search !== '') {
        requestParams.params.search = this.search;
        this.pagination.currentPage = 1;
      }
      var requestUrl = this.API[instance].list;
      var selectedPage = this.pagination.currentPage;
      if (this.pagination.nextPageUrl !== '' && this.search === '') {
        requestUrl = requestUrl + '?page=' + selectedPage;
      }
      axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(requestUrl, requestParams).then(function (response) {
        _this.items = response.data.data;
        _this.pagination.nextPageUrl = response.data.next_page_url;
        _this.pagination.totalPages = response.data.last_page;
      });
    },
    handleSort: function handleSort(key, active) {
      var sort_order = active ? 'desc' : 'asc';
      var params = {
        sort_key: key,
        sort_order: sort_order
      };
      this.getItems(params);
    },
    deleteItem: function deleteItem(id) {
      var _this2 = this;
      var instance = this.instance;
      axios__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"](this.API[instance]["delete"] + '/' + id).then(function (response) {
        if (response.data === 'success') {
          _this2.showNotification('success', 'request.deletedSuccess', 'success');

          //Update the items list
          _this2.getItems();
        }
      })["catch"](function (error) {
        _this2.showNotification('error', 'request.error', 'danger');
      });
    },
    getTableTitle: function getTableTitle() {
      return this.$t('tables.' + this.instance + '.title');
    },
    getColumnTitle: function getColumnTitle(model) {
      return this.$t('models.' + this.instance + '.properties.' + model);
    },
    getPropertyTitle: function getPropertyTitle(property) {
      return this.$t('models.' + this.instance + '.properties.' + property);
    },
    convertDate: function convertDate(date) {
      var selectedDate = new Date(date);
      var dateDay = selectedDate.getDate();
      var dateMonth = selectedDate.getMonth() + 1;
      var dateYear = selectedDate.getFullYear();
      if (dateDay < 10) {
        dateDay = '0' + dateDay;
      }
      if (dateMonth < 10) {
        dateMonth = '0' + dateMonth;
      }
      var convertedDate = dateDay + '.' + dateMonth + '.' + dateYear;
      return convertedDate;
    },
    showNotification: function showNotification(type, message, color, customInstance, isPlural) {
      var instance = '';
      var count = 1;
      if (isPlural) {
        count = 2;
      }
      if (customInstance) {
        instance = this.$tc('models.' + customInstance + '.title', count);
      } else {
        instance = this.$tc('models.' + this.instance + '.title', count);
      }
      var title = this.$t('messages.' + type);
      var text = this.$tc('messages.' + message, count, {
        instance: instance
      });
      this.$vs.notify({
        title: title,
        text: text,
        color: color
      });
    },
    showDeleteAlert: function showDeleteAlert(id) {
      var deleteItemFunction = this.deleteItem.bind(null, id);
      var instance = this.$tc('models.' + this.instance + '.title', 1);
      var text = this.$t('messages.confirmation.delete', {
        instance: instance
      });
      this.$vs.dialog({
        color: 'primary',
        title: 'Confirm',
        text: text,
        accept: deleteItemFunction
      });
    }
  },
  mounted: function mounted() {}
};
/* harmony default export */ __webpack_exports__["default"] = (tableHelper);

/***/ }),

/***/ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewsletterSubscriptions_vue_vue_type_template_id_5ed645be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsletterSubscriptions.vue?vue&type=template&id=5ed645be */ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=template&id=5ed645be");
/* harmony import */ var _NewsletterSubscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewsletterSubscriptions.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _NewsletterSubscriptions_vue_vue_type_style_index_0_id_5ed645be_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css */ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NewsletterSubscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewsletterSubscriptions_vue_vue_type_template_id_5ed645be__WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewsletterSubscriptions_vue_vue_type_template_id_5ed645be__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterSubscriptions.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_style_index_0_id_5ed645be_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--23-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--23-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=style&index=0&id=5ed645be&lang=css");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_style_index_0_id_5ed645be_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_style_index_0_id_5ed645be_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_style_index_0_id_5ed645be_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_style_index_0_id_5ed645be_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=template&id=5ed645be":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=template&id=5ed645be ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_template_id_5ed645be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterSubscriptions.vue?vue&type=template&id=5ed645be */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/newsletter/NewsletterSubscriptions.vue?vue&type=template&id=5ed645be");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_template_id_5ed645be__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterSubscriptions_vue_vue_type_template_id_5ed645be__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=58.js.map