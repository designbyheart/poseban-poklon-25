(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=template&id=392dae7a":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/coupon/Form.vue?vue&type=template&id=392dae7a ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    attrs: {
      title: _vm.getFormTitle(_vm.isEditForm),
      noShadow: "",
      cardBorder: ""
    }
  }, [_c("vs-tabs", {
    staticClass: "px-0"
  }, [_vm._l(_vm.formStructure.sections, function (item, index) {
    return _c("vs-tab", {
      key: index,
      attrs: {
        label: _vm.getSectionTitle(item.slug)
      }
    }, _vm._l(item.fields, function (field, index) {
      return _c("div", {
        key: index,
        staticClass: "vx-row mb-6"
      }, [_c("div", {
        staticClass: "vx-col w-full"
      }, [field.type === "text" || field.type === "number" ? _c("vs-input", {
        staticClass: "w-full",
        attrs: {
          type: field.type,
          label: _vm.getFieldLabel(item.slug, field.model),
          danger: _vm.validateField(field.model),
          "val-icon-danger": "close"
        },
        model: {
          value: _vm.model[field.model],
          callback: function callback($$v) {
            _vm.$set(_vm.model, field.model, $$v);
          },
          expression: "model[field.model]"
        }
      }) : _vm._e(), _vm._v(" "), field.type === "textarea" ? _c("vs-textarea", {
        staticClass: "mb-0",
        attrs: {
          label: _vm.getFieldLabel(item.slug, field.model)
        },
        model: {
          value: _vm.model[field.model],
          callback: function callback($$v) {
            _vm.$set(_vm.model, field.model, $$v);
          },
          expression: "model[field.model]"
        }
      }) : _vm._e(), _vm._v(" "), field.type === "select" ? _c("vs-select", {
        staticClass: "w-full",
        attrs: {
          autocomplete: "",
          label: _vm.getFieldLabel(item.slug, field.model),
          multiple: field.multiple,
          "is-selected": _vm.model[field.model]
        },
        on: {
          "update:isSelected": function updateIsSelected($event) {
            return _vm.$set(_vm.model, field.model, $event);
          },
          "update:is-selected": function updateIsSelected($event) {
            return _vm.$set(_vm.model, field.model, $event);
          }
        },
        model: {
          value: _vm.model[field.model],
          callback: function callback($$v) {
            _vm.$set(_vm.model, field.model, $$v);
          },
          expression: "model[field.model]"
        }
      }, _vm._l(_vm.getOptions(field.options), function (item, index) {
        return _c("vs-select-item", {
          key: index,
          attrs: {
            value: item[field.valueKey],
            text: item[field.labelKey]
          }
        });
      }), 1) : _vm._e(), _vm._v(" "), field.type === "checkbox" ? _c("vs-checkbox", {
        model: {
          value: _vm.model[field.model],
          callback: function callback($$v) {
            _vm.$set(_vm.model, field.model, $$v);
          },
          expression: "model[field.model]"
        }
      }, [_vm._v(_vm._s(_vm.getFieldLabel(item.slug, field.model)))]) : _vm._e(), _vm._v(" "), field.type === "imageUpload" ? _c("image-upload", {
        attrs: {
          "selected-images": _vm.selectedImages
        }
      }) : _vm._e(), _vm._v(" "), field.type === "date" ? _c("datepicker", {
        attrs: {
          placeholder: _vm.getFieldLabel(item.slug, field.model),
          format: "dd.MM.yyyy"
        },
        model: {
          value: _vm.model[field.model],
          callback: function callback($$v) {
            _vm.$set(_vm.model, field.model, $$v);
          },
          expression: "model[field.model]"
        }
      }) : _vm._e(), _vm._v(" "), _c("span", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: field.validates && _vm.validateField(field.model),
          expression: "field.validates && validateField(field.model)"
        }],
        staticClass: "text-danger text-xs"
      }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]);
    }), 0);
  }), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getSectionTitle("connections")
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showProductSelect,
      expression: "showProductSelect"
    }],
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getFieldLabel("connections", "product_id")))]), _vm._v(" "), _c("v-select", {
    staticClass: "mb-6",
    attrs: {
      label: "title",
      options: _vm.products,
      reduce: function reduce(title) {
        return title.id;
      }
    },
    on: {
      search: _vm.searchProducts
    },
    model: {
      value: _vm.model.product_id,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "product_id", $$v);
      },
      expression: "model.product_id"
    }
  }), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "swap_horiz"
    },
    on: {
      click: function click($event) {
        return _vm.showSelect("category");
      }
    }
  }, [_c("span", {
    staticClass: "capitalize"
  }, [_vm._v(_vm._s(_vm.$tc("models.category.title", 1)))])])], 1)]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showCategorySelect,
      expression: "showCategorySelect"
    }],
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getFieldLabel("connections", "category_id")))]), _vm._v(" "), _c("v-select", {
    staticClass: "mb-6",
    attrs: {
      label: "title",
      options: _vm.categories,
      reduce: function reduce(title) {
        return title.id;
      }
    },
    on: {
      search: _vm.searchCategories
    },
    model: {
      value: _vm.model.category_id,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "category_id", $$v);
      },
      expression: "model.category_id"
    }
  }), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "swap_horiz"
    },
    on: {
      click: function click($event) {
        return _vm.showSelect("product");
      }
    }
  }, [_c("span", {
    staticClass: "capitalize"
  }, [_vm._v(_vm._s(_vm.$tc("models.product.title", 1)))])])], 1)])])], 2), _vm._v(" "), _c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [!_vm.isEditForm ? _c("vs-button", {
    staticClass: "mr-3 mb-2",
    attrs: {
      color: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.submitForm();
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.create")))]) : _vm._e(), _vm._v(" "), _vm.isEditForm ? _c("vs-button", {
    staticClass: "mr-3 mb-2",
    attrs: {
      color: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.submitForm();
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.update")))]) : _vm._e(), _vm._v(" "), _c("vs-button", {
    staticClass: "mb-2",
    attrs: {
      color: "danger",
      type: "border",
      to: {
        name: _vm.indexRoute
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.cancel")))])], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/coupon/Form.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/.pnpm/axios@1.8.2/node_modules/axios/index.js");
/* harmony import */ var _mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/forms/helper */ "./resources/js/dashboard/mixins/forms/helper.js");
/* harmony import */ var _static_coupon_coupon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/static/coupon/coupon */ "./resources/js/dashboard/static/coupon/coupon.js");
/* harmony import */ var _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/images/ImageUpload */ "./resources/js/dashboard/components/images/ImageUpload.vue");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-select */ "./node_modules/.pnpm/vue-select@3.20.4_vue@2.7.16/node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_4__);
//Library for working with requests


//Form helper functions


//Model, validations and types


//Image manager


//Vue select

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    ImageUpload: _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_3__["default"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_4___default.a
  },
  props: {
    isEditForm: Boolean,
    formModel: {
      type: String,
      "default": 'coupon'
    },
    indexRoute: {
      type: String,
      "default": 'coupons'
    }
  },
  data: function data() {
    return {
      formStructure: _static_coupon_coupon__WEBPACK_IMPORTED_MODULE_2__["formStructure"],
      currentSelector: 'product'
    };
  },
  validations: _static_coupon_coupon__WEBPACK_IMPORTED_MODULE_2__["validations"],
  computed: {
    showProductSelect: function showProductSelect() {
      if (this.currentSelector === 'product') {
        return true;
      } else {
        return false;
      }
    },
    showCategorySelect: function showCategorySelect() {
      if (this.currentSelector === 'category') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    create: function create() {
      var _this = this;
      //Assemble an item
      this.assembleItem();
      var requestParams = this.model;
      var requestUrl = this.API[this.instance].create;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this.showNotification('success', 'request.createdSuccess', 'success');
          _this.afterCreateCallback();
        }
      })["catch"](function (error) {
        _this.showNotification('error', 'request.error', 'danger');
      });
    },
    update: function update() {
      var _this2 = this;
      //Assemble an item
      this.assembleItem();
      var requestParams = this.model;
      var id = this.$route.params.id;
      var requestUrl = this.API[this.instance].update + '/' + id;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this2.showNotification('success', 'request.updatedSuccess', 'success');
        }
      })["catch"](function (error) {
        _this2.showNotification('error', 'request.error', 'danger');
      });
    },
    afterCreateCallback: function afterCreateCallback() {
      var component = this;
      setTimeout(function () {
        component.redirectToIndex(component.indexRoute);
        component.setModel();
      }, 500);
    },
    setModel: function setModel() {
      this.model = Object.assign({}, _static_coupon_coupon__WEBPACK_IMPORTED_MODULE_2__["model"]);
    },
    getSingleItem: function getSingleItem() {
      var _this3 = this;
      var id = this.$route.params.id;
      var requestParams = {
        params: {
          id: id
        }
      };
      var requestUrl = this.API[this.instance].single;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(requestUrl, requestParams).then(function (response) {
        _this3.model = response.data;
      });
    },
    loadData: function loadData() {
      //Get products
      this.getProducts({
        params: {
          per_page: 1000
        }
      });

      //Get categories
      this.getCategories({
        params: {
          per_page: 1000
        }
      });

      //Get the data for editing
      if (this.isEditForm) {
        this.getSingleItem();
      }
    },
    assembleItem: function assembleItem() {
      //Convert dates
      this.model.start_date = this.convertDate(this.model.start_date);
      this.model.end_date = this.convertDate(this.model.end_date);
    },
    submitForm: function submitForm() {
      if (!this.$v.$invalid) {
        if (this.isEditForm) {
          this.update();
        } else {
          this.create();
        }
      } else {
        this.showNotification('error', 'validation.invalidForm', 'danger');
      }
    },
    showSelect: function showSelect(type) {
      if (type === 'product') {
        this.model.category_id = '';
        this.currentSelector = 'product';
      } else if (type === 'category') {
        this.model.product_id = '';
        this.currentSelector = 'category';
      }
    }
  },
  mounted: function mounted() {
    //Set the model
    this.setModel();

    //Load the necessary data
    this.loadData();
  },
  created: function created() {
    //Set an instance for the form rendering
    this.setInstance(this.formModel);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--24-1!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.con-vs-tabs, .con-vs-tabs .con-slot-tabs{\n    overflow: visible;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--24-1!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--24-1!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--24-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=0&id=392dae7a&lang=css */ "./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css");

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

/***/ "./resources/js/dashboard/mixins/forms/helper.js":
/*!*******************************************************!*\
  !*** ./resources/js/dashboard/mixins/forms/helper.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/.pnpm/axios@1.8.2/node_modules/axios/index.js");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/.pnpm/vuejs-datepicker@1.6.2_vue@2.7.16/node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
//Library for working with requests


//Event bus for sending and processing global events


//Datepicker component

var formHelper = {
  components: {
    Datepicker: vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    statuses: {
      type: Array,
      "default": function _default() {
        return [{
          title: this.$t('statuses.general.published'),
          value: true
        }, {
          title: this.$t('statuses.general.hidden'),
          value: false
        }];
      }
    }
  },
  data: function data() {
    return {
      instance: '',
      model: {},
      products: [],
      producents: [],
      categories: [],
      banners: [],
      filters: [],
      attributes: [],
      selectedImages: [],
      shippingMethods: [],
      paymentMethods: [],
      orderStatuses: []
    };
  },
  methods: {
    setInstance: function setInstance(instance) {
      this.instance = instance;
    },
    getFormTitle: function getFormTitle(isEdit) {
      if (isEdit) {
        return this.$t('forms.' + this.instance + '.titles.edit');
      } else {
        return this.$t('forms.' + this.instance + '.titles.create');
      }
    },
    getSectionTitle: function getSectionTitle(slug) {
      return this.$t('forms.' + this.instance + '.sections.' + slug + '.label');
    },
    //Newer and more advanced method for retrieving a form section title
    getFormSectionTitle: function getFormSectionTitle(slug) {
      return this.$t('models.' + this.instance + '.form.' + slug);
    },
    //Newer and more advanced method for retrieving a model property name
    getPropertyTitle: function getPropertyTitle(property) {
      return this.$t('models.' + this.instance + '.properties.' + property);
    },
    getFieldLabel: function getFieldLabel(section, field) {
      return this.$t('forms.' + this.instance + '.sections.' + section + '.fields.' + field);
    },
    getProducts: function getProducts(params) {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.product.list, params).then(function (response) {
        _this.products = response.data.data;
      });
    },
    getProducents: function getProducents(params) {
      var _this2 = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.producent.list, params).then(function (response) {
        _this2.producents = response.data.data;
      });
    },
    getCategories: function getCategories(params) {
      var _this3 = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.category.list, params).then(function (response) {
        _this3.categories = response.data.data;
      });
    },
    getBanners: function getBanners(params) {
      var _this4 = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.banner.list, params).then(function (response) {
        _this4.banners = response.data.data;
      });
    },
    getFilters: function getFilters(params) {
      var _this5 = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.filter.list, params).then(function (response) {
        _this5.filters = response.data.data;
      });
    },
    getAttributes: function getAttributes(params) {
      var _this6 = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.attribute.list, params).then(function (response) {
        _this6.attributes = response.data.data;
      });
    },
    getShippingMethods: function getShippingMethods() {
      var _this7 = this;
      var requestUrl = this.API.shippingMethod.list;
      var requestParams = this.defaultSortParams();
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(requestUrl, {
        params: requestParams
      }).then(function (response) {
        _this7.shippingMethods = response.data.data;
      });
    },
    getPaymentMethods: function getPaymentMethods() {
      var _this8 = this;
      var requestUrl = this.API.paymentMethod.list;
      var requestParams = this.defaultSortParams();
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(requestUrl, {
        params: requestParams
      }).then(function (response) {
        _this8.paymentMethods = response.data.data;
      });
    },
    getOrderStatuses: function getOrderStatuses() {
      var _this9 = this;
      var requestUrl = this.API.orderStatus.list;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(requestUrl).then(function (response) {
        _this9.orderStatuses = response.data.data;
      });
    },
    searchProducts: function searchProducts(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      };

      //Search products
      this.getProducts(requestParams);
    },
    searchCategories: function searchCategories(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      };

      //Search products
      this.getCategories(requestParams);
    },
    searchFilters: function searchFilters(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      };

      //Search products
      this.getFilters(requestParams);
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
    getOptions: function getOptions(options) {
      //Get the form's field options by the property name
      return this[options];
    },
    normalizeData: function normalizeData(options) {
      var normalized = [];
      options.forEach(function (option) {
        normalized.push(option.id);
      });
      return normalized;
    }
  },
  created: function created() {},
  mounted: function mounted() {}
};
/* harmony default export */ __webpack_exports__["default"] = (formHelper);

/***/ }),

