(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[81],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_tables_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/tables/helper */ "./resources/js/dashboard/mixins/tables/helper.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
 //Table helper functions


/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_tables_helper__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      instance: 'user',
      instanceSlug: 'users',
      userPopup: {
        active: false,
        data: []
      },
      roles: [{
        id: 1,
        name: "user"
      }, {
        id: 2,
        name: "admin"
      }, {
        id: 3,
        name: "editor"
      }],
      statuses: [{
        value: true,
        name: 'Active'
      }, {
        value: false,
        name: 'Suspended'
      }]
    };
  },
  methods: {
    showUserPopup: function showUserPopup(user) {
      this.userPopup.data = Object.assign({}, user);
      this.userPopup.active = true;
    },
    changeUserRole: function changeUserRole(userId, roleId) {
      var requestUrl = this.API.user.changeRole;
      var requestParams = {
        user: userId,
        role: roleId
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(requestUrl, requestParams);
    },
    changeUserStatus: function changeUserStatus(userId) {
      var requestUrl = this.API.user.changeStatus;
      var requestParams = {
        user: userId
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(requestUrl, requestParams);
    },
    updateUser: function updateUser() {
      var user = this.userPopup.data;
      var roleId = user.user_role_id;
      var status = user.status;
      var initialData = this.items.find(function (item) {
        return item.id === user.id;
      });

      if (initialData !== undefined) {
        try {
          if (roleId !== initialData.user_role_id) {
            this.changeUserRole(user.id, roleId);
          }

          if (status != initialData.status) {
            this.changeUserStatus(user.id);
          }

          this.showNotification('success', 'request.updatedSuccess', 'success'); //Refresh the list

          this.getItems();
        } catch (e) {
          this.showNotification('error', 'request.error', 'danger');
        }
      }
    }
  },
  created: function created() {
    //Set the instance
    this.setInstance(this.instance);
  },
  mounted: function mounted() {
    //Load items
    this.getItems(this.per_page);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=template&id=2bab1973&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=template&id=2bab1973& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    "div",
    [
      _c(
        "vs-table",
        {
          attrs: {
            "max-items": _vm.per_page,
            sst: true,
            data: _vm.items,
            noDataText: _vm.$t("messages.notFound")
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var data = ref.data
                return _vm._l(data, function(user, indexItem) {
                  return _c(
                    "vs-tr",
                    { key: indexItem },
                    [
                      _c("vs-td", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(user.name) +
                            "\n                "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-td", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(user.email) +
                            "\n                "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-td", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(user.role.name) +
                            "\n                "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-td",
                        [
                          user.status
                            ? _c("vs-icon", {
                                attrs: {
                                  icon: "check",
                                  color: "success",
                                  size: "medium"
                                }
                              })
                            : _c("vs-icon", {
                                attrs: {
                                  icon: "close",
                                  color: "danger",
                                  size: "medium"
                                }
                              })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("vs-td", [
                        _c(
                          "div",
                          { staticClass: "flex" },
                          [
                            _c("vs-button", {
                              staticClass: "mr-2",
                              attrs: { icon: "edit" },
                              on: {
                                click: function($event) {
                                  return _vm.showUserPopup(user)
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("vs-button", {
                              attrs: { color: "danger", icon: "delete" },
                              on: {
                                click: function($event) {
                                  return _vm.showDeleteAlert(user.id)
                                }
                              }
                            })
                          ],
                          1
                        )
                      ])
                    ],
                    1
                  )
                })
              }
            }
          ])
        },
        [
          _c("template", { slot: "header" }, [
            _c("div", { staticClass: "vx-row w-full pb-3 m-0" }, [
              _c("div", { staticClass: "vx-col flex items-center w-50 p-0" }, [
                _c("h3", { staticClass: "mb-0 mr-3" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.getTableTitle()) +
                      "\n                    "
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "vx-col flex items-center justify-end w-50 p-0"
                },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: {
                      icon: "search",
                      placeholder: _vm.$t("actions.search")
                    },
                    model: {
                      value: _vm.search,
                      callback: function($$v) {
                        _vm.search = $$v
                      },
                      expression: "search"
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "template",
            { slot: "thead" },
            [
              _c("vs-th", { attrs: { "sort-key": "name" } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.getPropertyTitle("name")) +
                    "\n            "
                )
              ]),
              _vm._v(" "),
              _c("vs-th", { attrs: { "sort-key": "email" } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.getPropertyTitle("email")) +
                    "\n            "
                )
              ]),
              _vm._v(" "),
              _c("vs-th", { attrs: { "sort-key": "role" } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.getPropertyTitle("role")) +
                    "\n            "
                )
              ]),
              _vm._v(" "),
              _c("vs-th", { attrs: { "sort-key": "status" } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.getPropertyTitle("status")) +
                    "\n            "
                )
              ]),
              _vm._v(" "),
              _c("vs-th", [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.$t("actions.title")) +
                    "\n            "
                )
              ])
            ],
            1
          )
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "vx-row" }, [
        _c(
          "div",
          { staticClass: "vx-col flex justify-end items-center w-full p-3" },
          [
            _c("vs-pagination", {
              attrs: { total: _vm.pagination.totalPages },
              model: {
                value: _vm.pagination.currentPage,
                callback: function($$v) {
                  _vm.$set(_vm.pagination, "currentPage", $$v)
                },
                expression: "pagination.currentPage"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          attrs: {
            title:
              _vm.$t("actions.edit") + " " + _vm.$tc("models.user.title", 1),
            active: _vm.userPopup.active
          },
          on: {
            "update:active": function($event) {
              return _vm.$set(_vm.userPopup, "active", $event)
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row" }, [
            _c("div", { staticClass: "vx-col w-50 mb-3" }, [
              _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                _vm._v(_vm._s(_vm.getPropertyTitle("name")))
              ]),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.userPopup.data.name))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "vx-col w-50 mb-3" }, [
              _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                _vm._v(_vm._s(_vm.getPropertyTitle("email")))
              ]),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.userPopup.data.email))])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col w-50 mb-3" },
              [
                _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                  _vm._v(_vm._s(_vm.getPropertyTitle("role")))
                ]),
                _vm._v(" "),
                _c(
                  "vs-select",
                  {
                    attrs: { "is-selected": _vm.userPopup.data.user_role_id },
                    on: {
                      "update:isSelected": function($event) {
                        return _vm.$set(
                          _vm.userPopup.data,
                          "user_role_id",
                          $event
                        )
                      },
                      "update:is-selected": function($event) {
                        return _vm.$set(
                          _vm.userPopup.data,
                          "user_role_id",
                          $event
                        )
                      }
                    },
                    model: {
                      value: _vm.userPopup.data.user_role_id,
                      callback: function($$v) {
                        _vm.$set(_vm.userPopup.data, "user_role_id", $$v)
                      },
                      expression: "userPopup.data.user_role_id"
                    }
                  },
                  _vm._l(_vm.roles, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.id, text: item.name }
                    })
                  }),
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col w-50 mb-3" },
              [
                _c("p", { staticClass: "font-bold text-sm mb-2" }, [
                  _vm._v(_vm._s(_vm.getPropertyTitle("status")))
                ]),
                _vm._v(" "),
                _c(
                  "vs-select",
                  {
                    attrs: { "is-selected": _vm.userPopup.data.status },
                    on: {
                      "update:isSelected": function($event) {
                        return _vm.$set(_vm.userPopup.data, "status", $event)
                      },
                      "update:is-selected": function($event) {
                        return _vm.$set(_vm.userPopup.data, "status", $event)
                      }
                    },
                    model: {
                      value: _vm.userPopup.data.status,
                      callback: function($$v) {
                        _vm.$set(_vm.userPopup.data, "status", $$v)
                      },
                      expression: "userPopup.data.status"
                    }
                  },
                  _vm._l(_vm.statuses, function(item, index) {
                    return _c("vs-select-item", {
                      key: index,
                      attrs: { value: item.value, text: item.name }
                    })
                  }),
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-button", { on: { click: _vm.updateUser } }, [
                  _vm._v(_vm._s(_vm.$t("actions.update")))
                ])
              ],
              1
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/dashboard/mixins/tables/helper.js":
/*!********************************************************!*\
  !*** ./resources/js/dashboard/mixins/tables/helper.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/api/api */ "./resources/js/dashboard/mixins/api/api.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
