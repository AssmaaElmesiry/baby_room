<template>
  <div class="grid lg:grid-cols-2 grid-cols-1 gap-14 px-12">
    <div class="">
      <img src="@/public/assets/images/bestsellerBanner.png" class="w-full h-full object-cover"/>
    </div>
    <div>
      <div>
        <h3 class="font-bold md:text-[40px] text-3xl text-heading pb-11">{{ $t('about_us.welcome') }}</h3>
        <p class="lato text-gray" v-html="formattedDescription"></p>
      </div>
      <Swiper
        :navigation="true" 
        :modules="modules"
        :dir="isLtr ? 'ltr' : 'rtl'"
        :space-between="24"
        :slidesPerView="3"
        class="aboutus"
      >
        <swiper-slide>
          <img src="@/public/assets/images/product2.png"/>
        </swiper-slide>
        <swiper-slide>
          <img src="@/public/assets/images/product2.png"/>
        </swiper-slide>
        <swiper-slide>
          <img src="@/public/assets/images/product2.png"/>
        </swiper-slide>
        <swiper-slide>
          <img src="@/public/assets/images/product2.png"/>
        </swiper-slide>
      </Swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

export default{
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return{
      swiperKey: 0,
      modules: [Navigation],
    }
  },
  computed:{
    formattedDescription() {
      const description = this.$t('about_us.welcome_description');
      return description.replace(/\. /g, '.<br><br>');    
    },
    isLtr() {
      return this.$i18n.locale === 'en';
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.swiperKey += 1;
    }
  }
}
</script>
<style>
 .aboutus .swiper-button-prev ,
 .aboutus .swiper-button-next {
  background-color: #B5DBD8;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.aboutus .swiper-button-prev:after,
 .aboutus .swiper-button-next:after {
  font-size: 15px;
}
</style>
