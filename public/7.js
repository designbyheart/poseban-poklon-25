(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/page/Form.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/forms/helper */ "./resources/js/dashboard/mixins/forms/helper.js");
/* harmony import */ var _static_page_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/static/page/page */ "./resources/js/dashboard/static/page/page.js");
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quill/dist/quill.core.css */ "./node_modules/quill/dist/quill.core.css");
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quill/dist/quill.snow.css */ "./node_modules/quill/dist/quill.snow.css");
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! quill/dist/quill.bubble.css */ "./node_modules/quill/dist/quill.bubble.css");
/* harmony import */ var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-quill-editor */ "./node_modules/vue-quill-editor/dist/vue-quill-editor.js");
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_quill_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/images/ImageUpload */ "./resources/js/dashboard/components/images/ImageUpload.vue");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");
//Library for working with requests


//Form helper functions


//Model, validations and types


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
}], ['link', 'image']];

//Image manager


//Events bus


//Open image uploader
function openImageUploader() {
  _EventBus__WEBPACK_IMPORTED_MODULE_8__["default"].$emit('open-image-uploader', true);
}
/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    quillEditor: vue_quill_editor__WEBPACK_IMPORTED_MODULE_6__["quillEditor"],
    ImageUpload: _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  props: {
    isEditForm: Boolean,
    formModel: {
      type: String,
      "default": 'page'
    },
    indexRoute: {
      type: String,
      "default": 'pages'
    }
  },
  data: function data() {
    return {
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
  validations: _static_page_page__WEBPACK_IMPORTED_MODULE_2__["validations"],
  methods: {
    create: function create() {
      var _this = this;
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
      this.model = Object.assign({}, _static_page_page__WEBPACK_IMPORTED_MODULE_2__["model"]);
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
      //Get the data for editing
      if (this.isEditForm) {
        this.getSingleItem();
      }
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
    openImageUploader: function openImageUploader() {
      _EventBus__WEBPACK_IMPORTED_MODULE_8__["default"].$emit('open-image-uploader');
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=template&id=0eb5e80c":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/page/Form.vue?vue&type=template&id=0eb5e80c ***!
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
  return _c("vx-card", {
    attrs: {
      title: _vm.getFormTitle(_vm.isEditForm),
      noShadow: "",
      cardBorder: ""
    }
  }, [_c("vs-tabs", {
    staticClass: "px-0"
  }, [_c("vs-tab", {
    attrs: {
      label: _vm.getSectionTitle("general")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("title")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("title"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.title,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "title", $$v);
      },
      expression: "model.title"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("title"),
      expression: "validateField('title')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("content")))]), _vm._v(" "), _c("quill-editor", {
    ref: "pageQuillEditor",
    attrs: {
      options: _vm.editorOption
    },
    model: {
      value: _vm.model.content,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "content", $$v);
      },
      expression: "model.content"
    }
  }), _vm._v(" "), _c("image-upload", {
    attrs: {
      multiple: false,
      "is-quill-editor": true
    },
    model: {
      value: _vm.uploadedImage,
      callback: function callback($$v) {
        _vm.uploadedImage = $$v;
      },
      expression: "uploadedImage"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("slug")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("slug"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.slug,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "slug", $$v);
      },
      expression: "model.slug"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("slug"),
      expression: "validateField('slug')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("status")))]), _vm._v(" "), _c("vs-select", {
    staticClass: "w-full",
    model: {
      value: _vm.model.status,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "status", $$v);
      },
      expression: "model.status"
    }
  }, _vm._l(_vm.statuses, function (item, index) {
    return _c("vs-select-item", {
      key: index,
      attrs: {
        value: item.value,
        text: item.title
      }
    });
  }), 1)], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("vs-checkbox", {
    model: {
      value: _vm.model.show_in_menu,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "show_in_menu", $$v);
      },
      expression: "model.show_in_menu"
    }
  }, [_c("p", {
    staticClass: "font-bold text-sm"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("showInMenu")))])])], 1)])])]), _vm._v(" "), _c("vs-tab", {
    staticClass: "overflow-visible",
    attrs: {
      label: _vm.getSectionTitle("seo")
    }
  }, [_c("div", {
    staticClass: "con-tab pt-3"
  }, [_c("div", {
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("seoTitle")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("seo_title"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.seo_title,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "seo_title", $$v);
      },
      expression: "model.seo_title"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("seo_title"),
      expression: "validateField('seo_title')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("seoDescription")))]), _vm._v(" "), _c("vs-textarea", {
    model: {
      value: _vm.model.seo_description,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "seo_description", $$v);
      },
      expression: "model.seo_description"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("seoKeywords")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("seo_keywords"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.seo_keywords,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "seo_keywords", $$v);
      },
      expression: "model.seo_keywords"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("seo_keywords"),
      expression: "validateField('seo_keywords')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)])])])], 1), _vm._v(" "), _c("div", {
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--24-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nbody .ql-container{\n    min-height: 450px;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-light']::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-light']::before\n{\n    content: 'Rubik Light';\n    font-family: 'Rubik-light';\n}\n.ql-font-Rubik-light {\n    font-family: 'Rubik-light';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-regular']::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-regular']::before\n{\n    content: 'Rubik regular';\n    font-family: 'Rubik-regular';\n}\n.ql-font-Rubik-regular {\n    font-family: 'Rubik-regular';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-medium']::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-medium']::before\n{\n    content: 'Rubik Medium';\n    font-family: 'Rubik-medium';\n}\n.ql-font-Rubik-medium {\n    font-family: 'Rubik-medium';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-bold']::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-bold']::before\n{\n    content: 'Rubik Bold';\n    font-family: 'Rubik-bold';\n}\n.ql-font-Rubik-bold {\n    font-family: 'Rubik-bold';\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--24-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--24-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--24-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--24-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css");

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

/***/ "./resources/js/dashboard/static/page/page.js":
/*!****************************************************!*\
  !*** ./resources/js/dashboard/static/page/page.js ***!
  \****************************************************/
/*! exports provided: model, validations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "model", function() { return model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return validations; });
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//Validation library


//Model
var model = {
  title: "",
  content: "",
  slug: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  status: false,
  show_in_menu: false
};

//Shipping method validation params
var validations = {
  model: {
    title: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    slug: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    }
  }
};

/***/ }),

/***/ "./resources/js/dashboard/views/page/Form.vue":
/*!****************************************************!*\
  !*** ./resources/js/dashboard/views/page/Form.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_0eb5e80c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=0eb5e80c */ "./resources/js/dashboard/views/page/Form.vue?vue&type=template&id=0eb5e80c");
/* harmony import */ var _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/page/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _Form_vue_vue_type_style_index_0_id_0eb5e80c_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css */ "./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_0eb5e80c__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_0eb5e80c__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/page/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/page/Form.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/dashboard/views/page/Form.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_0eb5e80c_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--24-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--24-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=style&index=0&id=0eb5e80c&lang=css");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_0eb5e80c_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_0eb5e80c_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_0eb5e80c_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_24_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_24_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_0eb5e80c_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/views/page/Form.vue?vue&type=template&id=0eb5e80c":
/*!**********************************************************************************!*\
  !*** ./resources/js/dashboard/views/page/Form.vue?vue&type=template&id=0eb5e80c ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_0eb5e80c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=0eb5e80c */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/page/Form.vue?vue&type=template&id=0eb5e80c");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_0eb5e80c__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_0eb5e80c__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=7.js.map