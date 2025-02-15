<template>
  <section class="slider-select-container">
    <div class="container">
      <div class="slider-select-row">
        <div class="slider-select-item">
          <div class="slider-select-input">
            <select
              v-model="selectedAttributes.location"
              class="select-element"
              v-if="locationOptions.length"
            >
              <option value selected class="option-element">Izaberi grad</option>
              <option
                :key="index"
                v-for="option, index in locationOptions"
                :value="option.id"
                class="option-element"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="slider-select-item">
          <div class="slider-select-input">
            <select
              v-model="selectedAttributes.visitors"
              class="select-element"
              v-if="visitorsOptions.length"
            >
              <option value selected class="option-element">Za koga</option>
              <option
                :key="index"
                v-for="option, index in visitorsOptions"
                :value="option.id"
                class="option-element"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="slider-select-item">
          <div class="slider-select-button">
            <a :href="filterUrl">
              <button class="select-button">Traži</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FilterBar",
  props: {
    locationOptions: {
      type: Array
    },
    visitorsOptions: {
      type: Array
    }
  },
  data() {
    return {
      selectedAttributes: {
        location: "",
        visitors: ""
      },
      filterBase: "kategorije/"
    };
  },
  computed: {
    filterUrl: function() {
      //Get URL parameters for setting a filter
      let urlString = window.location.href + this.filterBase;
      let url = new URL(urlString);

      let location = this.selectedAttributes.location;
      let visitors = this.selectedAttributes.visitors;

      if (location !== "") {
        url.searchParams.set("location", location);
      }

      if (visitors !== "") {
        url.searchParams.set("visitors_number", visitors);
      }

      return encodeURI(url);
    }
  }
};
</script>