(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_api_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/api/api.js */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var vue_filepond__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-filepond */ "./node_modules/vue-filepond/dist/vue-filepond.js");
/* harmony import */ var vue_filepond__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_filepond__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! filepond/dist/filepond.min.css */ "./node_modules/filepond/dist/filepond.min.css");
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! filepond-plugin-file-validate-type */ "./node_modules/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js");
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! filepond-plugin-file-validate-size */ "./node_modules/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js");
/* harmony import */ var filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");


//Application routes


// Import Vue FilePond


// Import FilePond styles


//FilePond plugins



// Create component
var FilePond = vue_filepond__WEBPACK_IMPORTED_MODULE_2___default()(filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_4___default.a, filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_5___default.a);

//Events bus

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ImageUpload",
  components: {
    FilePond: FilePond
  },
  props: {
    per_page: {
      type: Number,
      "default": 20
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    isQuillEditor: {
      type: Boolean,
      "default": false
    },
    previewWidth: {
      type: String,
      "default": '24%'
    },
    maxFileSize: {
      type: String,
      "default": '1MB'
    },
    allowedFileTypes: {
      type: String,
      "default": 'image/jpeg, image/png, image/svg+xml'
    }
  },
  data: function data() {
    return {
      popupActive: false,
      uploadPopupActive: false,
      uploadLabel: 'Drag & Drop your image or <span class="filepond--label-action"> Browse </span>',
      uploadUrl: '',
      files: [],
      images: [],
      currentImage: {},
      selectedImages: [],
      requestParams: {
        per_page: this.per_page,
        sort_key: 'created_at',
        sort_order: 'desc'
      },
      pagination: {
        currentPage: 1,
        nextPageUrl: '',
        totalPages: 1
      },
      loadedImages: [],
      API: _mixins_api_api_js__WEBPACK_IMPORTED_MODULE_1__["API"]
    };
  },
  watch: {
    'pagination.currentPage': function paginationCurrentPage(value, oldValue) {
      this.getImages();
    },
    '$attrs.value': function $attrsValue(value, oldValue) {
      this.setData();
    }
  },
  methods: {
    hideLoad: function hideLoad(index) {
      this.loadedImages.push(index);
      if (this.loadedImages.length === this.images.length) {
        this.$vs.loading.close('#abr-images > .con-vs-loading');
      }
    },
    getImages: function getImages() {
      var _this = this;
      this.showLoading();
      var request_url = this.API.image.list;
      var page = this.pagination.currentPage;
      if (this.pagination.nextPageUrl != '') {
        request_url = request_url + '?page=' + page;
      }

      //Clear the loaded images list
      this.images = [];
      this.loadedImages = [];
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(request_url, {
        params: this.requestParams
      }).then(function (response) {
        _this.images = response.data.data;
        _this.pagination.nextPageUrl = response.data.next_page_url;
        _this.pagination.totalPages = response.data.last_page;
      });
    },
    imageUploaded: function imageUploaded() {
      this.getImages();
    },
    selectImage: function selectImage(image) {
      //Set current image for the image form
      this.setCurrentImage(image);
      var selectedImages = this.selectedImages;
      var imagesCount = selectedImages.length;
      var multipleUpload = this.multiple;
      var existingImage = selectedImages.find(function (item) {
        return item.id === image.id;
      });
      if (this.isEmpty(existingImage)) {
        if (multipleUpload) {
          this.selectedImages.push(image);
        } else {
          this.selectedImages.splice(0, 1);
          this.selectedImages.push(image);
        }
      }
      if (imagesCount < 1 || multipleUpload) {
        var _existingImage = selectedImages.find(function (item) {
          return item.id === image.id;
        });
        if (this.isEmpty(_existingImage)) {
          this.selectedImages.push(image);
        }
      }

      //Send the selected image
      this.handleSelect();
    },
    isSelected: function isSelected(image) {
      var selectedImage = this.selectedImages.find(function (item) {
        return item.id === image;
      });
      if (selectedImage) {
        return true;
      }
    },
    updateImage: function updateImage(image) {
      var _this2 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(this.API.image.update + '/' + image.id, image).then(function (response) {
        if (response.data === 'success') {
          _this2.showNotification('success', 'request.updatedSuccess', 'success');
        } else {
          _this2.showNotification('error', 'request.error', 'danger');
        }
      });
    },
    removeImage: function removeImage(image) {
      var selectedImages = this.selectedImages;
      var existingImage = selectedImages.find(function (item) {
        return item.id === image.id;
      });
      if (existingImage !== undefined) {
        var selectedPosition = selectedImages.indexOf(existingImage);
        selectedImages.splice(selectedPosition, 1);
      }
      if (this.currentImage.id === image.id) {
        this.currentImage = {};
      }
    },
    deleteImage: function deleteImage(image) {
      var _this3 = this;
      this.removeImage(image);
      var images = this.images;
      var existingImage = images.find(function (item) {
        return item.id === image.id;
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](this.API.image["delete"] + '/' + image.id).then(function (response) {
        if (response.data === 'success') {
          _this3.showNotification('success', 'request.deletedSuccess', 'success');
          if (existingImage !== undefined) {
            var position = images.indexOf(image);
            images.splice(position, 1);
          }
        } else {
          _this3.showNotification('error', 'request.error', 'danger');
        }
      });
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
        instance = this.$tc('models.image.title', count);
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
    showLoading: function showLoading() {
      this.$vs.loading({
        container: '#abr-images',
        scale: 1,
        background: '#fff',
        color: 'primary'
      });
    },
    setImages: function setImages(images) {
      this.selectedImages = images;
      if (this.currentImage === {}) {
        this.setCurrentImage();
      }
    },
    setCurrentImage: function setCurrentImage(image) {
      if (image === undefined) {
        if (this.selectedImages.length > 0) {
          this.currentImage = Object.assign({}, this.selectedImages[0]);
        } else {
          this.currentImage = {};
        }
      } else {
        this.currentImage = Object.assign(image);
      }
    },
    isEmpty: function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }
      return true;
    },
    showImagesModal: function showImagesModal() {
      this.popupActive = true;
      if (this.selectedImages.length === 0 && this.pagination.currentPage === 1) {
        //Show loading animation
        this.showLoading();
      }
      this.getImages();
      this.setCurrentImage();
    },
    closeImagesModal: function closeImagesModal() {
      this.popupActive = false;
    },
    handleSelect: function handleSelect(e) {
      this.$emit('input', this.selectedImages);
    },
    setData: function setData() {
      var images = this.$attrs.value;
      if (images !== "" && images !== undefined) {
        if (!Array.isArray(images)) {
          images = JSON.parse(images);
        }
        this.setImages(images);
      }
      this.setUploadUrl();
    },
    getActionName: function getActionName(action, useModel, isPlural) {
      var count = 1;
      if (isPlural) {
        count = 2;
      }
      var actionText = this.$t('actions.' + action);
      if (useModel) {
        var instanceTitle = this.$tc('models.image.title', count);
        return actionText + ' ' + instanceTitle;
      } else {
        return actionText;
      }
    },
    //Newer and more advanced method for retrieving a model property name
    getPropertyTitle: function getPropertyTitle(property) {
      return this.$t('models.image.properties.' + property);
    },
    setUploadUrl: function setUploadUrl() {
      this.uploadUrl = this.API.image.create;
    },
    listenEvents: function listenEvents() {
      var _this4 = this;
      //Open images manager from quill editor
      _EventBus__WEBPACK_IMPORTED_MODULE_6__["EventBus"].$on('open-image-uploader', function (action) {
        _this4.showImagesModal();
      });
    }
  },
  created: function created() {
    //Set data for the images manager
    this.setData();

    //Listen to events
    this.listenEvents();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=template&id=f4e61056":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=template&id=f4e61056 ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [!_vm.isQuillEditor ? _c("div", {
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "abr-form-images flex flex-wrap content-start w-full"
  }, _vm._l(_vm.selectedImages, function (image) {
    return _c("div", {
      key: image.id,
      staticClass: "abr-form-image",
      style: {
        width: _vm.previewWidth
      },
      attrs: {
        "image-id": image.id
      }
    }, [_c("img", {
      staticClass: "object-cover rounded",
      attrs: {
        src: image.url,
        width: "100%"
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "abr-image-btn bg-danger rounded shadow",
      on: {
        click: function click($event) {
          return _vm.removeImage(image);
        }
      }
    }, [_c("i", {
      staticClass: "material-icons"
    }, [_vm._v("\n                            close\n                        ")])])]);
  }), 0)]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("vs-button", {
    attrs: {
      color: "primary",
      type: "filled"
    },
    on: {
      click: function click($event) {
        return _vm.showImagesModal();
      }
    }
  }, [_vm._v(_vm._s(_vm.getActionName("choose", true, _vm.multiple)))])], 1)]) : _vm._e(), _vm._v(" "), _c("vs-popup", {
    attrs: {
      fullscreen: "",
      title: _vm.getPropertyTitle("uploaderTitle"),
      active: _vm.popupActive
    },
    on: {
      "update:active": function updateActive($event) {
        _vm.popupActive = $event;
      }
    }
  }, [_c("div", {
    staticClass: "vx-row abr-images-container mb-0"
  }, [_c("div", {
    staticClass: "vx-col w-3/4 h-full abr-images flex flex-wrap content-start mb-0 pr-0 vs-con-loading__container",
    attrs: {
      id: "abr-images"
    }
  }, _vm._l(_vm.images, function (image, index) {
    return _c("div", {
      key: image.id,
      staticClass: "abr-images-item rounded",
      "class": {
        "border-primary": _vm.isSelected(image.id)
      },
      attrs: {
        "image-id": image.id
      }
    }, [_c("img", {
      staticClass: "object-cover",
      attrs: {
        src: image.url,
        width: "100%"
      },
      on: {
        click: function click($event) {
          return _vm.selectImage(image);
        },
        load: function load($event) {
          return _vm.hideLoad(index);
        }
      }
    }), _vm._v(" "), _vm.isSelected(image.id) ? _c("div", {
      staticClass: "abr-image-btn bg-danger rounded shadow",
      on: {
        click: function click($event) {
          return _vm.removeImage(image);
        }
      }
    }, [_c("i", {
      staticClass: "material-icons"
    }, [_vm._v("\n                            close\n                        ")])]) : _vm._e()]);
  }), 0), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/4 pl-0"
  }, [_c("div", {
    staticClass: "vx-row"
  }, [!_vm.isEmpty(_vm.currentImage) ? _c("div", {
    staticClass: "vx-col w-full abr-selected-image"
  }, [_c("h3", {
    staticClass: "mb-6"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("imageParameters")))]), _vm._v(" "), _c("div", {
    staticClass: "vx-row abr-image-preview mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("img", {
    staticClass: "mb-3",
    attrs: {
      src: _vm.currentImage.url
    }
  }), _vm._v(" "), _c("p", [_vm._v(_vm._s(_vm.currentImage.title))])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-row abr-image-form"
  }, [_c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("vs-input", {
    staticClass: "w-full",
    attrs: {
      "label-placeholder": _vm.getPropertyTitle("title")
    },
    on: {
      change: function change($event) {
        return _vm.updateImage(_vm.currentImage);
      }
    },
    model: {
      value: _vm.currentImage.title,
      callback: function callback($$v) {
        _vm.$set(_vm.currentImage, "title", $$v);
      },
      expression: "currentImage.title"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("vs-input", {
    staticClass: "w-full",
    attrs: {
      "label-placeholder": _vm.getPropertyTitle("description")
    },
    on: {
      change: function change($event) {
        return _vm.updateImage(_vm.currentImage);
      }
    },
    model: {
      value: _vm.currentImage.description,
      callback: function callback($$v) {
        _vm.$set(_vm.currentImage, "description", $$v);
      },
      expression: "currentImage.description"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("vs-input", {
    staticClass: "w-full",
    attrs: {
      "label-placeholder": _vm.getPropertyTitle("alt")
    },
    on: {
      change: function change($event) {
        return _vm.updateImage(_vm.currentImage);
      }
    },
    model: {
      value: _vm.currentImage.alt,
      callback: function callback($$v) {
        _vm.$set(_vm.currentImage, "alt", $$v);
      },
      expression: "currentImage.alt"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-6"
  }, [_c("vs-button", {
    staticClass: "w-1/2",
    attrs: {
      color: "danger",
      type: "filled"
    },
    on: {
      click: function click($event) {
        return _vm.deleteImage(_vm.currentImage);
      }
    }
  }, [_vm._v(_vm._s(_vm.getActionName("delete", true)))])], 1)])]) : _vm._e()])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-row abr-images-pagination mb-0"
  }, [_c("div", {
    staticClass: "vx-col flex justify-center items-center w-3/4"
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
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col flex justify-center items-center w-1/4 pl-0"
  }, [_c("vs-button", {
    staticClass: "mr-3",
    attrs: {
      color: "primary",
      type: "filled"
    },
    on: {
      click: function click($event) {
        return _vm.closeImagesModal();
      }
    }
  }, [_vm._v(_vm._s(_vm.getActionName("choose", true, _vm.multiple)))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      type: "border"
    },
    on: {
      click: function click($event) {
        _vm.uploadPopupActive = true;
      }
    }
  }, [_vm._v(_vm._s(_vm.getActionName("upload")))])], 1)]), _vm._v(" "), _c("vs-popup", {
    attrs: {
      title: _vm.getActionName("upload", true, _vm.multiple),
      active: _vm.uploadPopupActive
    },
    on: {
      "update:active": function updateActive($event) {
        _vm.uploadPopupActive = $event;
      }
    }
  }, [_c("div", {
    staticClass: "vx-row m-0"
  }, [_c("div", {
    staticClass: "vx-col w-full p-0"
  }, [_c("file-pond", {
    attrs: {
      name: "file[]",
      "label-idle": _vm.uploadLabel,
      "allow-multiple": "true",
      "accepted-file-types": _vm.allowedFileTypes,
      server: _vm.uploadUrl,
      files: _vm.files,
      "max-file-size": _vm.maxFileSize
    },
    on: {
      processfiles: function processfiles($event) {
        return _vm.imageUploaded();
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full p-0"
  }, [_c("vs-button", {
    staticClass: "float-right",
    on: {
      click: function click($event) {
        _vm.uploadPopupActive = false;
      }
    }
  }, [_vm._v(_vm._s(_vm.getActionName("close")))])], 1)])])], 1)], 1);
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

/***/ "./resources/js/dashboard/components/images/ImageUpload.vue":
/*!******************************************************************!*\
  !*** ./resources/js/dashboard/components/images/ImageUpload.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageUpload_vue_vue_type_template_id_f4e61056__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageUpload.vue?vue&type=template&id=f4e61056 */ "./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=template&id=f4e61056");
/* harmony import */ var _ImageUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageUpload.vue?vue&type=script&lang=js */ "./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ImageUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImageUpload_vue_vue_type_template_id_f4e61056__WEBPACK_IMPORTED_MODULE_0__["render"],
  _ImageUpload_vue_vue_type_template_id_f4e61056__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/images/ImageUpload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ImageUpload.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=template&id=f4e61056":
/*!************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=template&id=f4e61056 ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageUpload_vue_vue_type_template_id_f4e61056__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ImageUpload.vue?vue&type=template&id=f4e61056 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/components/images/ImageUpload.vue?vue&type=template&id=f4e61056");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageUpload_vue_vue_type_template_id_f4e61056__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageUpload_vue_vue_type_template_id_f4e61056__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=2.js.map