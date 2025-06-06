(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/pages/Login.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//Library for working with requests

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false,
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
  },
  methods: {
    login: function login() {
      document.querySelector('form[name="login"]').submit();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=template&id=b11d2f58":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/pages/Login.vue?vue&type=template&id=b11d2f58 ***!
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
    staticClass: "h-screen flex w-full vx-row no-gutter items-center justify-center",
    attrs: {
      id: "page-login"
    }
  }, [_c("div", {
    staticClass: "vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 sm:m-0 m-4"
  }, [_c("vx-card", [_c("form", {
    attrs: {
      name: "login",
      action: "/login",
      method: "post"
    }
  }, [_c("div", {
    staticClass: "full-page-bg-color",
    attrs: {
      slot: "no-body"
    },
    slot: "no-body"
  }, [_c("div", {
    staticClass: "vx-row no-gutter justify-center items-center"
  }, [_c("div", {
    staticClass: "vx-col w-full d-theme-dark-bg"
  }, [_c("div", {
    staticClass: "p-8"
  }, [_c("div", {
    staticClass: "vx-card__title mb-8"
  }, [_c("h4", {
    staticClass: "mb-4"
  }, [_vm._v(_vm._s(_vm.$t("auth.formTitle")))]), _vm._v(" "), _c("p", [_vm._v(_vm._s(_vm.$t("auth.formSubtitle")))])]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full no-icon-border",
    attrs: {
      icon: "icon icon-user",
      "icon-pack": "feather",
      "label-placeholder": _vm.$t("auth.email"),
      name: "email"
    },
    model: {
      value: _vm.email,
      callback: function callback($$v) {
        _vm.email = $$v;
      },
      expression: "email"
    }
  }), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full mt-6 no-icon-border",
    attrs: {
      type: "password",
      icon: "icon icon-lock",
      "icon-pack": "feather",
      "label-placeholder": _vm.$t("auth.password"),
      name: "password"
    },
    model: {
      value: _vm.password,
      callback: function callback($$v) {
        _vm.password = $$v;
      },
      expression: "password"
    }
  }), _vm._v(" "), _c("input", {
    attrs: {
      type: "hidden",
      name: "_token"
    },
    domProps: {
      value: _vm.csrf
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "flex flex-wrap justify-between my-5"
  }, [_c("vs-checkbox", {
    staticClass: "mb-3",
    model: {
      value: _vm.checkbox_remember_me,
      callback: function callback($$v) {
        _vm.checkbox_remember_me = $$v;
      },
      expression: "checkbox_remember_me"
    }
  }, [_vm._v("\n                                        " + _vm._s(_vm.$t("auth.rememberMe")) + "\n                                    ")]), _vm._v(" "), _c("router-link", {
    attrs: {
      to: "#"
    }
  }, [_vm._v(_vm._s(_vm.$t("auth.forgotPassword")))])], 1), _vm._v(" "), _c("vs-button", {
    staticClass: "float-right mb-3",
    on: {
      click: _vm.login
    }
  }, [_vm._v(_vm._s(_vm.$t("auth.login")) + "\n                                ")]), _vm._v(" "), _c("vs-divider"), _vm._v(" "), _c("div", {
    staticClass: "social-login flex flex-wrap justify-between"
  }, [_c("div", {
    staticClass: "social-login-buttons flex flex-wrap items-center mt-4"
  }, [_c("div", {
    staticClass: "bg-facebook pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4"
  }, [_c("svg", {
    staticClass: "text-white h-4 w-4 svg-inline--fa fa-facebook-f fa-w-9",
    attrs: {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fab",
      "data-icon": "facebook-f",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 264 512"
    }
  }, [_c("path", {
    attrs: {
      fill: "currentColor",
      d: "M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z"
    }
  })])])])])], 1)])])])])])], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#page-login .social-login .bg-facebook {\n  background-color: #1551b1;\n}\n#page-login .social-login .bg-twitter {\n  background-color: #00aaff;\n}\n#page-login .social-login .bg-google {\n  background-color: #4285F4;\n}\n#page-login .social-login .bg-github {\n  background-color: #333;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--25-2!./node_modules/sass-loader/dist/cjs.js??ref--25-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss");

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

/***/ "./resources/js/dashboard/views/pages/Login.vue":
/*!******************************************************!*\
  !*** ./resources/js/dashboard/views/pages/Login.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_b11d2f58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=b11d2f58 */ "./resources/js/dashboard/views/pages/Login.vue?vue&type=template&id=b11d2f58");
/* harmony import */ var _Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/pages/Login.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_vue_vue_type_style_index_0_id_b11d2f58_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss */ "./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_b11d2f58__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_b11d2f58__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/pages/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/pages/Login.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/dashboard/views/pages/Login.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss":
/*!***************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_b11d2f58_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--25-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--25-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=style&index=0&id=b11d2f58&lang=scss");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_b11d2f58_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_b11d2f58_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_b11d2f58_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_25_2_node_modules_sass_loader_dist_cjs_js_ref_25_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_b11d2f58_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/views/pages/Login.vue?vue&type=template&id=b11d2f58":
/*!************************************************************************************!*\
  !*** ./resources/js/dashboard/views/pages/Login.vue?vue&type=template&id=b11d2f58 ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_b11d2f58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=b11d2f58 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/pages/Login.vue?vue&type=template&id=b11d2f58");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_b11d2f58__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_b11d2f58__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=24.js.map