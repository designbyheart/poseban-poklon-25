(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");
/* harmony import */ var _static_product_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/static/product/product */ "./resources/js/dashboard/static/product/product.js");
/* harmony import */ var _mixins_forms_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/mixins/forms/helper */ "./resources/js/dashboard/mixins/forms/helper.js");
/* harmony import */ var _components_vx_card_VxCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/vx-card/VxCard */ "./resources/js/dashboard/components/vx-card/VxCard.vue");
/* harmony import */ var _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/images/ImageUpload */ "./resources/js/dashboard/components/images/ImageUpload.vue");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_6__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//Library for working with requests
 //Event bus for sending and processing global events

 //Product model, validations and types

 //Form helper functions

 //Vuesax card component

 //Image manager

 //Vue select


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    VxCard: _components_vx_card_VxCard__WEBPACK_IMPORTED_MODULE_4__["default"],
    ImageUpload: _components_images_ImageUpload__WEBPACK_IMPORTED_MODULE_5__["default"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_6___default.a
  },
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
      }
    };
  },
  validations: _static_product_product__WEBPACK_IMPORTED_MODULE_2__["validations"],
  methods: {
    //Products
    createProduct: function createProduct() {
      var _this = this;

      //Prepare product data
      this.assembleProduct();
      var requestParams = this.product;
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.API[this.instance].create, requestParams).then(function (response) {
        if (response.data.message === 'success') {
          _this.showNotification('success', 'request.createdSuccess', 'success');

          var id = response.data.id; //Refresh the form

          _this.getSingleProduct(id); //Save product versions


          _this.createVersions(id); //Change the form type


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
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(this.API[this.instance].update + '/' + product_id, requestParams).then(function (response) {
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
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.API[this.instance].single, requestParams).then(function (response) {
        _this3.product = response.data;
        _this3.selectedCategories = _this3.normalizeData(response.data.categories);
        _this3.selectedProducent = response.data.producent;
        _this3.versions = response.data.children;

        _this3.updateImages(response.data.images);

        _this3.prepareAttributes();
      });
    },
    assembleProduct: function assembleProduct() {
      var product = this.product; //Images

      product.images = [];
      this.selectedImages.forEach(function (image) {
        product.images.push(image.id);
      }); //Categories

      product.categories = this.selectedCategories; //Attributes

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
      var versionId = this.selectedVersion.id; //Push selected version to versions

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
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(requestUrl, requestParams).then(function (response) {
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
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(requestUrl, requestParams).then(function (response) {
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
      }; //Push selected filter to the list of product filters

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
      this.getProducents(); //Get filter list with attributes

      this.getFilters(); //Get categories list

      this.getCategories(); //Get list of products

      this.searchProducts(); //Get the product for editing

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
    }
  },
  mounted: function mounted() {
    //Load necessary data
    this.loadData();
  },
  created: function created() {
    //Set an instance for the form rendering
    this.setInstance(this.formModel); //Listen to the events

    this.listenEvents();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".abr-form-images .abr-form-image{\n  width: 24%;\n  height: 200px;\n  margin-right: 1%;\n  margin-bottom: 20px;\n  position: relative;\n}\n.abr-form-images .abr-form-image img{\n  height: 100%;\n}\n.abr-form-images .abr-form-image .abr-image-btn{\n  width: 35px;\n  height: 35px;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  top: 0.5rem;\n  right: 0.5rem;\n  cursor: pointer;\n}\nbody .con-vs-tabs, body .con-vs-tabs .con-slot-tabs{\n  overflow: visible;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--9-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--9-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=1&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "vx-card",
    {
      attrs: {
        title: _vm.getFormTitle(_vm.isEditForm),
        noShadow: "",
        cardBorder: ""
      }
    },
    [
      _c(
        "vs-tabs",
        { staticClass: "px-0" },
        [
          _c(
            "vs-tab",
            { attrs: { label: _vm.getFormSectionTitle("general") } },
            [
              _c("div", { staticClass: "con-tab pt-3" }, [
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("title")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: { type: "text" },
                        model: {
                          value: _vm.product.title,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "title", $$v)
                          },
                          expression: "product.title"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$v.product.description.$invalid,
                              expression: "$v.product.description.$invalid"
                            }
                          ],
                          staticClass: "text-danger text-xs"
                        },
                        [
                          _vm._v(
                            _vm._s(_vm.$t("messages.validation.invalidField"))
                          )
                        ]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("description")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-textarea", {
                        staticClass: "mb-0",
                        model: {
                          value: _vm.product.description,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "description", $$v)
                          },
                          expression: "product.description"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$v.product.description.$invalid,
                              expression: "$v.product.description.$invalid"
                            }
                          ],
                          staticClass: "text-danger text-xs"
                        },
                        [
                          _vm._v(
                            _vm._s(_vm.$t("messages.validation.invalidField"))
                          )
                        ]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("short_description")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-textarea", {
                        staticClass: "mb-0",
                        model: {
                          value: _vm.product.short_description,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "short_description", $$v)
                          },
                          expression: "product.short_description"
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("slug")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: { type: "text" },
                        model: {
                          value: _vm.product.slug,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "slug", $$v)
                          },
                          expression: "product.slug"
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("slug")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          model: {
                            value: _vm.product.status,
                            callback: function($$v) {
                              _vm.$set(_vm.product, "status", $$v)
                            },
                            expression: "product.status"
                          }
                        },
                        _vm._l(_vm.statuses, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.value, text: item.title }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  )
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c("vs-tab", { attrs: { label: _vm.getFormSectionTitle("price") } }, [
            _c("div", { staticClass: "con-tab pt-3" }, [
              _c("div", { staticClass: "vx-row mb-6" }, [
                _c(
                  "div",
                  { staticClass: "vx-col" },
                  [
                    _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.getPropertyTitle("price")) +
                          "\n                        "
                      )
                    ]),
                    _vm._v(" "),
                    _c("vs-input", {
                      staticClass: "w-full",
                      attrs: {
                        type: "number",
                        danger: _vm.$v.product.price.$invalid,
                        "val-icon-danger": "close"
                      },
                      model: {
                        value: _vm.product.price,
                        callback: function($$v) {
                          _vm.$set(_vm.product, "price", $$v)
                        },
                        expression: "product.price"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.$v.product.price.$invalid,
                            expression: "$v.product.price.$invalid"
                          }
                        ],
                        staticClass: "text-danger text-xs"
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.$t("messages.validation.invalidField"))
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col" },
                  [
                    _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.getPropertyTitle("company_price")) +
                          "\n                        "
                      )
                    ]),
                    _vm._v(" "),
                    _c("vs-input", {
                      staticClass: "w-full",
                      attrs: {
                        type: "number",
                        danger: _vm.$v.product.company_price.$invalid,
                        "val-icon-danger": "close"
                      },
                      model: {
                        value: _vm.product.company_price,
                        callback: function($$v) {
                          _vm.$set(_vm.product, "company_price", $$v)
                        },
                        expression: "product.company_price"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.$v.product.company_price.$invalid,
                            expression: "$v.product.company_price.$invalid"
                          }
                        ],
                        staticClass: "text-danger text-xs"
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.$t("messages.validation.invalidField"))
                        )
                      ]
                    )
                  ],
                  1
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "vs-tab",
            { attrs: { label: _vm.getFormSectionTitle("connections") } },
            [
              _c("div", { staticClass: "con-tab pt-3" }, [
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("producentId")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-select",
                        {
                          staticClass: "w-full",
                          model: {
                            value: _vm.product.producent_id,
                            callback: function($$v) {
                              _vm.$set(_vm.product, "producent_id", $$v)
                            },
                            expression: "product.producent_id"
                          }
                        },
                        _vm._l(_vm.producents, function(item, index) {
                          return _c("vs-select-item", {
                            key: index,
                            attrs: { value: item.id, text: item.title }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.getPropertyTitle("categories")) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          label: "title",
                          multiple: "",
                          options: _vm.categories,
                          reduce: function(category) {
                            return category.id
                          }
                        },
                        on: { search: _vm.searchCategories },
                        model: {
                          value: _vm.selectedCategories,
                          callback: function($$v) {
                            _vm.selectedCategories = $$v
                          },
                          expression: "selectedCategories"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$v.selectedCategories.$invalid,
                              expression: "$v.selectedCategories.$invalid"
                            }
                          ],
                          staticClass: "text-danger text-xs"
                        },
                        [
                          _vm._v(
                            _vm._s(_vm.$t("messages.validation.invalidField"))
                          )
                        ]
                      )
                    ],
                    1
                  )
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "vs-tab",
            { attrs: { label: _vm.getFormSectionTitle("attributes") } },
            [
              _c("div", { staticClass: "con-tab pt-3" }, [
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.productFilters.length > 0,
                          expression: "productFilters.length > 0"
                        }
                      ],
                      staticClass: "vx-col w-full"
                    },
                    [
                      _c("div", { staticClass: "vx-row mb-3" }, [
                        _c("div", { staticClass: "vx-col w-1/6" }, [
                          _c("p", { staticClass: "font-bold text-sm" }, [
                            _vm._v(_vm._s(_vm.getPropertyTitle("filter.title")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "vx-col w-2/3" }, [
                          _c("p", { staticClass: "font-bold text-sm" }, [
                            _vm._v(
                              _vm._s(_vm.getPropertyTitle("filter.attributes"))
                            )
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.productFilters, function(filter, index) {
                        return _c(
                          "div",
                          { key: index, staticClass: "vx-row mb-3" },
                          [
                            _c("div", { staticClass: "vx-col w-1/6" }, [
                              _c("p", { staticClass: "font-bold text-sm" }, [
                                _vm._v(_vm._s(filter.name))
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "vx-col w-2/3" },
                              [
                                _c("v-select", {
                                  key: filter.name,
                                  attrs: {
                                    label: "name",
                                    multiple: "",
                                    options: filter.attributes,
                                    reduce: function(attribute) {
                                      return {
                                        id: attribute.id,
                                        name: attribute.name
                                      }
                                    }
                                  },
                                  model: {
                                    value: filter.selected,
                                    callback: function($$v) {
                                      _vm.$set(filter, "selected", $$v)
                                    },
                                    expression: "filter.selected"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "vx-col w-1/6" },
                              [
                                _c("vs-button", {
                                  attrs: { color: "danger", icon: "delete" },
                                  on: {
                                    click: function($event) {
                                      return _vm.removeFilter(index)
                                    }
                                  }
                                })
                              ],
                              1
                            )
                          ]
                        )
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-col w-full" }, [
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col w-2/3 mb-3" },
                        [
                          _c("p", { staticClass: "font-bold text-sm mb-3" }, [
                            _vm._v(
                              _vm._s(_vm.getPropertyTitle("filter.search"))
                            )
                          ]),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              label: "name",
                              options: _vm.filters,
                              reduce: function(filter) {
                                return {
                                  id: filter.id,
                                  name: filter.name,
                                  attributes: filter.attributes
                                }
                              }
                            },
                            on: { search: _vm.searchFilters },
                            model: {
                              value: _vm.selectedFilter,
                              callback: function($$v) {
                                _vm.selectedFilter = $$v
                              },
                              expression: "selectedFilter"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "vx-col w-1/3 mb-3 flex items-end" },
                        [
                          _c(
                            "vs-button",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.addFilter()
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$t("actions.addNew")))]
                          )
                        ],
                        1
                      )
                    ])
                  ])
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "vs-tab",
            { attrs: { label: _vm.getFormSectionTitle("images") } },
            [
              _c("div", { staticClass: "con-tab pt-3" }, [
                _c("div", { staticClass: "vx-row mb-0" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("image-upload", {
                        attrs: { multiple: "" },
                        model: {
                          value: _vm.selectedImages,
                          callback: function($$v) {
                            _vm.selectedImages = $$v
                          },
                          expression: "selectedImages"
                        }
                      })
                    ],
                    1
                  )
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c("vs-tab", { attrs: { label: _vm.getFormSectionTitle("seo") } }, [
            _c("div", { staticClass: "con-tab pt-3" }, [
              _c("div", { staticClass: "vx-col w-full" }, [
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.getPropertyTitle("seoTitle")) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: { type: "text" },
                        model: {
                          value: _vm.product.seo_title,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "seo_title", $$v)
                          },
                          expression: "product.seo_title"
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.getPropertyTitle("seoDescription")) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-textarea", {
                        staticClass: "mb-0",
                        model: {
                          value: _vm.product.seo_description,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "seo_description", $$v)
                          },
                          expression: "product.seo_description"
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "vx-row mb-6" }, [
                  _c(
                    "div",
                    { staticClass: "vx-col w-full" },
                    [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.getPropertyTitle("seoKeywords")) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-textarea", {
                        staticClass: "mb-0",
                        model: {
                          value: _vm.product.seo_keywords,
                          callback: function($$v) {
                            _vm.$set(_vm.product, "seo_keywords", $$v)
                          },
                          expression: "product.seo_keywords"
                        }
                      })
                    ],
                    1
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "vs-tab",
            { attrs: { label: _vm.getFormSectionTitle("versions") } },
            [
              _c("div", { staticClass: "con-tab pt-3" }, [
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.versions.length > 0,
                            expression: "versions.length > 0"
                          }
                        ],
                        staticClass: "vx-row mb-3"
                      },
                      [
                        _c("div", { staticClass: "vx-col w-2/3" }, [
                          _c("p", { staticClass: "font-bold text-sm" }, [
                            _vm._v(
                              _vm._s(_vm.getPropertyTitle("version.title"))
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "vx-col w-1/6" }, [
                          _c("p", { staticClass: "font-bold text-sm" }, [
                            _vm._v(
                              _vm._s(_vm.getPropertyTitle("version.price"))
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "vx-col w-1/6" }, [
                          _c("p", { staticClass: "font-bold text-sm" }, [
                            _vm._v(
                              _vm._s(_vm.getPropertyTitle("version.actions"))
                            )
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.versions, function(version, index) {
                      return _c(
                        "div",
                        { key: index, staticClass: "vx-row mb-3 items-center" },
                        [
                          _c("div", { staticClass: "vx-col w-2/3" }, [
                            _c("p", [_vm._v(_vm._s(version.title))])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "vx-col w-1/6" }, [
                            _c("p", [
                              _vm._v(
                                _vm._s(
                                  version.price + " " + _vm.defaultCurrency
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "vx-col w-1/6" },
                            [
                              _c("vs-button", {
                                attrs: { color: "danger", icon: "delete" },
                                on: {
                                  click: function($event) {
                                    return _vm.removeVersion(version.id)
                                  }
                                }
                              })
                            ],
                            1
                          )
                        ]
                      )
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col w-2/3 mb-3" },
                        [
                          _c("p", { staticClass: "font-bold text-sm mb-3" }, [
                            _vm._v(
                              _vm._s(_vm.getPropertyTitle("version.search"))
                            )
                          ]),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              label: "title",
                              options: _vm.products,
                              reduce: function(version) {
                                return {
                                  id: version.id,
                                  title: version.title,
                                  price: version.price
                                }
                              }
                            },
                            on: { search: _vm.searchProducts },
                            model: {
                              value: _vm.selectedVersion,
                              callback: function($$v) {
                                _vm.selectedVersion = $$v
                              },
                              expression: "selectedVersion"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "vx-col w-1/3 mb-3 flex items-end" },
                        [
                          _c(
                            "vs-button",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.addVersion()
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$t("actions.addNew")))]
                          )
                        ],
                        1
                      )
                    ])
                  ],
                  2
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "vs-tab",
            { attrs: { label: _vm.getFormSectionTitle("settings") } },
            [
              _c("div", { staticClass: "con-tab pt-3" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c("div", { staticClass: "vx-row mb-6" }, [
                    _c("div", { staticClass: "vx-col w-25" }, [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.getPropertyTitle("viewCount")) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "w-2/3" },
                        [
                          _c("vs-input-number", {
                            attrs: { min: "0" },
                            model: {
                              value: _vm.product.view_count,
                              callback: function($$v) {
                                _vm.$set(_vm.product, "view_count", $$v)
                              },
                              expression: "product.view_count"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$v.product.view_count.$invalid,
                              expression: "$v.product.view_count.$invalid"
                            }
                          ],
                          staticClass: "text-danger text-xs"
                        },
                        [
                          _vm._v(
                            _vm._s(_vm.$t("messages.validation.invalidField"))
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-col w-25" }, [
                      _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.getPropertyTitle("likeCount")) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "w-2/3" },
                        [
                          _c("vs-input-number", {
                            attrs: { min: "0" },
                            model: {
                              value: _vm.product.like_count,
                              callback: function($$v) {
                                _vm.$set(_vm.product, "like_count", $$v)
                              },
                              expression: "product.like_count"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$v.product.like_count.$invalid,
                              expression: "$v.product.like_count.$invalid"
                            }
                          ],
                          staticClass: "text-danger text-xs"
                        },
                        [
                          _vm._v(
                            _vm._s(_vm.$t("messages.validation.invalidField"))
                          )
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "vx-row mb-6" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col w-full" },
                      [
                        _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.getPropertyTitle("type")) +
                              "\n                            "
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "vs-select",
                          {
                            staticClass: "w-full",
                            model: {
                              value: _vm.product.type,
                              callback: function($$v) {
                                _vm.$set(_vm.product, "type", $$v)
                              },
                              expression: "product.type"
                            }
                          },
                          _vm._l(_vm.types, function(item, index) {
                            return _c("vs-select-item", {
                              key: index,
                              attrs: { value: item.slug, text: item.title }
                            })
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ])
                ])
              ])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "vx-row" }, [
        _c(
          "div",
          { staticClass: "vx-col w-full" },
          [
            !_vm.isEditForm
              ? _c(
                  "vs-button",
                  {
                    staticClass: "mr-3 mb-2",
                    attrs: { color: "primary" },
                    on: {
                      click: function($event) {
                        return _vm.submitForm()
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t("actions.create")))]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.isEditForm
              ? _c(
                  "vs-button",
                  {
                    staticClass: "mr-3 mb-2",
                    attrs: { color: "primary" },
                    on: {
                      click: function($event) {
                        return _vm.submitForm()
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t("actions.update")))]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "vs-button",
              {
                staticClass: "mb-2",
                attrs: {
                  color: "danger",
                  type: "border",
                  to: { name: _vm.indexRoute }
                }
              },
              [_vm._v(_vm._s(_vm.$t("actions.cancel")))]
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



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
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../EventBus */ "./resources/js/dashboard/EventBus.js");
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
//Application routes
 //Library for working with requests

 //Event bus for sending and processing global events

 //Datepicker component


var formHelper = {
  components: {
    Datepicker: vuejs_datepicker__WEBPACK_IMPORTED_MODULE_3__["default"]
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
      orderStatuses: [],
      API: _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__["API"]
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
    validateField: function validateField(field) {
      if (this.$v.model[field]) {
        return this.$v.model[field].$invalid;
      }
    },
    redirectToIndex: function redirectToIndex(route) {
      this.$router.push({
        name: route
      });
    },
    getProducts: function getProducts(params) {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.API.product.list, params).then(function (response) {
        _this.products = response.data.data;
      });
    },
    getProducents: function getProducents(params) {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.API.producent.list, params).then(function (response) {
        _this2.producents = response.data.data;
      });
    },
    getCategories: function getCategories(params) {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.API.category.list, params).then(function (response) {
        _this3.categories = response.data.data;
      });
    },
    getBanners: function getBanners(params) {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.API.banner.list, params).then(function (response) {
        _this4.banners = response.data.data;
      });
    },
    getFilters: function getFilters(params) {
      var _this5 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.API.filter.list, params).then(function (response) {
        _this5.filters = response.data.data;
      });
    },
    getAttributes: function getAttributes(params) {
      var _this6 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.API.attribute.list, params).then(function (response) {
        _this6.attributes = response.data.data;
      });
    },
    getShippingMethods: function getShippingMethods() {
      var _this7 = this;

      var requestUrl = this.API.shippingMethod.list;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl).then(function (response) {
        _this7.shippingMethods = response.data.data;
      });
    },
    getPaymentMethods: function getPaymentMethods() {
      var _this8 = this;

      var requestUrl = this.API.paymentMethod.list;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl).then(function (response) {
        _this8.paymentMethods = response.data.data;
      });
    },
    getOrderStatuses: function getOrderStatuses() {
      var _this9 = this;

      var requestUrl = this.API.orderStatus.list;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl).then(function (response) {
        _this9.orderStatuses = response.data;
      });
    },
    searchProducts: function searchProducts(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      }; //Search products

      this.getProducts(requestParams);
    },
    searchCategories: function searchCategories(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      }; //Search products

      this.getCategories(requestParams);
    },
    searchFilters: function searchFilters(search, loading) {
      var requestParams = {
        params: {
          search: search
        }
      }; //Search products

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
    },
    updateImages: function updateImages(images) {
      this.selectedImages = images;
    },
    listenToEvents: function listenToEvents() {
      //Listen to the events
      _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].$on('images-selected', this.updateImages);
    },
    convertDate: function convertDate(date, format, connection_string) {
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

      var connector = '-';

      if (connection_string !== undefined) {
        connector = connection_string;
      }

      if (format === 'd/m/y') {
        return dateDay + connector + dateMonth + connector + dateYear;
      } else {
        return dateYear + connector + dateMonth + connector + dateDay;
      }
    },
    buildAddress: function buildAddress() {
      var order = this.order;
      var address = order.customer_name + ' ' + order.customer_surname + ', ' + order.address_one + '/' + order.address_two + ', ' + order.city + ', ' + order.zip_code + ', ' + order.country;
      return address;
    }
  },
  created: function created() {
    //Listen to the events
    this.listenToEvents();
  },
  mounted: function mounted() {}
};
/* harmony default export */ __webpack_exports__["default"] = (formHelper);

/***/ }),

/***/ "./resources/js/dashboard/static/product/product.js":
/*!**********************************************************!*\
  !*** ./resources/js/dashboard/static/product/product.js ***!
  \**********************************************************/
/*! exports provided: productTypes, model, validations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productTypes", function() { return productTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "model", function() { return model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return validations; });
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//Validation library
 //Product types list

var productTypes = [{
  title: 'Product',
  slug: 'product'
}, {
  title: 'Gift Card',
  slug: 'gift_card'
}]; //Product model

var model = {
  title: 'Testowy',
  description: 'Testowy',
  short_description: '',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  price: '1000',
  company_price: '900',
  currency: 'RSD',
  slug: 'testowy',
  view_count: '0',
  like_count: '0',
  status: false,
  product_id: '',
  producent_id: '',
  type: productTypes[0].slug,
  attributes: [],
  categories: [],
  images: []
}; //Product validation params

var validations = {
  product: {
    title: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    description: {
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
/* harmony import */ var _Form_vue_vue_type_template_id_001a6476___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=001a6476& */ "./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var vue_multiselect_dist_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css& */ "./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&");
/* harmony import */ var _Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form.vue?vue&type=style&index=1&lang=css& */ "./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_001a6476___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_001a6476___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
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

/***/ "./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--9-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--9-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=style&index=1&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476&":
/*!***************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_001a6476___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=001a6476& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/products/Form.vue?vue&type=template&id=001a6476&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_001a6476___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_001a6476___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=52.js.map