//Application routes
 //Library for working with requests


var tableHelper = {
  props: {},
  data: function data() {
    return {
      instance: '',
      items: [],
      per_page: 20,
      pagination: {
        currentPage: 1,
        nextPageUrl: '',
        totalPages: 1
      },
      search: '',
      sortKey: '',
      sortOrder: '',
      API: _mixins_api_api__WEBPACK_IMPORTED_MODULE_0__["API"]
    };
  },
  watch: {
    'pagination.currentPage': function paginationCurrentPage(value, oldValue) {
      this.getItems();
    },
    'search': function search() {
      this.getItems();
    }
  },
  methods: {
    setInstance: function setInstance(instance) {
      this.instance = instance;
    },
    getItems: function getItems() {
      var _this = this;

      var instance = this.instance;
      var requestparams = {
        params: {
          per_page: this.per_page //'X-CSRF-TOKEN': this.csrf

        }
      };

      if (this.search !== '') {
        requestparams.params.search = this.search;
        this.pagination.currentPage = 1;
      }

      var requestUrl = this.API[instance].list;
      var selectedPage = this.pagination.currentPage;

      if (this.pagination.nextPageUrl !== '' && this.search === '') {
        requestUrl = requestUrl + '?page=' + selectedPage;
      }

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl, requestparams).then(function (response) {
        _this.items = response.data.data;
        _this.pagination.nextPageUrl = response.data.next_page_url;
        _this.pagination.totalPages = response.data.last_page;
      });
    },
    deleteItem: function deleteItem(id) {
      var _this2 = this;

      var instance = this.instance;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a["delete"](this.API[instance]["delete"] + '/' + id).then(function (response) {
        if (response.data === 'success') {
          _this2.showNotification('success', 'request.deletedSuccess', 'success'); //Update the items list


          _this2.getItems();
        }
      })["catch"](function (error) {
        _this2.showNotification('error', 'request.error', 'danger');
      });
    },
    getTableTitle: function getTableTitle() {
      return this.$t('tables.' + this.instance + '.title');
    },
    getColumnTitle: function getColumnTitle(model) {
      return this.$t('models.' + this.instance + '.properties.' + model);
    },
    getPropertyTitle: function getPropertyTitle(property) {
      return this.$t('models.' + this.instance + '.properties.' + property);
    },
    convertDate: function convertDate(date) {
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

      var convertedDate = dateDay + '.' + dateMonth + '.' + dateYear;
      return convertedDate;
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
    showDeleteAlert: function showDeleteAlert(id) {
      var deleteItemFunction = this.deleteItem.bind(null, id);
      var instance = this.$tc('models.' + this.instance + '.title', 1);
      var text = this.$t('messages.confirmation.delete', {
        instance: instance
      });
      this.$vs.dialog({
        color: 'primary',
        title: 'Confirm',
        text: text,
        accept: deleteItemFunction
      });
    }
  },
  mounted: function mounted() {}
};
/* harmony default export */ __webpack_exports__["default"] = (tableHelper);

/***/ }),

/***/ "./resources/js/dashboard/views/user/AdminUsers.vue":
/*!**********************************************************!*\
  !*** ./resources/js/dashboard/views/user/AdminUsers.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminUsers_vue_vue_type_template_id_2bab1973___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminUsers.vue?vue&type=template&id=2bab1973& */ "./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=template&id=2bab1973&");
/* harmony import */ var _AdminUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminUsers.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AdminUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AdminUsers_vue_vue_type_template_id_2bab1973___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AdminUsers_vue_vue_type_template_id_2bab1973___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/user/AdminUsers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AdminUsers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=template&id=2bab1973&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=template&id=2bab1973& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminUsers_vue_vue_type_template_id_2bab1973___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AdminUsers.vue?vue&type=template&id=2bab1973& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/dashboard/views/user/AdminUsers.vue?vue&type=template&id=2bab1973&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminUsers_vue_vue_type_template_id_2bab1973___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminUsers_vue_vue_type_template_id_2bab1973___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=81.js.map