/***/ "./resources/js/dashboard/static/coupon/coupon.js":
/*!********************************************************!*\
  !*** ./resources/js/dashboard/static/coupon/coupon.js ***!
  \********************************************************/
/*! exports provided: model, validations, formStructure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "model", function() { return model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return validations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formStructure", function() { return formStructure; });
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/.pnpm/vuelidate@0.7.7/node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//Validation library


//Model
var model = {
  title: '',
  coupon_code: '',
  is_percentage: false,
  value: '',
  product_id: '',
  category_id: '',
  start_date: '',
  end_date: '',
  limit: '',
  status: false
};

//Coupon validation params
var validations = {
  model: {
    title: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    coupon_code: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    value: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    start_date: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    end_date: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    limit: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    status: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    }
  }
};

//Form structure
var formStructure = {
  sections: [{
    slug: 'general',
    fields: [{
      model: 'title',
      type: 'text',
      validates: true
    }, {
      model: 'coupon_code',
      type: 'text',
      validates: true
    }, {
      model: 'value',
      type: 'number',
      validates: true
    }, {
      model: 'is_percentage',
      type: 'checkbox'
    }, {
      model: 'start_date',
      type: 'date',
      validates: true
    }, {
      model: 'end_date',
      type: 'date',
      validates: true
    }, {
      model: 'limit',
      type: 'number',
      validates: true
    }, {
      model: 'status',
      type: 'select',
      validates: true,
      labelKey: 'title',
      valueKey: 'value',
      options: 'statuses',
      multiple: false
    }]
  }]
};

/***/ }),

/***/ "./resources/js/dashboard/views/coupon/Form.vue":
/*!******************************************************!*\
  !*** ./resources/js/dashboard/views/coupon/Form.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_392dae7a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=392dae7a */ "./resources/js/dashboard/views/coupon/Form.vue?vue&type=template&id=392dae7a");
/* harmony import */ var _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/coupon/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _Form_vue_vue_type_style_index_0_id_392dae7a_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form.vue?vue&type=style&index=0&id=392dae7a&lang=css */ "./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_392dae7a__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_392dae7a__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/coupon/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/coupon/Form.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/dashboard/views/coupon/Form.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css":
/*!**************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_392dae7a_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--24-1!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--24-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=0&id=392dae7a&lang=css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=style&index=0&id=392dae7a&lang=css");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_392dae7a_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_392dae7a_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_392dae7a_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_392dae7a_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/views/coupon/Form.vue?vue&type=template&id=392dae7a":
/*!************************************************************************************!*\
  !*** ./resources/js/dashboard/views/coupon/Form.vue?vue&type=template&id=392dae7a ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_392dae7a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=392dae7a */ "./node_modules/babel-loader/lib/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/coupon/Form.vue?vue&type=template&id=392dae7a");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_392dae7a__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_392dae7a__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=6.js.map