<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 border-b border-[#E5E5E5]">
    <!-- Breadcrumb -->
    <div class="flex gap-2 items-center pb-6 py-6">
      <router-link to="/" class="lato text-lg text-gray">
      {{ $t('menu.home') }}
      </router-link>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
      <p class="lato text-lg text-primary-100">{{ $t('footer.about_us')}} </p>
    </div>
  </div>
  <div>
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10  pt-16 ">
      <welcome-section />
      <what-we-provide class="pt-16"/>
      <our-performance class="pt-16"/>
      <our-statics />
      <our-team class="pt-16"/>
      <LastBanner class="mt-44"/>
    </div>
  </div>
</template>
<script>
import WelcomeSection from '@partials/about_us/WelcomeSection.vue';
import WhatWeProvide from '@partials/about_us/WhatWeProvide.vue';
import OurPerformance from '@partials/about_us/OurPerformance.vue';
import OurStatics from '@partials/about_us/OurStatics.vue';
import OurTeam from '@partials/about_us/OurTeam.vue';
import LastBanner from '@partials/home/LastBanner.vue'


export default {
  components:{
    "welcome-section": WelcomeSection,
    "what-we-provide": WhatWeProvide,
    "our-performance": OurPerformance,
    "our-statics": OurStatics,
    "our-team": OurTeam,
    LastBanner
  },
  methods:{
  }
}
</script>