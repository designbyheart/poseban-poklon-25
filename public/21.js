(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/builder/Home.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var _static_builder_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../static/builder/home */ "./resources/js/dashboard/static/builder/home.js");
/* harmony import */ var _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/images/ImageUpload */ "./resources/js/dashboard/components/images/ImageUpload.vue");
//Library for sending requests


//Application routes


//Import page structure and necessary data


//Image uploader

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ImageUpload: _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    instance: {
      type: String,
      "default": 'builderLayout'
    }
  },
  data: function data() {
    return {
      builderLayout: {
        slug: 'home'
      },
      pageStructure: _static_builder_home__WEBPACK_IMPORTED_MODULE_2__["structure"],
      selectedCategory: {},
      selectedBottomLink: {},
      forms: {
        slider: {
          active: false
        },
        category: {
          active: false
        },
        aboutUs: {
          active: false
        },
        bottomLink: {
          active: false
        }
      },
      API: _mixins_api_api__WEBPACK_IMPORTED_MODULE_1__["API"]
    };
  },
  methods: {
    saveLayout: function saveLayout() {
      var _this = this;
      var requestUrl = this.API.builderLayout.update;
      var requestParams = {
        slug: this.builderLayout.slug,
        content: JSON.stringify(this.pageStructure)
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this.showNotification(_this.instance, 'success', 'request.updatedSuccess', 'success');
        }
      })["catch"](function (error) {
        _this.showNotification(_this.instance, 'error', 'request.error', 'danger');
      });
    },
    getLayout: function getLayout() {
      var _this2 = this;
      var requestUrl = this.API.builderLayout.single;
      var requestParams = {
        params: {
          slug: this.builderLayout.slug
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(requestUrl, requestParams).then(function (response) {
        //Set a data for builder
        _this2.pageStructure = JSON.parse(response.data.content);
      });
    },
    toggleForm: function toggleForm(slug) {
      var form = this.forms[slug];
      if (form !== undefined) {
        var status = form.active;
        form.active = !status;
      }
    },
    categoryForm: function categoryForm(id) {
      if (id !== undefined) {
        var category = this.pageStructure.categories.items.find(function (item) {
          return item.index === id;
        });
        this.selectedCategory = category;
      } else {
        this.selectedCategory = Object.assign({}, {});
      }
      this.toggleForm('category');
    },
    linkForm: function linkForm(index) {
      if (index !== undefined) {
        this.selectedBottomLink = this.pageStructure.bottomLinks[index];
      } else {
        this.selectedBottomLink = Object.assign({}, {});
      }
      this.toggleForm('bottomLink');
    },
    editSectionTitle: function editSectionTitle(slug) {
      var sectionTitle = this.pageStructure.sectionTitles[slug];
      var editStatus = sectionTitle.edit;
      sectionTitle.edit = !editStatus;
    },
    addSlide: function addSlide() {
      var newSlide = Object.assign({}, _static_builder_home__WEBPACK_IMPORTED_MODULE_2__["slideModel"]);
      this.pageStructure.slider.slides.push(newSlide);
    },
    removeSlide: function removeSlide(index) {
      this.pageStructure.slider.slides.splice(index, 1);
    },
    getLabel: function getLabel(slug) {
      return this.$t('builder.home.' + slug);
    }
  },
  mounted: function mounted() {
    //Get layout
    this.getLayout();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=template&id=1029104d":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/builder/Home.vue?vue&type=template&id=1029104d ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full flex justify-content-between items-center mb-6"
  }, [_c("h3", {
    staticClass: "mr-3"
  }, [_vm._v(_vm._s(_vm.getLabel("edit")))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      color: "success",
      icon: "check"
    },
    on: {
      click: function click($event) {
        return _vm.saveLayout();
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.save")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.forms.slider.active,
      expression: "!forms.slider.active"
    }],
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "abr-editor-block bg-primary flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.toggleForm("slider");
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.getLabel("slider.sectionTitle")))])])]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.forms.slider.active,
      expression: "forms.slider.active"
    }],
    staticClass: "vx-col w-full p-3"
  }, [_c("div", {
    staticClass: "vx-row bg-white mb-3 mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full flex items-center justify-between"
  }, [_c("h3", [_vm._v(_vm._s(_vm.getLabel("slider.edit")))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "check",
      color: "success",
      type: "border"
    },
    on: {
      click: function click($event) {
        return _vm.toggleForm("slider");
      }
    }
  })], 1)]), _vm._v(" "), _vm._l(_vm.pageStructure.slider.slides, function (slide, index) {
    return _c("div", {
      key: index,
      staticClass: "vx-row bg-white mb-3 mx-0 p-3"
    }, [_c("div", {
      staticClass: "vx-col w-full flex justify-between mb-3"
    }, [_c("h3", {
      staticClass: "mr-3"
    }, [_vm._v(_vm._s(_vm.getLabel("slider.modelTitle") + " " + (index + 1)))]), _vm._v(" "), _c("vs-button", {
      attrs: {
        icon: "delete",
        color: "danger"
      },
      on: {
        click: function click($event) {
          return _vm.removeSlide(index);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-1/2"
    }, [_c("p", {
      staticClass: "mb-2"
    }, [_vm._v(_vm._s(_vm.getLabel("slider.title")))]), _vm._v(" "), _c("vs-input", {
      staticClass: "w-full mb-3",
      attrs: {
        type: "text"
      },
      model: {
        value: slide.title,
        callback: function callback($$v) {
          _vm.$set(slide, "title", $$v);
        },
        expression: "slide.title"
      }
    }), _vm._v(" "), _c("p", {
      staticClass: "mb-2"
    }, [_vm._v(_vm._s(_vm.getLabel("slider.subtitle")))]), _vm._v(" "), _c("vs-input", {
      staticClass: "w-full mb-3",
      attrs: {
        type: "text"
      },
      model: {
        value: slide.subtitle,
        callback: function callback($$v) {
          _vm.$set(slide, "subtitle", $$v);
        },
        expression: "slide.subtitle"
      }
    }), _vm._v(" "), _c("p", {
      staticClass: "mb-2"
    }, [_vm._v(_vm._s(_vm.getLabel("slider.buttonText")))]), _vm._v(" "), _c("vs-input", {
      staticClass: "w-full mb-3",
      attrs: {
        type: "text"
      },
      model: {
        value: slide.buttonText,
        callback: function callback($$v) {
          _vm.$set(slide, "buttonText", $$v);
        },
        expression: "slide.buttonText"
      }
    }), _vm._v(" "), _c("p", {
      staticClass: "mb-2"
    }, [_vm._v(_vm._s(_vm.getLabel("slider.link")))]), _vm._v(" "), _c("vs-input", {
      staticClass: "w-full mb-3",
      attrs: {
        type: "url"
      },
      model: {
        value: slide.link,
        callback: function callback($$v) {
          _vm.$set(slide, "link", $$v);
        },
        expression: "slide.link"
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vx-col w-1/2"
    }, [_c("p", {
      staticClass: "mb-2"
    }, [_vm._v(_vm._s(_vm.getLabel("slider.image")))]), _vm._v(" "), _c("image-upload", {
      attrs: {
        "preview-width": "100%"
      },
      model: {
        value: slide.image,
        callback: function callback($$v) {
          _vm.$set(slide, "image", $$v);
        },
        expression: "slide.image"
      }
    })], 1)]);
  }), _vm._v(" "), _c("div", {
    staticClass: "vx-row mx-0"
  }, [_c("div", {
    staticClass: "vx-col w-full px-0"
  }, [_c("vs-button", {
    attrs: {
      icon: "add"
    },
    on: {
      click: _vm.addSlide
    }
  })], 1)])], 2)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [!_vm.pageStructure.sectionTitles.category.edit ? _c("div", {
    staticClass: "flex justify-center items-center"
  }, [_c("h2", {
    staticClass: "mr-3"
  }, [_vm._v("\n                        " + _vm._s(_vm.pageStructure.sectionTitles.category.value) + "\n                    ")]), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "edit",
      size: "small",
      type: "border"
    },
    on: {
      click: function click($event) {
        return _vm.editSectionTitle("category");
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.pageStructure.sectionTitles.category.edit ? _c("div", {
    staticClass: "flex justify-center items-center"
  }, [_c("vs-input", {
    staticClass: "w-1/2 mr-3",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.pageStructure.sectionTitles.category.value,
      callback: function callback($$v) {
        _vm.$set(_vm.pageStructure.sectionTitles.category, "value", $$v);
      },
      expression: "pageStructure.sectionTitles.category.value"
    }
  }), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "check",
      size: "small",
      type: "border"
    },
    on: {
      click: function click($event) {
        return _vm.editSectionTitle("category");
      }
    }
  })], 1) : _vm._e()])]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.forms.category.active,
      expression: "!forms.category.active"
    }],
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-3/4"
  }, [_c("div", {
    staticClass: "vx-row mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-2/3"
  }, [_c("div", {
    staticClass: "abr-category bg-primary flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.categoryForm(1);
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.pageStructure.categories.items[0].title))])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/3 p-0"
  }, [_c("div", {
    staticClass: "abr-category bg-primary flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.categoryForm(2);
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.pageStructure.categories.items[1].title))])])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-1/3"
  }, [_c("div", {
    staticClass: "abr-category bg-primary flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.categoryForm(3);
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.pageStructure.categories.items[2].title))])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-2/3 p-0"
  }, [_c("div", {
    staticClass: "abr-category bg-primary flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.categoryForm(4);
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.pageStructure.categories.items[3].title))])])])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("div", {
    staticClass: "abr-category bg-primary h-full flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.categoryForm(5);
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.pageStructure.categories.items[4].title))])])])]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.forms.category.active,
      expression: "forms.category.active"
    }],
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full p-3"
  }, [_c("div", {
    staticClass: "vx-row bg-white mb-3 mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full flex items-center justify-between"
  }, [_c("h3", [_vm._v(_vm._s(_vm.getLabel("categories.edit")))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "check",
      color: "success",
      type: "border"
    },
    on: {
      click: function click($event) {
        return _vm.categoryForm();
      }
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row bg-white mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full flex justify-between mb-3"
  }, [_c("h3", {
    staticClass: "mr-3"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.modelTitle") + " " + _vm.selectedCategory.index))])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/2"
  }, [_c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.title")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.selectedCategory.title,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedCategory, "title", $$v);
      },
      expression: "selectedCategory.title"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.subtitle")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.selectedCategory.subtitle,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedCategory, "subtitle", $$v);
      },
      expression: "selectedCategory.subtitle"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.showButton")))]), _vm._v(" "), _c("vs-switch", {
    attrs: {
      color: "success"
    },
    model: {
      value: _vm.selectedCategory.showButton,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedCategory, "showButton", $$v);
      },
      expression: "selectedCategory.showButton"
    }
  })], 1), _vm._v(" "), _vm.selectedCategory.showButton ? _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.buttonText")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.selectedCategory.buttonText,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedCategory, "buttonText", $$v);
      },
      expression: "selectedCategory.buttonText"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.link")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.selectedCategory.link,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedCategory, "link", $$v);
      },
      expression: "selectedCategory.link"
    }
  })], 1)])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/2"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("categories.image")))]), _vm._v(" "), _c("image-upload", {
    key: _vm.selectedCategory.index,
    attrs: {
      "preview-width": "100%"
    },
    model: {
      value: _vm.selectedCategory.image,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedCategory, "image", $$v);
      },
      expression: "selectedCategory.image"
    }
  })], 1)])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [!_vm.forms.aboutUs.active ? _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "abr-editor-block bg-primary flex justify-center items-center cursor-pointer",
    on: {
      click: function click($event) {
        return _vm.toggleForm("aboutUs");
      }
    }
  }, [_c("h3", {
    staticClass: "text-white"
  }, [_vm._v(_vm._s(_vm.pageStructure.aboutUs.title))])])]) : _vm._e(), _vm._v(" "), _vm.forms.aboutUs.active ? _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row bg-white mb-3 mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full flex items-center justify-between"
  }, [_c("h3", [_vm._v(_vm._s(_vm.getLabel("aboutUs.edit")))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "check",
      color: "success",
      type: "border"
    },
    on: {
      click: function click($event) {
        return _vm.toggleForm("aboutUs");
      }
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row bg-white mb-3 mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("aboutUs.title")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.pageStructure.aboutUs.title,
      callback: function callback($$v) {
        _vm.$set(_vm.pageStructure.aboutUs, "title", $$v);
      },
      expression: "pageStructure.aboutUs.title"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("aboutUs.description")))]), _vm._v(" "), _c("vs-textarea", {
    staticClass: "w-full textarea-high",
    model: {
      value: _vm.pageStructure.aboutUs.description,
      callback: function callback($$v) {
        _vm.$set(_vm.pageStructure.aboutUs, "description", $$v);
      },
      expression: "pageStructure.aboutUs.description"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("aboutUs.image")))]), _vm._v(" "), _c("image-upload", {
    attrs: {
      "preview-width": "100%"
    },
    model: {
      value: _vm.pageStructure.aboutUs.image,
      callback: function callback($$v) {
        _vm.$set(_vm.pageStructure.aboutUs, "image", $$v);
      },
      expression: "pageStructure.aboutUs.image"
    }
  })], 1)])]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [!_vm.forms.bottomLink.active ? _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row"
  }, _vm._l(_vm.pageStructure.bottomLinks, function (item, index) {
    return _c("div", {
      key: index,
      staticClass: "vx-col w-1/4"
    }, [_c("div", {
      staticClass: "abr-editor-block h-32 bg-primary flex justify-center items-center cursor-pointer",
      on: {
        click: function click($event) {
          return _vm.linkForm(index);
        }
      }
    }, [_c("p", {
      staticClass: "text-white"
    }, [_vm._v(_vm._s(item.title))])])]);
  }), 0)]) : _vm._e(), _vm._v(" "), _vm.forms.bottomLink.active ? _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("div", {
    staticClass: "vx-row bg-white mb-3 mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full flex items-center justify-between"
  }, [_c("h3", [_vm._v(_vm._s(_vm.getLabel("bottomLinks.edit")))]), _vm._v(" "), _c("vs-button", {
    attrs: {
      icon: "check",
      color: "success",
      type: "border"
    },
    on: {
      click: function click($event) {
        return _vm.linkForm();
      }
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row bg-white mb-3 mx-0 p-3"
  }, [_c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("bottomLinks.title")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.selectedBottomLink.title,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedBottomLink, "title", $$v);
      },
      expression: "selectedBottomLink.title"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.getLabel("bottomLinks.link")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.selectedBottomLink.link,
      callback: function callback($$v) {
        _vm.$set(_vm.selectedBottomLink, "link", $$v);
      },
      expression: "selectedBottomLink.link"
    }
  })], 1)])]) : _vm._e()])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--23-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--23-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nbody .abr-editor-block{\n\n    width: 100%;\n    height: 250px;\n}\nbody .abr-category{\n\n    width: 100%;\n    height: 250px;\n}\nbody div.textarea-high textarea{\n    height: 400px;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--23-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--23-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--23-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--23-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&id=1029104d&lang=css */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css");

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

/***/ "./resources/js/dashboard/static/builder/home.js":
/*!*******************************************************!*\
  !*** ./resources/js/dashboard/static/builder/home.js ***!
  \*******************************************************/
/*! exports provided: slideModel, structure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideModel", function() { return slideModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "structure", function() { return structure; });
//Slide model
var slideModel = {
  image: '',
  title: '',
  subtitle: '',
  buttonText: '',
  link: ''
};

//Page structure
var structure = {
  slider: {
    slides: []
  },
  categories: {
    items: [{
      index: 1,
      image: '',
      title: '',
      subtitle: '',
      showButton: false,
      buttonText: '',
      link: ''
    }, {
      index: 2,
      image: '',
      title: '',
      subtitle: '',
      showButton: false,
      buttonText: '',
      link: ''
    }, {
      index: 3,
      image: '',
      title: '',
      subtitle: '',
      showButton: false,
      buttonText: '',
      link: ''
    }, {
      index: 4,
      image: '',
      title: '',
      subtitle: '',
      showButton: false,
      buttonText: '',
      link: ''
    }, {
      index: 5,
      image: '',
      title: '',
      subtitle: '',
      showButton: false,
      buttonText: '',
      link: ''
    }, {
      index: 6,
      image: '',
      title: '',
      subtitle: '',
      showButton: false,
      buttonText: '',
      link: ''
    }]
  },
  aboutUs: {
    title: '',
    description: '',
    image: ''
  },
  bottomLinks: [{
    title: '',
    link: '#'
  }, {
    title: '',
    link: '#'
  }, {
    title: '',
    link: '#'
  }, {
    title: '',
    link: '#'
  }],
  sectionTitles: {
    category: {
      value: '',
      edit: false
    }
  }
};

/***/ }),

/***/ "./resources/js/dashboard/views/builder/Home.vue":
/*!*******************************************************!*\
  !*** ./resources/js/dashboard/views/builder/Home.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_1029104d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=1029104d */ "./resources/js/dashboard/views/builder/Home.vue?vue&type=template&id=1029104d");
/* harmony import */ var _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/builder/Home.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _Home_vue_vue_type_style_index_0_id_1029104d_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.vue?vue&type=style&index=0&id=1029104d&lang=css */ "./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_1029104d__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_1029104d__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/builder/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/builder/Home.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/dashboard/views/builder/Home.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css":
/*!***************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_1029104d_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--23-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--23-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&id=1029104d&lang=css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=style&index=0&id=1029104d&lang=css");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_1029104d_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_1029104d_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_1029104d_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_23_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_23_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_1029104d_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/dashboard/views/builder/Home.vue?vue&type=template&id=1029104d":
/*!*************************************************************************************!*\
  !*** ./resources/js/dashboard/views/builder/Home.vue?vue&type=template&id=1029104d ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_1029104d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=1029104d */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/builder/Home.vue?vue&type=template&id=1029104d");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_1029104d__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_1029104d__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=21.js.map