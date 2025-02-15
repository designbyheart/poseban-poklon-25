<template>
  <div class="col-lg-12 cat-main-bn" v-if="currentBanner !== null">
    <div
      class="cat-bn max-height-mobile-slider"
      :style="'background-image: url(' + currentBanner.image.url + ');'"
    >
      <h2 class="cat-bn-title">{{ currentBanner.title }}</h2>
      <!-- <a :href="currentBanner.button_link" class="cat-bn-btn">{{ currentBanner.button_text }}</a> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "CategoryBanner",
  props: {
    banner: {
      type: Object
    }
  },
  data() {
    return {
      currentBanner: null
    };
  },
  methods: {
    setCurrentBanner(banner) {
      if (banner !== undefined) {
        this.currentBanner = banner;
      }
    },
    listenEvents() {
      this.EventBus.$on("banner-changed", banner => {
        this.setCurrentBanner(banner);
      });
    }
  },
  mounted() {
    if (this.banner !== undefined) {
      this.setCurrentBanner(this.banner);
    }

    this.listenEvents();
  }
};
</script>