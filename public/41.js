(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=template&id=7c208d6e":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=template&id=7c208d6e ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "abr-vouchers-container"
  }, [_c("vs-table", {
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
        return _vm._l(data, function (voucher, indexItem) {
          return _c("vs-tr", {
            key: indexItem
          }, [_c("vs-td", [_vm._v("\n                    " + _vm._s(voucher.title) + "\n                ")]), _vm._v(" "), _c("vs-td", [voucher.order !== undefined && voucher.order !== null ? _c("span", [_vm._v("\n                    " + _vm._s(voucher.order.id) + "\n                    ")]) : _vm._e()]), _vm._v(" "), _c("vs-td", [_vm._v("\n                    " + _vm._s(voucher.voucher_code) + "\n                ")]), _vm._v(" "), _c("vs-td", [_vm._v("\n                    " + _vm._s(voucher.activation_code) + "\n                ")]), _vm._v(" "), _c("vs-td", [_vm._v("\n                    " + _vm._s(_vm.convertDate(voucher.end_date)) + "\n                ")]), _vm._v(" "), _c("vs-td", [voucher.activated ? _c("vs-icon", {
            attrs: {
              icon: "check",
              color: "success",
              size: "medium"
            }
          }) : _vm._e(), _vm._v(" "), !voucher.activated ? _c("vs-icon", {
            attrs: {
              icon: "close",
              color: "danger",
              size: "medium"
            }
          }) : _vm._e()], 1), _vm._v(" "), _c("vs-td", [_c("div", {
            staticClass: "flex"
          }, [_c("vs-button", {
            staticClass: "text-sm mr-2",
            attrs: {
              color: "primary",
              icon: "edit",
              type: "border",
              to: {
                name: _vm.instanceSlug + "_edit",
                params: {
                  id: voucher.id
                }
              }
            }
          }), _vm._v(" "), _c("vs-button", {
            staticClass: "mr-2",
            attrs: {
              color: "primary",
              icon: "print",
              href: _vm.getPrintUrl(voucher.id, "a4"),
              target: "_blank"
            }
          }, [_vm._v("A4")]), _vm._v(" "), _c("vs-button", {
            staticClass: "mr-2",
            attrs: {
              color: "primary",
              icon: "print",
              href: _vm.getPrintUrl(voucher.id, "a5"),
              target: "_blank"
            }
          }, [_vm._v("A5")]), _vm._v(" "), _c("vs-button", {
            attrs: {
              color: "danger",
              icon: "delete"
            },
            on: {
              click: function click($event) {
                return _vm.showDeleteAlert(voucher.id);
              }
            }
          })], 1)])], 1);
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
      "sort-key": "title"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("title")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "title"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("order")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "voucher_code"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("voucherCode")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "activation_code"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("activationCode")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "end_date"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("endDate")) + "\n            ")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "activated"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.getColumnTitle("activated")) + "\n            ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n                " + _vm._s(_vm.$t("actions.title")) + "\n            ")])], 1)], 2), _vm._v(" "), _c("div", {
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_tables_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/tables/helper */ "./resources/js/dashboard/mixins/tables/helper.js");
//Table helper functions

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_tables_helper__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      instance: 'voucher',
      instanceSlug: 'vouchers'
    };
  },
  methods: {
    getPrintUrl: function getPrintUrl(voucherId, paperSize) {
      return this.API.voucher.print + '/' + voucherId + '?paper_size=' + paperSize;
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

/***/ "./resources/js/dashboard/mixins/tables/helper.js":
/*!********************************************************!*\
  !*** ./resources/js/dashboard/mixins/tables/helper.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/.pnpm/axios@1.8.2/node_modules/axios/index.js");
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

/***/ "./resources/js/dashboard/views/voucher/AdminVouchers.vue":
/*!****************************************************************!*\
  !*** ./resources/js/dashboard/views/voucher/AdminVouchers.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminVouchers_vue_vue_type_template_id_7c208d6e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminVouchers.vue?vue&type=template&id=7c208d6e */ "./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=template&id=7c208d6e");
/* harmony import */ var _AdminVouchers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminVouchers.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AdminVouchers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AdminVouchers_vue_vue_type_template_id_7c208d6e__WEBPACK_IMPORTED_MODULE_0__["render"],
  _AdminVouchers_vue_vue_type_template_id_7c208d6e__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/voucher/AdminVouchers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminVouchers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AdminVouchers.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminVouchers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=template&id=7c208d6e":
/*!**********************************************************************************************!*\
  !*** ./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=template&id=7c208d6e ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminVouchers_vue_vue_type_template_id_7c208d6e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AdminVouchers.vue?vue&type=template&id=7c208d6e */ "./node_modules/babel-loader/lib/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/AdminVouchers.vue?vue&type=template&id=7c208d6e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminVouchers_vue_vue_type_template_id_7c208d6e__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminVouchers_vue_vue_type_template_id_7c208d6e__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=41.js.map