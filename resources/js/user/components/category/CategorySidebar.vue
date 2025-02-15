<template>
  <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div class="cat-sidebar">
      <div class="cat-sidebar-list">
        <div class="cat-sidebar-list-item" :key="index" v-for="category, index in normalizedCategories" v-if="category.properties.visibility">
          <div
            class="sidebar-list-parent"
            v-bind:class="[category.all_children.length ? 'cat-sidebar-dropdown' : '']"
          >
            <div
              class="parent-title"
              @click="selectCategory(category)"
              v-bind:class="{ 'cat-bold': isSelected(category.id) }"
            >{{ category.title }}</div>
          </div>
          <div
            class="cat-sidebar-dropdown-list is-open"
            v-show="category.all_children.length > 0 && isSelected(category.id)"
          >
            <div
              class="cat-sidebar-list-child"
              :key="index"
              v-for="subCategory, index in category.all_children"
              v-if="subCategory.properties.visibility"
            >
              <span
                @click="selectCategory(subCategory)"
                v-bind:class="{ 'cat-bold': isSelected(subCategory.id) }"
              >{{ subCategory.title }}</span>
              <div
                class="cat-sidebar-dropdown-list is-open"
                v-show="subCategory.all_children.length > 0 && isSelected(subCategory.id)"
              >
                <div
                  class="cat-sidebar-list-child"
                  :key="index"
                  v-for="underCategory, index in subCategory.all_children"
                  v-if="underCategory.properties.visibility"
                >
                  <span
                    @click="selectCategory(underCategory)"
                    v-bind:class="{ 'cat-bold': isSelected(underCategory.id) }"
                  >{{ underCategory.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cat-sidebar-buttons">
        <a :href="API.category.vip" class="sidebar-buttons-links button-vip">
          <div class="button-container">
            <div class="button-vip-icon-col">
              <img
                src="/images/icons/diadem_category_page_icon.svg"
                alt="PosebanPoklon"
                class="button-vip-icon button-icon-white"
              />
              <img
                src="/images/icons/diadem_category_page_icon.svg"
                alt="PosebanPoklon"
                class="button-vip-icon button-icon-color"
              />
            </div>
            <div class="button-vip-text-col">
              <span class="button-vip-text">VIP Ponude</span>
            </div>
          </div>
        </a>
        <a :href="API.category.promo" class="sidebar-buttons-links button-promotion">
          <div class="button-container">
            <div class="button-promotion-icon-col">
              <img
                src="/images/icons/star_category_page_icon_white.svg"
                alt="PosebanPoklon"
                class="button-promotion-icon button-icon-white"
              />
              <img
                src="/images/icons/star_category_page_icon.svg"
                alt="PosebanPoklon"
                class="button-promotion-icon button-icon-color"
              />
            </div>
            <div class="button-promotion-text-col">
              <span class="button-promotion-text">Promocije</span>
            </div>
          </div>
        </a>
        <a :href="API.category.new" class="sidebar-buttons-links button-new">
          <div class="button-container">
            <div class="button-new-icon-col">
              <img
                src="/images/icons/plus_category_page_icon_white.svg"
                alt="PosebanPoklon"
                class="button-new-icon button-icon-white"
              />
              <img
                src="/images/icons/plus_category_page_icon.svg"
                alt="PosebanPoklon"
                class="button-new-icon button-icon-color"
              />
            </div>
            <div class="button-new-text-col">
              <span class="button-new-text">Novo</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategorySidebar",
  props: {
    categories: {
      type: Array
    },
    currentCategory: {
      type: Object
    }
  },
  data() {
    return {
        normalizedCategories: [],
        selectedCategory: {}
    };
  },
  watch: {
    selectedCategory: function() {
      if (this.selectedCategory !== {}) {
        this.setSidebarTitle(this.selectedCategory.title);
        this.updateBreadcrumb(this.selectedCategory);
      } else {
        this.setSidebarTitle();
      }
    }
  },
  methods: {
    selectCategory(category) {
      this.setGrandParent(category);

      this.selectedCategory = category;

      this.changePageUrl(category);

      this.EventBus.$emit("category-selected", category.id);

      this.EventBus.$emit("banner-changed", category.banner);

      this.updateBreadcrumb(category);
    },
    setSelectedCategory() {
      if (this.currentCategory !== undefined) {
        this.selectedCategory = this.currentCategory;

        this.setGrandParent(this.selectedCategory);
      }
    },
    setGrandParent(category) {
      if (category.parent_id !== null) {
        let parent = {};

        this.categories.forEach(function(item) {
          if (item.id === category.parent_id) {
            parent = Object.assign({}, item);
          } else {
            if (item.all_children.length) {
              let parentItem = item.all_children.find(function(child) {
                return child.id === category.parent_id;
              });

              if (parentItem !== undefined) {
                parent = parentItem;
              }
            }
          }
        });

        if (parent !== null && parent.parent_id !== null) {
          category["grand_parent_id"] = parent.parent_id;
        }
      }
    },
    isSelected(id) {
      if (
        this.selectedCategory.id === id ||
        this.selectedCategory.parent_id === id ||
        this.selectedCategory.grand_parent_id === id
      ) {
        return true;
      }
    },
    setSidebarTitle(title) {
      this.EventBus.$emit("category-changed", title);
    },
    changePageUrl(category) {
      let linkPrefix = "/kategorije/";

      if (history.pushState) {
        let seoTitle = category.seo_title;

        if (seoTitle === null) {
          seoTitle = category.title;
        }

        let seoDescription = category.seo_description;

        if (seoDescription === null) {
          seoDescription = category.description;
        }

        let seoKeywords = category.seo_keywords;

        window.history.pushState(
          "page",
          category.seo_title,
          linkPrefix + category.slug
        );
        document.title = seoTitle;
        document
          .querySelector('meta[name="description"]')
          .setAttribute("content", seoDescription);
        document
          .querySelector('meta[name="keywords"]')
          .setAttribute("content", seoKeywords);
      } else {
        document.location.href = linkPrefix + category.slug;
      }
    },
    updateBreadcrumb(category) {
      let breadcrumb = [];

      let link = {
        url: "/kategorije/" + category.slug,
        title: category.title
      };

      if (category.parent_id !== null) {
        let parentCategory = this.categories.find(function(item) {
          return item.id === category.parent_id;
        });

        let parentLink = {};

        let grandParentLink = {};

        if (parentCategory === undefined) {
          this.categories.forEach(function(item) {
            if (item.all_children.length) {
              parentCategory = item.all_children.find(function(child) {
                return child.id === category.parent_id;
              });
            }
          });
        }

        if (parentCategory !== undefined) {
          if (parentCategory.parent_id !== null) {
            let grandParent = this.categories.find(function(item) {
              return item.id === parentCategory.parent_id;
            });

            if (grandParent !== undefined) {
              grandParentLink = {
                url: "/kategorije/" + grandParent.slug,
                title: grandParent.title
              };

              breadcrumb.push(grandParentLink);
            }
          }

          parentLink = {
            url: "/kategorije/" + parentCategory.slug,
            title: parentCategory.title
          };

          breadcrumb.push(parentLink);
        }
      }

      breadcrumb.push(link);

      this.EventBus.$emit("breadcrumb-changed", breadcrumb);
    },
    normalizeCategories(){

        let categoriesList = this.normalizedCategories;

        this.categories.forEach(function (category) {

            category.properties = Object.assign({}, JSON.parse(category.properties));

            if(category.all_children.length){

                category.all_children.forEach(function(subCategory){

                    subCategory.properties = Object.assign({}, JSON.parse(subCategory.properties));

                    if(subCategory.all_children.length){

                        subCategory.all_children.forEach(function(child){

                            child.properties = Object.assign({}, JSON.parse(child.properties));

                        });

                    }

                });

            }

            categoriesList.push(category);

        });

        this.sortCategories();

    },
    sortCategories(){

        this.normalizedCategories.sort(function(a, b){
            let keyA = a.properties.priority,
                keyB = b.properties.priority;
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });

    }
  },
  mounted() {
    //Set the initial sidebar title
    this.setSidebarTitle(this.defaultTitle);

    //Normalize categories
    this.normalizeCategories();

    //Set the selected category
    this.setSelectedCategory();
  }
};
</script>