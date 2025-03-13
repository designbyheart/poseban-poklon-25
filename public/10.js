(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/categories/Form.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/categories/Form.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/forms/helper */ "./resources/js/dashboard/mixins/forms/helper.js");
/* harmony import */ var _static_category_category__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/static/category/category */ "./resources/js/dashboard/static/category/category.js");
//Library for working with requests


//Form helper functions


//Category model, validations and types

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__["default"]],
  props: {
    isEditForm: Boolean,
    formModel: {
      type: String,
      "default": "category"
    }
  },
  data: function data() {
    return {
      formStructure: _static_category_category__WEBPACK_IMPORTED_MODULE_2__["formStructure"]
    };
  },
  validations: _static_category_category__WEBPACK_IMPORTED_MODULE_2__["validations"],
  methods: {
    createCategory: function createCategory() {
      var _this = this;
      // let requestParams = this.model;
      var requestParams = Object.assign({}, this.model);
      requestParams.properties = JSON.stringify(this.model.properties);
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(this.API.category.create, requestParams).then(function (response) {
        if (response.data === "success") {
          _this.showNotification("success", "request.createdSuccess", "success");
          _this.afterCreateCallback();
        }
      })["catch"](function (error) {
        _this.showNotification("error", "request.error", "danger");
      });
    },
    updateCategory: function updateCategory() {
      var _this2 = this;
      // let requestParams = this.model;
      var requestParams = Object.assign({}, this.model);
      var category_id = this.$route.params.categoryId;
      requestParams.properties = JSON.stringify(this.model.properties);
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(this.API.category.update + "/" + category_id, requestParams).then(function (response) {
        if (response.data === "success") {
          _this2.showNotification("success", "request.updatedSuccess", "success");
        }
      })["catch"](function (error) {
        _this2.showNotification("error", "request.error", "danger");
      });
    },
    afterCreateCallback: function afterCreateCallback() {
      var component = this;
      setTimeout(function () {
        component.redirectToIndex("categories");
        component.setModel();
      }, 500);
    },
    setModel: function setModel() {
      this.model = Object.assign({}, _static_category_category__WEBPACK_IMPORTED_MODULE_2__["model"]);
    },
    getSingleCategory: function getSingleCategory() {
      var _this3 = this;
      var category_id = this.$route.params.categoryId;
      var requestParams = {
        params: {
          category_id: category_id
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API.category.single, requestParams).then(function (response) {
        _this3.model = response.data;
        _this3.model.filters = _this3.normalizeData(response.data.filters);
        _this3.model.properties = JSON.parse(_this3.model.properties);
      });
    },
    loadData: function loadData() {
      //Get categories list
      this.getCategories({
        params: {
          per_page: 1000
        }
      });

      //Get banners list
      this.getBanners();

      //Get filter list
      this.getFilters();

      //Get the data for editing
      if (this.isEditForm) {
        this.getSingleCategory();
      }
    },
    submitForm: function submitForm() {
      if (!this.$v.$invalid) {
        if (this.isEditForm) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
      } else {
        this.showNotification("error", "validation.invalidForm", "danger");
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/categories/Form.vue?vue&type=template&id=ddffbee6":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/categories/Form.vue?vue&type=template&id=ddffbee6 ***!
  \****************************************************************************************************************************************************************************************************************************************************/
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
  }, _vm._l(_vm.formStructure.sections, function (item, index) {
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
      }) : _vm._e(), _vm._v(" "), field.type === "numberInput" ? _c("vs-input-number", {
        attrs: {
          min: "0",
          label: "Priority:"
        },
        model: {
          value: _vm.model.properties.priority,
          callback: function callback($$v) {
            _vm.$set(_vm.model.properties, "priority", $$v);
          },
          expression: "model.properties.priority"
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
      }) : _vm._e(), _vm._v(" "), field.type === "advancedSelect" ? _c("vs-select", {
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
      }), 1) : _vm._e(), _vm._v(" "), field.type === "select" ? _c("vs-select", {
        staticClass: "w-full",
        attrs: {
          autocomplete: "",
          label: _vm.getFieldLabel(item.slug, field.model),
          multiple: field.multiple,
          "is-selected": _vm.model.properties.visibility
        },
        on: {
          "update:isSelected": function updateIsSelected($event) {
            return _vm.$set(_vm.model.properties, "visibility", $event);
          },
          "update:is-selected": function updateIsSelected($event) {
            return _vm.$set(_vm.model.properties, "visibility", $event);
          }
        },
        model: {
          value: _vm.model.properties.visibility,
          callback: function callback($$v) {
            _vm.$set(_vm.model.properties, "visibility", $$v);
          },
          expression: "model.properties.visibility"
        }
      }, _vm._l(field.options, function (item, index) {
        return _c("vs-select-item", {
          key: index,
          attrs: {
            value: item[field.valueKey],
            text: item[field.labelKey]
          }
        });
      }), 1) : _vm._e(), _vm._v(" "), _c("span", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.validateField(field.model),
          expression: "validateField(field.model)"
        }],
        staticClass: "text-danger text-xs"
      }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]);
    }), 0);
  }), 1), _vm._v(" "), _c("div", {
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
        name: "categories"
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.cancel")))])], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/dashboard/EventBus.js":
/*!********************************************!*\
  !*** ./resources/js/dashboard/EventBus.js ***!
  \********************************************/
/*! exports provided: EventBus, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBus", function() { return EventBus; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();
/* harmony default export */ __webpack_exports__["default"] = (EventBus);

/***/ }),

