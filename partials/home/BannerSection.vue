<template>
  <div class="grid lg:grid-cols-3 grid-cols-1 gap-5">
    <ui-banner-card>
      <template #content>
        <div class="flex sm:flex-row flex-col pt-[75px] px-12" :style="{ backgroundColor: getRandomColor() }">
          <div class="flex flex-col justify-center gap-6 pb-11">
            <p class="text-heading font-bold 3xl:text-2xl xl:text-xl ">{{ $t('home.banner1_title') }}</p>
            <router-link to="/products" class="w-[108px] h-8 flex justify-center items-center gap-2 text-xs bg-primary-100 text-white hover:bg-second transform duration-500 ease-in-out font-bold">
              {{ $t('buttons.shop_now') }}
              <img src="@components/svg/arrow_right.svg" class="rtl:rotate-180"/>
            </router-link>
          </div>
          <div class="hanging-image">
            <img src="@assets/images/bannerHomeBg.svg" />
          </div>
        </div>
      </template>
    </ui-banner-card>
    <ui-banner-card>
      <template #content>
        <div class="flex sm:flex-row flex-col pt-[75px] px-12" :style="{ backgroundColor: getRandomColor() }">
          <div class="flex flex-col justify-center gap-6 pb-11">
            <p class="text-heading font-bold 3xl:text-2xl xl:text-xl ">{{ $t('home.banner1_title') }}</p>
            <router-link to="/products" class="w-[108px] h-8 flex justify-center items-center gap-2 text-xs bg-primary-100 text-white hover:bg-second transform duration-500 ease-in-out font-bold">
              {{ $t('buttons.shop_now') }}
              <img src="@components/svg/arrow_right.svg" class="rtl:rotate-180"/>
            </router-link>
          </div>
          <div class="hanging-image">
            <img src="@assets/images/bannerHomeBg.svg" />
          </div>
        </div>
      </template>
    </ui-banner-card>
    <ui-banner-card>
      <template #content>
        <div class="flex sm:flex-row flex-col pt-[75px] px-12" :style="{ backgroundColor: getRandomColor() }">
          <div class="flex flex-col justify-center gap-6 pb-11">
            <p class="text-heading font-bold 3xl:text-2xl xl:text-xl ">{{ $t('home.banner1_title') }}</p>
            <router-link to="/products" class="w-[108px] h-8 flex justify-center items-center gap-2 text-xs bg-primary-100 text-white hover:bg-second transform duration-500 ease-in-out font-bold">
              {{ $t('buttons.shop_now') }}
              <img src="@components/svg/arrow_right.svg" class="rtl:rotate-180"/>
            </router-link>
          </div>
          <div class="hanging-image">
            <img src="@assets/images/bannerHomeBg.svg" />
          </div>
        </div>
      </template>
    </ui-banner-card>
  </div>
</template> 
<script>
export default {
  data() {
    return{
      colors: ['#F0E8D5', '#F3E8E8', '#E7EAF3'],
    }
  },
  methods: {
    getRandomColor() {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomIndex];
    },
  }
};
</script>