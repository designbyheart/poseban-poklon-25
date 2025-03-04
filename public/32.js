(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_tables_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/tables/helper */ "./resources/js/dashboard/mixins/tables/helper.js");
/* harmony import */ var _static_order_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/static/order/table */ "./resources/js/dashboard/static/order/table.js");
//Table helper functions


//Banners table schema

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_tables_helper__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      tableSchema: _static_order_table__WEBPACK_IMPORTED_MODULE_1__["tableSchema"],
      instance: 'order',
      instanceSlug: 'orders'
    };
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=template&id=234e9fc9":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=template&id=234e9fc9 ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
        return _vm._l(data, function (order, indexItem) {
          return _c("vs-tr", {
            key: indexItem
          }, [_c("vs-td", [_c("span", {
            staticClass: "text-primary"
          }, [_vm._v("#" + _vm._s(order.id))]), _vm._v(" "), _c("span", {
            staticClass: "text-sm"
          }, [_vm._v(_vm._s(order.customer_name + " " + order.customer_surname))]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
            staticClass: "text-sm"
          }, [_vm._v(_vm._s(order.customer_email))])]), _vm._v(" "), _c("vs-td", [_c("span", {
            staticClass: "text-sm"
          }, [_vm._v("\n                        " + _vm._s(_vm.buildAddress(order)) + "\n                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
            staticClass: "text-sm text-primary"
          }, [_vm._v("\n                        " + _vm._s(order.shipping_method.name) + "\n                    ")])]), _vm._v(" "), _c("vs-td", [_c("span", {
            staticClass: "text-sm"
          }, [_vm._v("\n                        " + _vm._s(order.status.title) + "\n                    ")])]), _vm._v(" "), _c("vs-td", [_c("span", {
            staticClass: "text-sm"
          }, [_vm._v("\n                        " + _vm._s(_vm.convertDate(order.created_at)) + "\n                    ")])]), _vm._v(" "), _c("vs-td", [_c("span", {
            staticClass: "text-sm"
          }, [_vm._v("\n                        " + _vm._s(order.total + " RSD") + "\n                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
            staticClass: "text-sm text-primary"
          }, [_vm._v(_vm._s(order.payment_method.name))])]), _vm._v(" "), _c("vs-td", [_c("vs-button", {
            staticClass: "text-sm",
            attrs: {
              color: "primary",
              to: {
                name: _vm.instanceSlug + "_show",
                params: {
                  id: order.id
                }
              }
            }
          }, [_vm._v(_vm._s(_vm.$t("actions.view")))])], 1)], 1);
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
  }, [_vm._v("\n                        " + _vm._s(_vm.getTableTitle()) + "\n                    ")])]), _vm._v(" "), _c("div", {
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
      "sort-key": "id"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("order")) + "\n            ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("shipping")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "status"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("status")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "created_at"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("date")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "total"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("total")) + "\n            ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("actions")) + "\n            ")])], 1)], 2), _vm._v(" "), _c("div", {
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
  })], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
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
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl, requestParams).then(function (response) {
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
      axios__WEBPACK_IMPORTED_MODULE_1___default.a["delete"](this.API[instance]["delete"] + '/' + id).then(function (response) {
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

/***/ "./resources/js/dashboard/static/order/table.js":
/*!******************************************************!*\
  !*** ./resources/js/dashboard/static/order/table.js ***!
  \******************************************************/
/*! exports provided: tableSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableSchema", function() { return tableSchema; });
var tableSchema = {
  columns: [{
    model: 'id'
  }, {
    model: 'customer_email'
  }, {
    model: 'subtotal'
  }, {
    model: 'discount'
  }, {
    model: 'total'
  }]
};

/***/ }),

/***/ "./resources/js/dashboard/views/order/AdminOrders.vue":
/*!************************************************************!*\
  !*** ./resources/js/dashboard/views/order/AdminOrders.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminOrders_vue_vue_type_template_id_234e9fc9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminOrders.vue?vue&type=template&id=234e9fc9 */ "./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=template&id=234e9fc9");
/* harmony import */ var _AdminOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminOrders.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AdminOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AdminOrders_vue_vue_type_template_id_234e9fc9__WEBPACK_IMPORTED_MODULE_0__["render"],
  _AdminOrders_vue_vue_type_template_id_234e9fc9__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/order/AdminOrders.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AdminOrders.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=template&id=234e9fc9":
/*!******************************************************************************************!*\
  !*** ./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=template&id=234e9fc9 ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminOrders_vue_vue_type_template_id_234e9fc9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AdminOrders.vue?vue&type=template&id=234e9fc9 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/order/AdminOrders.vue?vue&type=template&id=234e9fc9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminOrders_vue_vue_type_template_id_234e9fc9__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminOrders_vue_vue_type_template_id_234e9fc9__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=32.js.map