/***/ "./resources/js/dashboard/mixins/forms/helper.js":
/*!*******************************************************!*\
  !*** ./resources/js/dashboard/mixins/forms/helper.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
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

/***/ "./resources/js/dashboard/static/category/category.js":
/*!************************************************************!*\
  !*** ./resources/js/dashboard/static/category/category.js ***!
  \************************************************************/
/*! exports provided: model, validations, visibility, formStructure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "model", function() { return model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return validations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibility", function() { return visibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formStructure", function() { return formStructure; });
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//Validation library


//Category model
var model = {
  title: "",
  description: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  seo_text: "",
  slug: "",
  parent_id: "",
  banner_id: "",
  filters: [],
  properties: {
    priority: 0,
    visibility: true
  },
  status: false
};

//Category validation params
var validations = {
  model: {
    title: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    description: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    slug: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    }
  }
};

// Properties visibility params
var visibility = [{
  value: true,
  slug: "Visible"
}, {
  value: false,
  slug: "Hidden"
}];

//Category form structure
var formStructure = {
  sections: [{
    slug: "general",
    fields: [{
      label: "Title",
      model: "title",
      type: "text",
      validates: true
    }, {
      label: "Description",
      model: "description",
      type: "textarea"
    }, {
      label: "Slug",
      model: "slug",
      type: "text"
    }]
  }, {
    slug: "connections",
    fields: [{
      label: "Parent category",
      model: "parent_id",
      type: "advancedSelect",
      labelKey: "title",
      valueKey: "id",
      options: "categories",
      multiple: false
    }, {
      label: "Banner",
      model: "banner_id",
      type: "advancedSelect",
      labelKey: "title",
      valueKey: "id",
      options: "banners",
      multiple: false
    }, {
      label: "Filters",
      model: "filters",
      type: "advancedSelect",
      labelKey: "name",
      valueKey: "id",
      options: "filters",
      multiple: true
    }, {
      label: "Visibility",
      model: "properties.visibility",
      type: "select",
      labelKey: "slug",
      valueKey: "value",
      options: visibility,
      multiple: false
    }, {
      label: "Priority",
      model: "properties.priority",
      type: "numberInput"
    }]
  }, {
    slug: "seo",
    fields: [{
      label: "SEO title",
      model: "seo_title",
      type: "text"
    }, {
      label: "SEO description",
      model: "seo_description",
      type: "textarea"
    }, {
      label: "SEO keywords",
      model: "seo_keywords",
      type: "textarea"
    }, {
      label: "SEO text",
      model: "seo_text",
      type: "textarea"
    }]
  }]
};

/***/ }),

/***/ "./resources/js/dashboard/views/categories/Form.vue":
/*!**********************************************************!*\
  !*** ./resources/js/dashboard/views/categories/Form.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_ddffbee6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=ddffbee6 */ "./resources/js/dashboard/views/categories/Form.vue?vue&type=template&id=ddffbee6");
/* harmony import */ var _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/categories/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_ddffbee6__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_ddffbee6__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/categories/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/categories/Form.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/dashboard/views/categories/Form.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/categories/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/categories/Form.vue?vue&type=template&id=ddffbee6":
/*!****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/categories/Form.vue?vue&type=template&id=ddffbee6 ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_ddffbee6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=ddffbee6 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/categories/Form.vue?vue&type=template&id=ddffbee6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_ddffbee6__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_ddffbee6__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=10.js.map