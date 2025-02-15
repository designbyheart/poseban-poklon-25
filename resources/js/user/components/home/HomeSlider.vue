<template>
  <div class="home-slider-container">
    <swiper :options="sliderOptions">
      <swiper-slide :key="index" v-for="slide,index in slides">
        <div
          class="slider-content max-height-mobile-slider"
          v-bind:style="{ backgroundImage: 'url(' + slide.image[0].url + ')'  }"
        >
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.subtitle }}</p>
          <a
            :href="slide.link"
            v-if="slide.buttonText !== null & slide.buttonText !== ''"
          >{{ slide.buttonText }}</a>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" id="home-slide-prev" slot="button-prev"></div>
      <div class="swiper-button-next" id="home-slide-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSlider",
  props: {
    slides: {
      type: Array
    }
  },
  data() {
    return {
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: "#home-slide-next",
          prevEl: "#home-slide-prev"
        }
      }
    };
  }
};
</script>
