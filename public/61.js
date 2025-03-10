(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[61],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/setting/Settings.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/setting/Settings.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/images/ImageUpload */ "./resources/js/dashboard/components/images/ImageUpload.vue");
/* harmony import */ var _static_setting_setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/setting/setting */ "./resources/js/dashboard/static/setting/setting.js");
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
//Library for working with requests


//Vue select


//Image uploader


//Settings list


//Applications routes

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_1___default.a,
    ImageUpload: _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      instance: 'setting',
      instanceSlug: 'settings',
      settingsList: _static_setting_setting__WEBPACK_IMPORTED_MODULE_3__["settingsList"],
      options: _static_setting_setting__WEBPACK_IMPORTED_MODULE_3__["options"],
      settings: [],
      API: _mixins_api_api__WEBPACK_IMPORTED_MODULE_4__["API"]
    };
  },
  methods: {
    getOptionsData: function getOptionsData() {
      var component = this;
      this.options.forEach(function (item) {
        component.getData(item.instance);
      });
    },
    getOptions: function getOptions(name) {
      var container = this.options.find(function (item) {
        return item.name === name;
      });
      return container.data;
    },
    getData: function getData(instance, params) {
      var _this = this;
      var items = [];
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API[instance].list, params).then(function (response) {
        items = response.data.data;
        var container = _this.options.find(function (item) {
          return item.instance === instance;
        });
        if (container !== undefined) {
          container.data = items;
        }
      });
    },
    getSettings: function getSettings(params) {
      var _this2 = this;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.API[this.instance].list, params).then(function (response) {
        _this2.settings = response.data.data;

        //Set values for settings
        _this2.setValues();
      });
    },
    setValues: function setValues() {
      var settings = this.settings;
      this.settingsList.forEach(function (setting) {
        var settingItem = settings.find(function (item) {
          return item.slug === setting.slug;
        });
        if (settingItem !== undefined) {
          setting.value = settingItem.content;
        }
      });
    },
    updateSettings: function updateSettings() {
      var _this3 = this;
      var component = this;
      var settings = this.settings;
      var requestUrl = this.API[this.instance].update;
      var requestParams = {
        settings: []
      };
      this.settingsList.forEach(function (setting) {
        var settingItem = settings.find(function (item) {
          return item.slug === setting.slug;
        });
        if (settingItem !== undefined && setting.value !== settingItem.content) {
          var settingObject = {
            id: settingItem.id,
            content: setting.value
          };
          requestParams.settings.push(settingObject);
        }
      });
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this3.showNotification('success', 'request.updatedSuccess', 'success', undefined, true);
        }
      })["catch"](function (error) {
        _this3.showNotification('success', 'request.error', 'danger');
      });
    },
    getSettingName: function getSettingName(slug) {
      return this.$t('settings.' + slug + '.title');
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
    }
  },
  created: function created() {},
  mounted: function mounted() {
    //Get the data for selects
    this.getOptionsData();

    //Get settings values
    this.getSettings();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/setting/Settings.vue?vue&type=template&id=2876a9fc":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/setting/Settings.vue?vue&type=template&id=2876a9fc ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("vx-card", {
    attrs: {
      title: _vm.$t("settings.pageTitle")
    }
  }, [_c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, _vm._l(_vm.settingsList, function (setting, index) {
    return _c("div", {
      key: index,
      staticClass: "vx-row mb-3"
    }, [_c("div", {
      staticClass: "vx-col w-full"
    }, [_c("p", {
      staticClass: "font-bold mb-2"
    }, [_vm._v(_vm._s(_vm.getSettingName(setting.slug)))])]), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-full"
    }, [setting.type === "select" ? _c("vs-select", {
      staticClass: "w-full",
      attrs: {
        autocomplete: "",
        "is-selected": setting.value
      },
      on: {
        "update:isSelected": function updateIsSelected($event) {
          return _vm.$set(setting, "value", $event);
        },
        "update:is-selected": function updateIsSelected($event) {
          return _vm.$set(setting, "value", $event);
        }
      },
      model: {
        value: setting.value,
        callback: function callback($$v) {
          _vm.$set(setting, "value", $$v);
        },
        expression: "setting.value"
      }
    }, _vm._l(_vm.getOptions(setting.options), function (item, index) {
      return _c("vs-select-item", {
        key: index,
        attrs: {
          value: item[setting.valueKey],
          text: item[setting.labelKey]
        }
      });
    }), 1) : _vm._e(), _vm._v(" "), setting.type === "textarea" ? _c("vs-textarea", {
      staticClass: "mb-0",
      model: {
        value: setting.value,
        callback: function callback($$v) {
          _vm.$set(setting, "value", $$v);
        },
        expression: "setting.value"
      }
    }) : _vm._e(), _vm._v(" "), setting.type === "textInput" ? _c("vs-input", {
      staticClass: "w-full mb-0",
      model: {
        value: setting.value,
        callback: function callback($$v) {
          _vm.$set(setting, "value", $$v);
        },
        expression: "setting.value"
      }
    }) : _vm._e(), _vm._v(" "), setting.type === "image" ? _c("image-upload", {
      model: {
        value: setting.value,
        callback: function callback($$v) {
          _vm.$set(setting, "value", $$v);
        },
        expression: "setting.value"
      }
    }) : _vm._e()], 1)]);
  }), 0)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("vs-button", {
    on: {
      click: function click($event) {
        return _vm.updateSettings();
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.update")))])], 1)])])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/dashboard/static/setting/setting.js":
/*!**********************************************************!*\
  !*** ./resources/js/dashboard/static/setting/setting.js ***!
  \**********************************************************/
/*! exports provided: settingsList, options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingsList", function() { return settingsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
//The list of all settings
var settingsList = [{
  slug: 'site_logo',
  type: 'image',
  value: ''
}, {
  slug: 'default_currency',
  type: 'select',
  options: 'currencies',
  labelKey: 'title',
  valueKey: 'code',
  value: ''
}, {
  slug: 'order_status',
  type: 'select',
  options: 'orderStatuses',
  labelKey: 'title',
  valueKey: 'id',
  value: ''
}, {
  slug: 'analytics_code',
  type: 'textarea',
  value: ''
}, {
  slug: 'pixel_code',
  type: 'textarea',
  value: ''
}, {
  slug: 'custom_js',
  type: 'textarea',
  value: ''
}, {
  slug: 'custom_css',
  type: 'textarea',
  value: ''
}, {
  slug: 'fb_url',
  type: 'textInput',
  value: ''
}, {
  slug: 'twitter_url',
  type: 'textInput',
  value: ''
}, {
  slug: 'instagram_url',
  type: 'textInput',
  value: ''
}, {
  slug: 'youtube_url',
  type: 'textInput',
  value: ''
}, {
  slug: 'contact_phone',
  type: 'textInput',
  value: ''
}, {
  slug: 'contact_email',
  type: 'textInput',
  value: ''
}, {
  slug: 'categories_seo_title',
  type: 'textInput',
  value: ''
}, {
  slug: 'categories_seo_keywords',
  type: 'textarea',
  value: ''
}, {
  slug: 'categories_seo_description',
  type: 'textarea',
  value: ''
}, {
  slug: 'home_seo_title',
  type: 'textInput',
  value: ''
}, {
  slug: 'home_seo_keywords',
  type: 'textarea',
  value: ''
}, {
  slug: 'home_seo_description',
  type: 'textarea',
  value: ''
}];
var options = [{
  name: 'currencies',
  instance: 'currency',
  data: []
}, {
  name: 'orderStatuses',
  instance: 'orderStatus',
  data: []
}];

/***/ }),

/***/ "./resources/js/dashboard/views/setting/Settings.vue":
/*!***********************************************************!*\
  !*** ./resources/js/dashboard/views/setting/Settings.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Settings_vue_vue_type_template_id_2876a9fc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=2876a9fc */ "./resources/js/dashboard/views/setting/Settings.vue?vue&type=template&id=2876a9fc");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/setting/Settings.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settings_vue_vue_type_template_id_2876a9fc__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Settings_vue_vue_type_template_id_2876a9fc__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/setting/Settings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/setting/Settings.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/dashboard/views/setting/Settings.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/setting/Settings.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/setting/Settings.vue?vue&type=template&id=2876a9fc":
/*!*****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/setting/Settings.vue?vue&type=template&id=2876a9fc ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_2876a9fc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=template&id=2876a9fc */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/setting/Settings.vue?vue&type=template&id=2876a9fc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_2876a9fc__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_2876a9fc__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=61.js.map