(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_loader_index_js_css_loader_index_js_ref_24_1_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_24_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../style-loader!../../../../../css-loader??ref--24-1!../../../../vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../postcss-loader/src??ref--24-2!./vue-multiselect.min.css?vue&type=style&index=0&lang=css&external */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external");
/* harmony import */ var _style_loader_index_js_css_loader_index_js_ref_24_1_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_24_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_index_js_css_loader_index_js_ref_24_1_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_24_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _style_loader_index_js_css_loader_index_js_ref_24_1_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_24_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _style_loader_index_js_css_loader_index_js_ref_24_1_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_24_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      "no-shadow": "",
      "card-border": ""
    }
  }, [_c("vs-tabs", {
    staticClass: "px-0"
  }, [_c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("general")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("title")) + "\n            ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.title,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "title", $$v);
      },
      expression: "product.title"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.description.$invalid,
      expression: "$v.product.description.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("description")) + "\n            ")]), _vm._v(" "), _c("quill-editor", {
    ref: "pageQuillEditor",
    attrs: {
      options: _vm.editorOption
    },
    model: {
      value: _vm.product.description,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "description", $$v);
      },
      expression: "product.description"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.description.$invalid,
      expression: "$v.product.description.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("short_description")) + "\n            ")]), _vm._v(" "), _c("quill-editor", {
    ref: "pageQuillEditor",
    attrs: {
      options: _vm.editorOption
    },
    model: {
      value: _vm.product.short_description,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "short_description", $$v);
      },
      expression: "product.short_description"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.short_description.$invalid,
      expression: "$v.product.short_description.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("voucher_description")) + "\n            ")]), _vm._v(" "), _c("vs-textarea", {
    staticClass: "mb-0",
    model: {
      value: _vm.product.voucher_description,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "voucher_description", $$v);
      },
      expression: "product.voucher_description"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.voucher_description.$invalid,
      expression: "$v.product.voucher_description.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("za_koga")) + "\n            ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.za_koga,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "za_koga", $$v);
      },
      expression: "product.za_koga"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("slug")) + "\n            ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.slug,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "slug", $$v);
      },
      expression: "product.slug"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.slug.$invalid,
      expression: "$v.product.slug.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("status")) + "\n            ")]), _vm._v(" "), _c("vs-select", {
    staticClass: "w-full",
    model: {
      value: _vm.product.status,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "status", $$v);
      },
      expression: "product.status"
    }
  }, _vm._l(_vm.statuses, function (item, index) {
    return _c("vs-select-item", {
      key: index,
      attrs: {
        value: item.value,
        text: item.title
      }
    });
  }), 1)], 1)])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("price")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("price")) + "\n            ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "number",
      danger: _vm.$v.product.price.$invalid,
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.product.price,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "price", $$v);
      },
      expression: "product.price"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.price.$invalid,
      expression: "$v.product.price.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("company_price")) + "\n            ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "number",
      danger: _vm.$v.product.company_price.$invalid,
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.product.company_price,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "company_price", $$v);
      },
      expression: "product.company_price"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.company_price.$invalid,
      expression: "$v.product.company_price.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("connections")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("producentId")) + "\n            ")]), _vm._v(" "), _c("vs-select", {
    staticClass: "w-full",
    model: {
      value: _vm.product.producent_id,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "producent_id", $$v);
      },
      expression: "product.producent_id"
    }
  }, _vm._l(_vm.producents, function (item, index) {
    return _c("vs-select-item", {
      key: index,
      attrs: {
        value: item.id,
        text: item.title
      }
    });
  }), 1), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.producent_id.$invalid,
      expression: "$v.product.producent_id.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n              " + _vm._s(_vm.getPropertyTitle("categories")) + "\n            ")]), _vm._v(" "), _c("v-select", {
    attrs: {
      label: "title",
      multiple: "",
      options: _vm.categories,
      reduce: function reduce(category) {
        return category.id;
      }
    },
    on: {
      search: _vm.searchCategories
    },
    model: {
      value: _vm.selectedCategories,
      callback: function callback($$v) {
        _vm.selectedCategories = $$v;
      },
      expression: "selectedCategories"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.selectedCategories.$invalid,
      expression: "$v.selectedCategories.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("attributes")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.productFilters.length > 0,
      expression: "productFilters.length > 0"
    }],
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-1/6"
  }, [_c("p", {
    staticClass: "font-bold text-sm"
  }, [_vm._v("\n                  " + _vm._s(_vm.getPropertyTitle("filter.title")) + "\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-2/3"
  }, [_c("p", {
    staticClass: "font-bold text-sm"
  }, [_vm._v("\n                  " + _vm._s(_vm.getPropertyTitle("filter.attributes")) + "\n                ")])])]), _vm._v(" "), _vm._l(_vm.productFilters, function (filter, index) {
    return _c("div", {
      key: index,
      staticClass: "vx-row mb-3"
    }, [_c("div", {
      staticClass: "vx-col w-1/6"
    }, [_c("p", {
      staticClass: "font-bold text-sm"
    }, [_vm._v("\n                  " + _vm._s(filter.name) + "\n                ")])]), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-2/3"
    }, [_c("v-select", {
      key: filter.name,
      attrs: {
        label: "name",
        multiple: "",
        options: filter.attributes,
        reduce: function reduce(attribute) {
          return {
            id: attribute.id,
            name: attribute.name
          };
        }
      },
      model: {
        value: filter.selected,
        callback: function callback($$v) {
          _vm.$set(filter, "selected", $$v);
        },
        expression: "filter.selected"
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-1/6"
    }, [_c("vs-button", {
      attrs: {
        color: "danger",
        icon: "delete"
      },
      on: {
        click: function click($event) {
          return _vm.removeFilter(index);
        }
      }
    })], 1)]);
  })], 2), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-2/3 mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-3"
  }, [_vm._v("\n                  " + _vm._s(_vm.getPropertyTitle("filter.search")) + "\n                ")]), _vm._v(" "), _c("v-select", {
    attrs: {
      label: "name",
      options: _vm.filters,
      reduce: function reduce(filter) {
        return {
          id: filter.id,
          name: filter.name,
          attributes: filter.attributes
        };
      }
    },
    on: {
      search: _vm.searchFilters
    },
    model: {
      value: _vm.selectedFilter,
      callback: function callback($$v) {
        _vm.selectedFilter = $$v;
      },
      expression: "selectedFilter"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/3 mb-3 flex items-end"
  }, [_c("vs-button", {
    on: {
      click: function click($event) {
        return _vm.addFilter();
      }
    }
  }, [_vm._v("\n                  " + _vm._s(_vm.$t("actions.addNew")) + "\n                ")])], 1)])])])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("properties")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("visitors")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.properties.visitors,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "visitors", $$v);
      },
      expression: "product.properties.visitors"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("location")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.properties.location,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "location", $$v);
      },
      expression: "product.properties.location"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("duration")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.properties.duration,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "duration", $$v);
      },
      expression: "product.properties.duration"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("weather")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.properties.weather,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "weather", $$v);
      },
      expression: "product.properties.weather"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("zaGledaoce")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.properties.za_gledaoce,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "za_gledaoce", $$v);
      },
      expression: "product.properties.za_gledaoce"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("dressCode")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.properties.dress_code,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "dress_code", $$v);
      },
      expression: "product.properties.dress_code"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("additionalInformation")) + "\n              ")]), _vm._v(" "), _c("vs-textarea", {
    staticClass: "w-full",
    model: {
      value: _vm.product.properties.additional_info,
      callback: function callback($$v) {
        _vm.$set(_vm.product.properties, "additional_info", $$v);
      },
      expression: "product.properties.additional_info"
    }
  })], 1)])])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("images")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-0"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("image-upload", {
    attrs: {
      multiple: ""
    },
    model: {
      value: _vm.selectedImages,
      callback: function callback($$v) {
        _vm.selectedImages = $$v;
      },
      expression: "selectedImages"
    }
  })], 1)])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("seo")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("seoTitle")) + "\n              ")]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.product.seo_title,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "seo_title", $$v);
      },
      expression: "product.seo_title"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("seoDescription")) + "\n              ")]), _vm._v(" "), _c("vs-textarea", {
    staticClass: "mb-0",
    model: {
      value: _vm.product.seo_description,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "seo_description", $$v);
      },
      expression: "product.seo_description"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("seoKeywords")) + "\n              ")]), _vm._v(" "), _c("vs-textarea", {
    staticClass: "mb-0",
    model: {
      value: _vm.product.seo_keywords,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "seo_keywords", $$v);
      },
      expression: "product.seo_keywords"
    }
  })], 1)])])])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("versions")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.versions.length > 0,
      expression: "versions.length > 0"
    }],
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-2/3"
  }, [_c("p", {
    staticClass: "font-bold text-sm"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("version.title")) + "\n              ")])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/6"
  }, [_c("p", {
    staticClass: "font-bold text-sm"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("version.price")) + "\n              ")])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/6"
  }, [_c("p", {
    staticClass: "font-bold text-sm"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("version.actions")) + "\n              ")])])]), _vm._v(" "), _vm._l(_vm.versions, function (version, index) {
    return _c("div", {
      key: index,
      staticClass: "vx-row mb-3 items-center"
    }, [_c("div", {
      staticClass: "vx-col w-2/3"
    }, [_c("p", [_vm._v(_vm._s(version.title))])]), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-1/6"
    }, [_c("p", [_vm._v(_vm._s(version.price + " " + _vm.defaultCurrency))])]), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-1/6"
    }, [_c("vs-button", {
      attrs: {
        color: "danger",
        icon: "delete"
      },
      on: {
        click: function click($event) {
          return _vm.removeVersion(version.id);
        }
      }
    })], 1)]);
  }), _vm._v(" "), _c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-2/3 mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-3"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("version.search")) + "\n              ")]), _vm._v(" "), _c("v-select", {
    attrs: {
      label: "title",
      options: _vm.products,
      reduce: function reduce(version) {
        return {
          id: version.id,
          title: version.title,
          price: version.price
        };
      }
    },
    on: {
      search: _vm.searchProducts
    },
    model: {
      value: _vm.selectedVersion,
      callback: function callback($$v) {
        _vm.selectedVersion = $$v;
      },
      expression: "selectedVersion"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/3 mb-3 flex items-end"
  }, [_c("vs-button", {
    on: {
      click: function click($event) {
        return _vm.addVersion();
      }
    }
  }, [_vm._v("\n                " + _vm._s(_vm.$t("actions.addNew")) + "\n              ")])], 1)])], 2)])]), _vm._v(" "), _c("vs-tab", {
    attrs: {
      label: _vm.getFormSectionTitle("settings")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("viewCount")) + "\n              ")]), _vm._v(" "), _c("div", {
    staticClass: "w-2/3"
  }, [_c("vs-input-number", {
    attrs: {
      min: "0"
    },
    model: {
      value: _vm.product.view_count,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "view_count", $$v);
      },
      expression: "product.view_count"
    }
  })], 1), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.view_count.$invalid,
      expression: "$v.product.view_count.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("likeCount")) + "\n              ")]), _vm._v(" "), _c("div", {
    staticClass: "w-2/3"
  }, [_c("vs-input-number", {
    attrs: {
      min: "0"
    },
    model: {
      value: _vm.product.like_count,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "like_count", $$v);
      },
      expression: "product.like_count"
    }
  })], 1), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.$v.product.like_count.$invalid,
      expression: "$v.product.like_count.$invalid"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v("\n                " + _vm._s(_vm.getPropertyTitle("type")) + "\n              ")]), _vm._v(" "), _c("vs-select", {
    staticClass: "w-full",
    model: {
      value: _vm.product.type,
      callback: function callback($$v) {
        _vm.$set(_vm.product, "type", $$v);
      },
      expression: "product.type"
    }
  }, _vm._l(_vm.types, function (item, index) {
    return _c("vs-select-item", {
      key: index,
      attrs: {
        value: item.slug,
        text: item.title
      }
    });
  }), 1)], 1)])])])])], 1), _vm._v(" "), _c("div", {
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
  }, [_vm._v("\n        " + _vm._s(_vm.$t("actions.create")) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm.isEditForm ? _c("vs-button", {
    staticClass: "mr-3 mb-2",
    attrs: {
      color: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.submitForm();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t("actions.update")) + "\n      ")]) : _vm._e(), _vm._v(" "), _c("vs-button", {
    staticClass: "mb-2",
    attrs: {
      color: "danger",
      type: "border",
      to: {
        name: _vm.indexRoute
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t("actions.cancel")) + "\n      ")])], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/.pnpm/axios@1.8.2/node_modules/axios/index.js");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");
/* harmony import */ var _static_product_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/static/product/product */ "./resources/js/dashboard/static/product/product.js");
/* harmony import */ var _mixins_forms_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/mixins/forms/helper */ "./resources/js/dashboard/mixins/forms/helper.js");
/* harmony import */ var _components_vx_card_VxCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/vx-card/VxCard */ "./resources/js/dashboard/components/vx-card/VxCard.vue");
/* harmony import */ var _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/images/ImageUpload */ "./resources/js/dashboard/components/images/ImageUpload.vue");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-select */ "./node_modules/.pnpm/vue-select@3.20.4_vue@2.7.16/node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! quill/dist/quill.core.css */ "./node_modules/quill/dist/quill.core.css");
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! quill/dist/quill.snow.css */ "./node_modules/quill/dist/quill.snow.css");
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! quill/dist/quill.bubble.css */ "./node_modules/quill/dist/quill.bubble.css");
/* harmony import */ var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue-quill-editor */ "./node_modules/.pnpm/vue-quill-editor@3.0.6/node_modules/vue-quill-editor/dist/vue-quill-editor.js");
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//Library for working with requests


