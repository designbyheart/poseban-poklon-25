(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    icon: {
      type: String,
      required: true
    },
    statistic: {
      type: [Number, String],
      required: true
    },
    statisticTitle: {
      type: String
    },
    color: {
      type: String,
      "default": 'primary'
    },
    type: {
      type: String,
      "default": 'line'
    },
    iconRight: {
      type: Boolean,
      "default": false
    }
  },
  methods: {},
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/Dashboard.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/Dashboard.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var _components_vx_card_VxCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/vx-card/VxCard */ "./resources/js/dashboard/components/vx-card/VxCard.vue");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
/* harmony import */ var _components_statistics_cards_StatisticsCardNumber_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/statistics-cards/StatisticsCardNumber.vue */ "./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue");
//Library for working with requests


//Application routes


//Import icons

//Import a card component


//Vue select


//Datepicker component


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    statisticTypes: {
      type: Array,
      "default": function _default() {
        return [{
          label: this.$t('statistics.types.general'),
          slug: 'general'
        }, {
          label: this.$t('statistics.types.product'),
          slug: 'product'
        }, {
          label: this.$t('statistics.types.producent'),
          slug: 'producent'
        }];
      }
    }
  },
  components: {
    VxCard: _components_vx_card_VxCard__WEBPACK_IMPORTED_MODULE_2__["default"],
    Datepicker: vuejs_datepicker__WEBPACK_IMPORTED_MODULE_4__["default"],
    StatisticsCardNumber: _components_statistics_cards_StatisticsCardNumber_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  data: function data() {
    return {
      statisticType: this.statisticTypes[0],
      statisticData: {
        grossSales: {
          value: '0',
          labelSlug: 'grossSales',
          icon: 'DollarSignIcon',
          onlyGeneral: false
        },
        grossSalesDaily: {
          value: '0',
          labelSlug: 'grossSalesDaily',
          icon: 'DollarSignIcon',
          onlyGeneral: false
        },
        netSales: {
          value: '0',
          labelSlug: 'netSales',
          icon: 'DollarSignIcon',
          onlyGeneral: false
        },
        netSalesDaily: {
          value: '0',
          labelSlug: 'netSalesDaily',
          icon: 'DollarSignIcon',
          onlyGeneral: false
        },
        ordersPlaced: {
          value: '0',
          labelSlug: 'ordersPlaced',
          icon: 'ShoppingBagIcon',
          onlyGeneral: false
        },
        itemsPurchased: {
          value: '0',
          labelSlug: 'itemsPurchased',
          icon: 'ShoppingCartIcon',
          onlyGeneral: false
        },
        couponsWorth: {
          value: '0',
          labelSlug: 'couponsWorth',
          icon: 'PercentIcon',
          onlyGeneral: true
        },
        giftCardsWorth: {
          value: '0',
          labelSlug: 'giftCardsWorth',
          icon: 'GiftIcon',
          onlyGeneral: true
        }
      },
      productsList: [],
      filter: {
        date: {
          start: '',
          end: ''
        },
        productSearch: '',
        producentSearch: ''
      },
      products: [],
      producents: [],
      API: _mixins_api_api__WEBPACK_IMPORTED_MODULE_1__["API"]
    };
  },
  methods: {
    fetchData: function fetchData() {
      var component = this;
      var startDate = this.convertDate(this.filter.date.start);
      var endDate = this.convertDate(this.filter.date.end);
      var type = this.statisticType;
      var requestParams = {
        params: {
          start_date: startDate,
          end_date: endDate,
          type: type.slug
        }
      };
      if (type.slug === 'product') {
        requestParams.params.product_id = this.filter.productSearch;
      }
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/dashboard/statistic/get', requestParams).then(function (response) {
        if (response.data.statistic) {
          component.setStatisticValues(response.data.statistic);
        }
      });
    },
    downloadStatistics: function downloadStatistics() {
      var startDate = this.convertDate(this.filter.date.start);
      var endDate = this.convertDate(this.filter.date.end);
      var type = this.statisticType;
      var requestParams = {
        from: startDate,
        to: endDate
      };
      if (type.slug === 'product') {
        requestParams.product_id = this.filter.productSearch;
      } else if (type.slug === 'producent') {
        requestParams.producent_id = this.filter.producentSearch;
      }
      var requestUrl = '/dashboard/order-items/download';
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(requestUrl, requestParams).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement('a');
        link.href = url;
        var filename = 'statistics_' + startDate + '_' + endDate + '.csv';
        link.setAttribute('download', filename); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    setStatisticValues: function setStatisticValues(statistic) {
      var statisticData = this.statisticData;
      statisticData.grossSales.value = statistic.grossSales;
      statisticData.grossSalesDaily.value = statistic.grossSalesDaily;
      statisticData.netSales.value = statistic.netSales;
      statisticData.netSalesDaily.value = statistic.netSalesDaily;
      statisticData.ordersPlaced.value = statistic.ordersPlaced;
      statisticData.itemsPurchased.value = statistic.itemsPurchased;
      statisticData.couponsWorth.value = statistic.couponsWorth;
      statisticData.giftCardsWorth.value = statistic.giftcardWorth;
      this.productsList = statistic.productsList;
    },
    setDefaultDates: function setDefaultDates() {
      var startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      var endDate = new Date();
      this.filter.date.start = startDate;
      this.filter.date.end = endDate;
    },
    getStatisticLabel: function getStatisticLabel(slug) {
      return this.$t('statistics.' + slug + '.label');
    },
    changeStatisticType: function changeStatisticType(type) {
      this.statisticType = type;
    },
    isHidden: function isHidden(value) {
      if (this.statisticType !== this.statisticTypes[0] && value) {
        return true;
      }
    },
    searchProducts: function searchProducts(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      };

      //Search products
      this.products = this.loadItems('product', requestParams);
    },
    searchProducents: function searchProducents(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      };

      //Search products
      this.producents = this.loadItems('producent', requestParams);
    }
  },
  created: function created() {
    //Set default dates
    this.setDefaultDates();
  },
  mounted: function mounted() {
    //Fetch statistics data
    this.fetchData();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=template&id=70bd11dc":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=template&id=70bd11dc ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("vx-card", {
    staticClass: "overflow-hidden"
  }, [_c("div", {
    attrs: {
      slot: "no-body"
    },
    slot: "no-body"
  }, [_c("div", {
    staticClass: "p-6",
    "class": {
      "flex justify-between flex-row-reverse items-center": _vm.iconRight
    }
  }, [_c("feather-icon", {
    staticClass: "p-3 inline-flex rounded-full",
    "class": ["text-".concat(_vm.color), {
      "mb-4": !_vm.iconRight
    }],
    style: {
      background: "rgba(var(--vs-".concat(_vm.color, "),.15)")
    },
    attrs: {
      icon: _vm.icon
    }
  }), _vm._v(" "), _c("div", [_c("h2", {
    staticClass: "mb-1 font-bold"
  }, [_vm._v(_vm._s(_vm.statistic))]), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.statisticTitle))])])], 1)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/Dashboard.vue?vue&type=template&id=1950de0a":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/Dashboard.vue?vue&type=template&id=1950de0a ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("h3", {
    staticClass: "mb-3"
  }, [_vm._v(_vm._s(_vm.$t("statistics.pageTitle")))]), _vm._v(" "), _c("vs-dropdown", [_c("a", {
    staticClass: "flex items-center",
    attrs: {
      href: "#"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.statisticType.label) + "\n                "), _c("i", {
    staticClass: "material-icons"
  }, [_vm._v(" expand_more ")])]), _vm._v(" "), _c("vs-dropdown-menu", [_c("vs-dropdown-item", [_vm._l(_vm.statisticTypes, function (statType, typeIndex) {
    return _c("li", {
      key: typeIndex
    }, [_vm._v("\n                        " + _vm._s(statType) + "\n                    ")]);
  }), _vm._v('\n                    :key="index" @click="changeStatis`ticType(type)">\n                    ' + _vm._s(_vm.type.label) + "\n                ")], 2)], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("vx-card", [_c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col flex items-center"
  }, [_c("datepicker", {
    attrs: {
      placeholder: "Select date",
      format: "dd.MM.yyyy"
    },
    model: {
      value: _vm.filter.date.start,
      callback: function callback($$v) {
        _vm.$set(_vm.filter.date, "start", $$v);
      },
      expression: "filter.date.start"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col flex items-center px-1"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v(" remove ")])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col flex items-center"
  }, [_c("datepicker", {
    attrs: {
      placeholder: "Select date",
      format: "dd.MM.yyyy"
    },
    model: {
      value: _vm.filter.date.end,
      callback: function callback($$v) {
        _vm.$set(_vm.filter.date, "end", $$v);
      },
      expression: "filter.date.end"
    }
  })], 1), _vm._v(" "), _vm.statisticType.slug === "product" ? _c("div", {
    staticClass: "vx-col flex flex-1 items-center"
  }, [_c("v-select", {
    staticClass: "w-full",
    attrs: {
      label: "title",
      options: _vm.products,
      reduce: function reduce(product) {
        return product.id;
      },
      placeholder: _vm.$t("statistics.searchPlaceholder")
    },
    on: {
      search: _vm.searchProducts
    },
    model: {
      value: _vm.filter.productSearch,
      callback: function callback($$v) {
        _vm.$set(_vm.filter, "productSearch", $$v);
      },
      expression: "filter.productSearch"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.statisticType.slug === "producent" ? _c("div", {
    staticClass: "vx-col flex flex-1 items-center"
  }, [_c("v-select", {
    staticClass: "w-full",
    attrs: {
      label: "title",
      options: _vm.producents,
      reduce: function reduce(producent) {
        return producent.id;
      },
      placeholder: _vm.$t("statistics.searchPlaceholder")
    },
    on: {
      search: _vm.searchProducents
    },
    model: {
      value: _vm.filter.producentSearch,
      callback: function callback($$v) {
        _vm.$set(_vm.filter, "producentSearch", $$v);
      },
      expression: "filter.producentSearch"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "vx-col"
  }, [_c("vs-button", {
    staticClass: "mr-6",
    on: {
      click: _vm.fetchData
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.filter")))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      type: "border"
    },
    on: {
      click: _vm.downloadStatistics
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.download")))])], 1)])])], 1), _vm._v(" "), _vm._l(_vm.statisticData, function (statistic, index) {
    return _c("div", {
      key: index,
      staticClass: "vx-col w-1/4 mb-6"
    }, [!_vm.isHidden(statistic.onlyGeneral) ? _c("statistics-card-number", {
      attrs: {
        icon: statistic.icon,
        statistic: statistic.value,
        statisticTitle: _vm.getStatisticLabel(statistic.labelSlug)
      }
    }) : _vm._e()], 1);
  }), _vm._v(" "), _vm.statisticType.slug === "general" ? _c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("vx-card", [_c("vs-table", {
    attrs: {
      search: "",
      data: _vm.productsList,
      noDataText: _vm.$t("messages.notFound")
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref) {
        var data = _ref.data;
        return _vm._l(data, function (tr, indextr) {
          return _c("vs-tr", {
            key: indextr,
            attrs: {
              data: tr
            }
          }, [_c("vs-td", {
            attrs: {
              data: data[indextr].title
            }
          }, [_c("a", {
            attrs: {
              href: _vm.API.product.show + data[indextr].slug
            }
          }, [_vm._v("\n                                " + _vm._s(data[indextr].title) + "\n                            ")])]), _vm._v(" "), _c("vs-td", {
            attrs: {
              data: data[indextr].producent.title
            }
          }, [_c("router-link", {
            attrs: {
              to: {
                name: "producents_edit",
                params: {
                  id: data[indextr].producent.id
                }
              }
            }
          }, [_vm._v("\n                                " + _vm._s(data[indextr].producent.title) + "\n                            ")])], 1), _vm._v(" "), _c("vs-td", {
            attrs: {
              data: data[indextr].sold_quantity
            }
          }, [_vm._v("\n                            " + _vm._s(data[indextr].sold_quantity) + "\n                        ")]), _vm._v(" "), _c("vs-td", {
            attrs: {
              data: data[indextr].sold_total
            }
          }, [_vm._v("\n                            " + _vm._s(data[indextr].sold_total + " " + _vm.applicationParams.defaultCurrency) + "\n                        ")])], 1);
        });
      }
    }], null, false, 3797329382)
  }, [_c("template", {
    slot: "header"
  }, [_c("div", {
    staticClass: "vx-row w-full pb-3 m-0"
  }, [_c("div", {
    staticClass: "vx-col flex items-center w-1/2 p-0"
  }, [_c("h3", {
    staticClass: "mb-0 mr-3"
  }, [_vm._v("\n                                Products sold in the period\n                            ")])])])]), _vm._v(" "), _c("template", {
    slot: "thead"
  }, [_c("vs-th", {
    attrs: {
      "sort-key": "title"
    }
  }, [_vm._v("Product")]), _vm._v(" "), _c("vs-th", [_vm._v("Producent")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "sold_quantity"
    }
  }, [_vm._v("Items sold")]), _vm._v(" "), _c("vs-th", {
    attrs: {
      "sort-key": "sold_total"
    }
  }, [_vm._v("Total")])], 1)], 2)], 1)], 1) : _vm._e()], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue":
/*!*************************************************************************************!*\
  !*** ./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StatisticsCardNumber_vue_vue_type_template_id_70bd11dc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatisticsCardNumber.vue?vue&type=template&id=70bd11dc */ "./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=template&id=70bd11dc");
/* harmony import */ var _StatisticsCardNumber_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatisticsCardNumber.vue?vue&type=script&lang=js */ "./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StatisticsCardNumber_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _StatisticsCardNumber_vue_vue_type_template_id_70bd11dc__WEBPACK_IMPORTED_MODULE_0__["render"],
  _StatisticsCardNumber_vue_vue_type_template_id_70bd11dc__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticsCardNumber_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StatisticsCardNumber.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticsCardNumber_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=template&id=70bd11dc":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=template&id=70bd11dc ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticsCardNumber_vue_vue_type_template_id_70bd11dc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StatisticsCardNumber.vue?vue&type=template&id=70bd11dc */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/statistics-cards/StatisticsCardNumber.vue?vue&type=template&id=70bd11dc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticsCardNumber_vue_vue_type_template_id_70bd11dc__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticsCardNumber_vue_vue_type_template_id_70bd11dc__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/dashboard/views/Dashboard.vue":
/*!****************************************************!*\
  !*** ./resources/js/dashboard/views/Dashboard.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_1950de0a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=1950de0a */ "./resources/js/dashboard/views/Dashboard.vue?vue&type=template&id=1950de0a");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/Dashboard.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_1950de0a__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_1950de0a__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/Dashboard.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/dashboard/views/Dashboard.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/Dashboard.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/Dashboard.vue?vue&type=template&id=1950de0a":
/*!**********************************************************************************!*\
  !*** ./resources/js/dashboard/views/Dashboard.vue?vue&type=template&id=1950de0a ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1950de0a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=1950de0a */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/Dashboard.vue?vue&type=template&id=1950de0a");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1950de0a__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1950de0a__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=19.js.map