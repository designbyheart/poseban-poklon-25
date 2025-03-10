(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/Edit.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/voucher/Edit.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/forms/helper */ "./resources/js/dashboard/mixins/forms/helper.js");
/* harmony import */ var _static_voucher_voucher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/static/voucher/voucher */ "./resources/js/dashboard/static/voucher/voucher.js");
//Library for working with requests


//Form helper functions


//Validations

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_forms_helper__WEBPACK_IMPORTED_MODULE_1__["default"]],
  props: {
    formModel: {
      type: String,
      "default": 'voucher'
    },
    indexRoute: {
      type: String,
      "default": 'vouchers'
    }
  },
  data: function data() {
    return {
      defaultDate: new Date(),
      sendVoucherPopup: {
        active: false,
        data: {
          customer_email: '',
          paper: ''
        },
        paperOptions: [{
          name: 'A4',
          value: 'a4'
        }, {
          name: 'A5',
          value: 'a5'
        }]
      }
    };
  },
  validations: _static_voucher_voucher__WEBPACK_IMPORTED_MODULE_2__["validations"],
  methods: {
    update: function update() {
      var _this = this;
      var requestParams = this.model;

      //Convert the expiration date of voucher
      requestParams.end_date = this.convertDate(this.model.end_date);
      var id = this.$route.params.id;
      var requestUrl = this.API[this.instance].update + '/' + id;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this.showNotification('success', 'request.updatedSuccess', 'success');
        }
      })["catch"](function (error) {
        _this.showNotification('error', 'request.error', 'danger');
      });
    },
    "delete": function _delete() {
      var _this2 = this;
      var id = this.$route.params.id;
      var requestUrl = this.API[this.instance]["delete"] + '/' + id;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](requestUrl).then(function (response) {
        if (response.data === 'success') {
          _this2.showNotification('success', 'request.deletedSuccess', 'success');

          //Return to vouchers index page
          _this2.returnToIndex();
        }
      })["catch"](function (error) {
        _this2.showNotification('error', 'request.error', 'danger');
      });
    },
    showDeleteAlert: function showDeleteAlert() {
      var methodToExecute = this["delete"].bind(null);
      var instanceTitle = this.$tc('models.' + this.instance + '.title', 1);
      var title = this.$t('actions.confirm');
      var text = this.$t('messages.confirmation.delete', {
        instance: instanceTitle
      });
      var acceptText = this.$t('actions.accept');
      this.$vs.dialog({
        color: 'primary',
        title: title,
        text: text,
        accept: methodToExecute,
        acceptText: acceptText
      });
    },
    showSendPopup: function showSendPopup() {
      this.sendVoucherPopup.data.customer_email = this.model.order_item.order.rec_email;
      this.sendVoucherPopup.data.paper = this.sendVoucherPopup.paperOptions[0].value;
      this.sendVoucherPopup.active = true;
    },
    sendVoucher: function sendVoucher() {
      var _this3 = this;
      var id = this.$route.params.id;
      var requestUrl = this.API[this.instance].send;
      var requestParams = this.sendVoucherPopup.data;
      requestParams.voucher_id = id;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this3.showNotification('success', 'request.sentSuccess', 'success');
        }
      })["catch"](function (error) {
        _this3.showNotification('error', 'request.error', 'danger');
      });
    },
    activateVoucher: function activateVoucher() {
      var _this4 = this;
      var activation_code = this.model.activation_code;
      var requestUrl = this.API[this.instance].activate;
      var requestParams = {
        activation_code: activation_code
      };
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this4.showNotification('success', 'request.activatedSuccess', 'success');
          _this4.model.activated = true;
        }
      })["catch"](function (error) {
        _this4.showNotification('error', 'request.error', 'danger');
      });
    },
    deactivateVoucher: function deactivateVoucher() {
      var _this5 = this;
      var requestUrl = this.API[this.instance].deactivate;
      var requestParams = {
        id: this.model.id
      };
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(requestUrl, requestParams).then(function (response) {
        if (response.data === 'success') {
          _this5.showNotification('success', 'request.deactivatedSuccess', 'success');
          _this5.model.activated = false;
        }
      })["catch"](function (error) {
        _this5.showNotification('error', 'request.error', 'danger');
      });
    },
    getSingleItem: function getSingleItem() {
      var _this6 = this;
      var id = this.$route.params.id;
      var requestParams = {
        params: {
          id: id
        }
      };
      var requestUrl = this.API[this.instance].single;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(requestUrl, requestParams).then(function (response) {
        _this6.model = response.data;
      });
    },
    getPrintUrl: function getPrintUrl(voucherId, paperSize) {
      return this.API.voucher.print + '/' + voucherId + '?paper_size=' + paperSize;
    },
    loadData: function loadData() {
      //Get a voucher for editing
      this.getSingleItem();
    },
    submitForm: function submitForm() {
      if (!this.$v.$invalid) {
        this.update();
      } else {
        this.showNotification('error', 'validation.invalidForm', 'danger');
      }
    },
    returnToIndex: function returnToIndex() {
      var component = this;
      setTimeout(function () {
        component.redirectToIndex(component.indexRoute);
        component.setModel();
      }, 500);
    }
  },
  mounted: function mounted() {
    //Load the necessary data
    this.loadData();
  },
  created: function created() {
    //Set an instance for the form rendering
    this.setInstance(this.formModel);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/Edit.vue?vue&type=template&id=6372a245":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/voucher/Edit.vue?vue&type=template&id=6372a245 ***!
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
  return _c("vx-card", {
    attrs: {
      title: _vm.getFormTitle(true),
      noShadow: "",
      cardBorder: ""
    }
  }, [_c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-1/2 flex"
  }, [_c("vs-button", {
    staticClass: "mr-3",
    attrs: {
      icon: "print",
      size: "small",
      href: _vm.getPrintUrl(_vm.model.id, "a4"),
      target: "_blank"
    }
  }, [_vm._v("A4")]), _vm._v(" "), _c("vs-button", {
    staticClass: "mr-3",
    attrs: {
      icon: "print",
      size: "small",
      href: _vm.getPrintUrl(_vm.model.id, "a5"),
      target: "_blank"
    }
  }, [_vm._v("A5")]), _vm._v(" "), _c("vs-button", {
    staticClass: "mr-3",
    attrs: {
      icon: "send",
      size: "small"
    },
    on: {
      click: _vm.showSendPopup
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.send")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/2 flex justify-end"
  }, [_c("vs-button", {
    attrs: {
      color: "danger",
      icon: "delete",
      size: "small"
    },
    on: {
      click: _vm.showDeleteAlert
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.delete")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("voucherCode")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center flex-grow-1"
  }, [_c("p", [_vm._v(_vm._s(_vm.model.voucher_code))])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("activationCode")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center flex-grow-1"
  }, [_c("p", [_vm._v(_vm._s(_vm.model.activation_code))])])]), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("endDate")))]), _vm._v(" "), _c("datepicker", {
    attrs: {
      format: "dd.MM.yyyy"
    },
    model: {
      value: _vm.model.end_date,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "end_date", $$v);
      },
      expression: "model.end_date"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/4"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("activated")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center flex-grow-1"
  }, [_vm.model.activated ? _c("vs-icon", {
    staticClass: "mr-3",
    attrs: {
      icon: "check",
      color: "success",
      size: "small"
    }
  }) : _vm._e(), _vm._v(" "), !_vm.model.activated ? _c("vs-icon", {
    staticClass: "mr-3",
    attrs: {
      icon: "close",
      color: "danger",
      size: "small"
    }
  }) : _vm._e(), _vm._v(" "), !_vm.model.activated ? _c("vs-button", {
    attrs: {
      size: "small"
    },
    on: {
      click: _vm.activateVoucher
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.activate")))]) : _vm._e(), _vm._v(" "), _vm.model.activated ? _c("vs-button", {
    attrs: {
      size: "small"
    },
    on: {
      click: _vm.deactivateVoucher
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.deactivate")))]) : _vm._e()], 1)])]), _vm._v(" "), _c("div", {
    staticClass: "vx-row mb-6"
  }, [_c("div", {
    staticClass: "vx-col w-full mb-3"
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
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("description")))]), _vm._v(" "), _c("vs-textarea", {
    model: {
      value: _vm.model.description,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "description", $$v);
      },
      expression: "model.description"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("description"),
      expression: "validateField('description')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("personalMessage")))]), _vm._v(" "), _c("vs-textarea", {
    model: {
      value: _vm.model.personal_message,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "personal_message", $$v);
      },
      expression: "model.personal_message"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("personal_message"),
      expression: "validateField('personal_message')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("location")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("location"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.location,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "location", $$v);
      },
      expression: "model.location"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("location"),
      expression: "validateField('location')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("weather")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("weather"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.weather,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "weather", $$v);
      },
      expression: "model.weather"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("weather"),
      expression: "validateField('weather')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("duration")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("duration"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.duration,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "duration", $$v);
      },
      expression: "model.duration"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("duration"),
      expression: "validateField('duration')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("visitors")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("visitors"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.visitors,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "visitors", $$v);
      },
      expression: "model.visitors"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("visitors"),
      expression: "validateField('visitors')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("dressCode")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("dress_code"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.dress_code,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "dress_code", $$v);
      },
      expression: "model.dress_code"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("dress_code"),
      expression: "validateField('dress_code')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full mb-3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("zaGledaoce")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("zaGledaoce"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.za_gledaoce,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "za_gledaoce", $$v);
      },
      expression: "model.za_gledaoce"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("za_gledaoce"),
      expression: "validateField('za_gledaoce')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-full"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("additionalInformation")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text",
      danger: _vm.validateField("additional_info"),
      "val-icon-danger": "close"
    },
    model: {
      value: _vm.model.additional_info,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "additional_info", $$v);
      },
      expression: "model.additional_info"
    }
  }), _vm._v(" "), _c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.validateField("additional_info"),
      expression: "validateField('additional_info')"
    }],
    staticClass: "text-danger text-xs"
  }, [_vm._v(_vm._s(_vm.$t("messages.validation.invalidField")))])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("vs-button", {
    staticClass: "mr-3 mb-2",
    attrs: {
      color: "primary"
    },
    on: {
      click: _vm.submitForm
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.update")))]), _vm._v(" "), _c("vs-button", {
    staticClass: "mb-2",
    attrs: {
      color: "danger",
      type: "border",
      to: {
        name: _vm.indexRoute
      }
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.cancel")))])], 1)]), _vm._v(" "), _c("vs-popup", {
    attrs: {
      title: this.$t("forms.voucher.actions.send"),
      active: _vm.sendVoucherPopup.active
    },
    on: {
      "update:active": function updateActive($event) {
        return _vm.$set(_vm.sendVoucherPopup, "active", $event);
      }
    }
  }, [_c("div", {
    staticClass: "vx-row w-full px-0 mb-3"
  }, [_c("div", {
    staticClass: "vx-col w-2/3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("customerEmail")))]), _vm._v(" "), _c("vs-input", {
    staticClass: "w-full",
    attrs: {
      type: "text"
    },
    model: {
      value: _vm.sendVoucherPopup.data.customer_email,
      callback: function callback($$v) {
        _vm.$set(_vm.sendVoucherPopup.data, "customer_email", $$v);
      },
      expression: "sendVoucherPopup.data.customer_email"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vx-col w-1/3"
  }, [_c("p", {
    staticClass: "font-bold text-sm mb-2"
  }, [_vm._v(_vm._s(_vm.getPropertyTitle("paperSize")))]), _vm._v(" "), _c("vs-select", {
    staticClass: "w-full",
    model: {
      value: _vm.sendVoucherPopup.data.paper,
      callback: function callback($$v) {
        _vm.$set(_vm.sendVoucherPopup.data, "paper", $$v);
      },
      expression: "sendVoucherPopup.data.paper"
    }
  }, _vm._l(_vm.sendVoucherPopup.paperOptions, function (item, index) {
    return _c("vs-select-item", {
      key: index,
      attrs: {
        value: item.value,
        text: item.name
      }
    });
  }), 1)], 1)]), _vm._v(" "), _c("div", {
    staticClass: "vx-row w-full px-0"
  }, [_c("div", {
    staticClass: "vx-col w-full"
  }, [_c("vs-button", {
    on: {
      click: _vm.sendVoucher
    }
  }, [_vm._v(_vm._s(_vm.$t("actions.send")))])], 1)])])], 1);
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

/***/ "./resources/js/dashboard/static/voucher/voucher.js":
/*!**********************************************************!*\
  !*** ./resources/js/dashboard/static/voucher/voucher.js ***!
  \**********************************************************/
/*! exports provided: validations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validations", function() { return validations; });
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//Validation library


//Shipping method validation params
var validations = {
  model: {
    title: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    description: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    additional_info: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    location: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    weather: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    visitors: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    duration: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    dress_code: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    za_gledaoce: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    voucher_code: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    activation_code: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    },
    end_date: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
    }
  }
};

/***/ }),

/***/ "./resources/js/dashboard/views/voucher/Edit.vue":
/*!*******************************************************!*\
  !*** ./resources/js/dashboard/views/voucher/Edit.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_6372a245__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=6372a245 */ "./resources/js/dashboard/views/voucher/Edit.vue?vue&type=template&id=6372a245");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/dashboard/views/voucher/Edit.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_6372a245__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_6372a245__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/voucher/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/voucher/Edit.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/dashboard/views/voucher/Edit.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/Edit.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/voucher/Edit.vue?vue&type=template&id=6372a245":
/*!*************************************************************************************!*\
  !*** ./resources/js/dashboard/views/voucher/Edit.vue?vue&type=template&id=6372a245 ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_6372a245__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=6372a245 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/voucher/Edit.vue?vue&type=template&id=6372a245");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_6372a245__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_6372a245__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=25.js.map