//Event bus for sending and processing global events


//Product model, validations and types


//Form helper functions


//Vuesax card component


//Image manager


//Vue select


//Quill editor





//Fonts list
var fontsList = ['Rubik-light', 'Rubik-regular', 'Rubik-medium', 'Rubik-bold'];

// Set toolbar options
var toolbarOptions = [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{
  'header': 1
}, {
  'header': 2
}], [{
  'list': 'ordered'
}, {
  'list': 'bullet'
}], [{
  'script': 'sub'
}, {
  'script': 'super'
}], [{
  'indent': '-1'
}, {
  'indent': '+1'
}], [{
  'size': ['small', false, 'large', 'huge']
}], [{
  'header': [1, 2, 3, 4, 5, 6, false]
}], [{
  'color': []
}, {
  'background': []
}], [{
  'align': []
}], ['link']];

//Open image uploader
function openImageUploader() {
  _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].$emit('open-image-uploader', true);
}
/* harmony default export */ __webpack_exports__["default"] = ({
  components: _defineProperty({
    VxCard: _components_vx_card_VxCard__WEBPACK_IMPORTED_MODULE_4__["default"],
    ImageUpload: _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_5__["default"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_6___default.a,
    quillEditor: vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["quillEditor"]
  }, "ImageUpload", _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_5__["default"]),
  mixins: [_mixins_forms_helper__WEBPACK_IMPORTED_MODULE_3__["default"]],
  props: {
    isEditForm: Boolean,
    formModel: {
      type: String,
      "default": 'product'
    },
    indexRoute: {
      type: String,
      "default": 'products'
    },
    statuses: {
      type: Array,
      "default": function _default() {
        return [{
          title: 'Published',
          value: true
        }, {
          title: 'Hidden',
          value: false
        }];
      }
    }
  },
  data: function data() {
    return {
      product: _static_product_product__WEBPACK_IMPORTED_MODULE_2__["model"],
      defaultCurrency: applicationParams.defaultCurrency,
      selectedCategories: [],
      selectedFilter: {},
      selectedImages: [],
      productFilters: [],
      types: _static_product_product__WEBPACK_IMPORTED_MODULE_2__["productTypes"],
      versions: [],
      selectedVersion: {
        id: '',
        title: ''
      },
      // Quill Option
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function image(value) {
                if (value) {
                  openImageUploader();
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        },
        theme: 'snow'
      },
      uploadedImage: ''
    };
  },
  computed: {
    editor: function editor() {
      return this.$refs.pageQuillEditor.quill;
    }
  },
  watch: {
    'uploadedImage': function uploadedImage(images) {
      var quill = this.editor;

      // Get cursor location
      var length = quill.getSelection().index;

      // Insert image at cursor location
      quill.insertEmbed(length, 'image', images[0].url);

      // Set cursor to the end
      quill.setSelection(length + 1);
    }
  },
  validations: _static_product_product__WEBPACK_IMPORTED_MODULE_2__["validations"],
  mounted: function mounted() {
    //Load necessary data
    this.loadData();
  },
  created: function created() {
    //Set an instance for the form rendering
    this.setInstance(this.formModel);

    //Listen to the events
    this.listenEvents();
  },
  methods: {
    //Products
    createProduct: function createProduct() {
      var _this = this;
      //Prepare product data
      this.assembleProduct();
      var requestParams = this.product;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(this.API[this.instance].create, requestParams).then(function (response) {
        if (response.data.message === 'success') {
          _this.showNotification('success', 'request.createdSuccess', 'success');
          var id = response.data.id;

          //Refresh the form
          _this.getSingleProduct(id);

          //Save product versions
          _this.createVersions(id);

          //Change the form type
          _this.isEditForm = true;
        } else {
          _this.showNotification('error', 'request.error', 'danger');
        }
      });
    },
    updateProduct: function updateProduct() {
      var _this2 = this;
      //Prepare product data
      this.assembleProduct();
      var requestParams = this.product;
      var product_id = this.product.id;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(this.API[this.instance].update + '/' + product_id, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this2.showNotification('success', 'request.updatedSuccess', 'success');
        } else {
          _this2.showNotification('error', 'request.error', 'danger');
        }
      });
    },
    getSingleProduct: function getSingleProduct(id) {
      var _this3 = this;
      var product_id = id;
      if (id === undefined) {
        product_id = this.$route.params.productId;
      }
      var requestParams = {
        params: {
          product_id: product_id
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API[this.instance].single, requestParams).then(function (response) {
        _this3.product = response.data;
        _this3.product.properties = JSON.parse(response.data.properties);
        _this3.selectedCategories = _this3.normalizeData(response.data.categories);
        _this3.selectedProducent = response.data.producent;
        _this3.versions = response.data.children;
        _this3.updateImages(response.data.images);
        _this3.prepareAttributes();
      });
    },
    assembleProduct: function assembleProduct() {
      var product = this.product;

      //Images
      product.images = [];
      this.selectedImages.forEach(function (image) {
        product.images.push(image.id);
      });

      //Categories
      product.categories = this.selectedCategories;

      //Attributes
      var attributes = [];
      this.productFilters.forEach(function (filter) {
        filter.selected.forEach(function (attribute) {
          attributes.push(attribute.id);
        });
      });
      this.product.attributes = attributes;
    },
    //Product versions
    addVersion: function addVersion() {
      var versionId = this.selectedVersion.id;

      //Push selected version to versions
      if (versionId !== '') {
        var exisitngVersion = this.versions.find(function (item) {
          return item.id === versionId;
        });
        if (exisitngVersion === undefined) {
          var productId = this.product.id;
          if (productId !== versionId || productId === undefined) {
            this.versions.push(this.selectedVersion);
            if (this.isEditForm) {
              //Save a version
              this.saveVersion(productId, versionId);
            }
          }
        }
      }
    },
    removeVersion: function removeVersion(id) {
      var _this4 = this;
      var version = this.versions.find(function (item) {
        return item.id === id;
      });
      var position = this.versions.indexOf(version);
      if (this.isEditForm) {
        var requestBase = this.API[this.instance].update;
        var requestUrl = requestBase + '/' + version.id;
        var requestParams = {
          product_id: null
        };
        axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(requestUrl, requestParams).then(function (response) {
          if (response.data === 'success') {
            _this4.showNotification('success', 'request.removedSuccess', 'success', 'productVersion');
          }
        })["catch"](function (error) {
          _this4.showNotification('success', 'request.error', 'danger');
        });
      }
      this.versions.splice(position, 1);
    },
    createVersions: function createVersions(id) {
      var product_id = id;
      this.versions.forEach(function (version) {
        //Save a version
        this.saveVersion(product_id, version.id);
      });
    },
    saveVersion: function saveVersion(product_id, version_id) {
      var _this5 = this;
      var requestBase = this.API[this.instance].update;
      var requestUrl = requestBase + '/' + version_id;
      var requestParams = {
        product_id: product_id
      };
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this5.showNotification('success', 'request.addedSuccess', 'success', 'productVersion');
        }
      })["catch"](function (error) {
        _this5.showNotification('success', 'request.error', 'danger');
      });
    },
    //Filters and attributes
    addFilter: function addFilter() {
      var selectedFilter = this.selectedFilter;
      var filterId = selectedFilter.id;
      var filter = {
        id: filterId,
        name: selectedFilter.name,
        attributes: selectedFilter.attributes,
        selected: []
      };

      //Push selected filter to the list of product filters
      if (filterId !== '') {
        var exisitngFilter = this.productFilters.find(function (item) {
          return item.id === filterId;
        });
        if (exisitngFilter === undefined) {
          this.productFilters.push(filter);
        }
      }
    },
    removeFilter: function removeFilter(index) {
      var filter = this.productFilters[index];
      filter.selected = [];
      this.productFilters.splice(index, 1);
    },
    prepareAttributes: function prepareAttributes() {
      var filters = [];
      this.product.attributes.forEach(function (attribute) {
        var attributeItem = {
          id: attribute.id,
          name: attribute.name
        };
        var filter = attribute.filter;
        var existingFilter = filters.find(function (item) {
          return item.id === filter.id;
        });
        if (existingFilter === undefined) {
          filters.push({
            id: filter.id,
            name: filter.name,
            attributes: filter.attributes,
            selected: [attributeItem]
          });
        } else {
          existingFilter.selected.push(attributeItem);
        }
      });
      this.productFilters = filters;
    },
    //Images
    removeImage: function removeImage(id) {
      var selectedImages = this.selectedImages;
      var existingImage = selectedImages.find(function (item) {
        return item.id === id;
      });
      if (existingImage) {
        var position = selectedImages.indexOf(existingImage);
        selectedImages.splice(position, 1);
        this.sendEvents();
      }
    },
    sendEvents: function sendEvents() {
      //Send events
      _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].$emit('images-changed', this.selectedImages);
    },
    listenEvents: function listenEvents() {
      //Listen to the events
      _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].$on('images-selected', this.updateImages);
    },
    updateImages: function updateImages(images) {
      this.selectedImages = images;
    },
    loadData: function loadData() {
      //Get producents list
      this.getProducents({
        params: {
          per_page: 1000
        }
      });

      //Get filter list with attributes
      this.getFilters({
        params: {
          per_page: 1000
        }
      });

      //Get categories list
      this.getCategories({
        params: {
          per_page: 1000
        }
      });

      //Get list of products
      this.searchProducts();

      //Get the product for editing
      if (this.isEditForm) {
        this.getSingleProduct();
      }
    },
    submitForm: function submitForm() {
      if (!this.$v.$invalid) {
        if (this.isEditForm) {
          this.updateProduct();
        } else {
          this.createProduct();
        }
      } else {
        this.showNotification('error', 'validation.invalidForm', 'danger');
      }
    },
    openImageUploader: function openImageUploader() {
      _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].$emit('open-image-uploader');
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--24-1!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:40px;height:38px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px;vertical-align:top}.multiselect__input::-moz-placeholder{color:#35495e}.multiselect__input::placeholder{color:#35495e}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:5px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver;background:inherit}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none}.multiselect__option--group{background:#ededed;color:#35495e}.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff}.multiselect__option--group.multiselect__option--highlight:after{background:#35495e}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede}.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect-enter-active,.multiselect-leave-active{transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top}[dir=rtl] .multiselect{text-align:right}[dir=rtl] .multiselect__select{right:auto;left:1px}[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px}[dir=rtl] .multiselect__content{text-align:right}[dir=rtl] .multiselect__option:after{right:auto;left:0}[dir=rtl] .multiselect__clear{right:auto;left:12px}[dir=rtl] .multiselect__spinner{right:auto;left:1px}@keyframes spinning{0%{transform:rotate(0)}to{transform:rotate(2turn)}}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--24-1!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.abr-form-images .abr-form-image{\n    width: 24%;\n    height: 200px;\n    margin-right: 1%;\n    margin-bottom: 20px;\n    position: relative;\n}\n.abr-form-images .abr-form-image img{\n    height: 100%;\n}\n.abr-form-images .abr-form-image .abr-image-btn{\n    width: 35px;\n    height: 35px;\n    color: white;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    top: 0.5rem;\n    right: 0.5rem;\n    cursor: pointer;\n}\nbody .con-vs-tabs, body .con-vs-tabs .con-slot-tabs{\n    overflow: visible;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--24-1!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../css-loader??ref--24-1!../../../../vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../postcss-loader/src??ref--24-2!./vue-multiselect.min.css?vue&type=style&index=0&lang=css&external */ "./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--24-1!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--24-1!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--24-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=1&id=001a6476&lang=css */ "./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css");

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

/***/ "./resources/js/dashboard/static/product/product.js":
/*!**********************************************************!*\
  !*** ./resources/js/dashboard/static/product/product.js ***!
  \**********************************************************/
/*! exports provided: productTypes, productProperties, model, validations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productTypes", function() { return productTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productProperties", function() { return productProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "model", function() { return model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return validations; });
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/.pnpm/vuelidate@0.7.7/node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//Validation library


//Product types list
var productTypes = [{
  title: "Product",
  slug: "product"
}, {
  title: "Gift Card",
  slug: "gift_card"
}];

//Product properties model
var productProperties = {
  additional_info: "",
  za_gledaoce: "",
  weather: "",
  visitors: "",
  duration: "",
  dress_code: ""
};

//Product model
var model = {
  title: "",
  description: "",
  short_description: "",
  voucher_description: "",
  za_koga: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  price: "",
  company_price: "",
  slug: "",
  view_count: "0",
  like_count: "0",
  status: false,
  product_id: "",
  producent_id: "",
  type: productTypes[0].slug,
  attributes: [],
  categories: [],
  images: [],
  properties: productProperties
};

//Product validation params
var validations = {
  product: {
    title: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    description: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    short_description: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    voucher_description: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    price: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    company_price: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    view_count: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    like_count: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    producent_id: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    slug: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    }
  },
  selectedCategories: {
    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
  }
};

/***/ }),

/***/ "./resources/js/dashboard/views/products/Form.vue":
/*!********************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_001a6476__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=001a6476 */ "./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476");
/* harmony import */ var _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var vue_multiselect_dist_vue_multiselect_min_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external */ "./node_modules/.pnpm/vue-multiselect@2.1.9/node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&external");
/* harmony import */ var _Form_vue_vue_type_style_index_1_id_001a6476_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form.vue?vue&type=style&index=1&id=001a6476&lang=css */ "./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_001a6476__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_001a6476__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/products/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css":
/*!****************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_id_001a6476_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--24-1!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--24-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=1&id=001a6476&lang=css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&id=001a6476&lang=css");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_id_001a6476_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_id_001a6476_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_id_001a6476_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_id_001a6476_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476":
/*!**************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476 ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_001a6476__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=001a6476 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/.pnpm/vue-loader@15.11.1_css-loader@1.0.1_webpack@4.47.0__lodash@4.17.21_vue-template-compiler@2.7.16_webpack@4.47.0/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_001a6476__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_pnpm_vue_loader_15_11_1_css_loader_1_0_1_webpack_4_47_0_lodash_4_17_21_vue_template_compiler_2_7_16_webpack_4_47_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_001a6476__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=5.js.map