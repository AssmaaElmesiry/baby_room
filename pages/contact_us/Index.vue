<template>
<div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 border-b border-[#E5E5E5] py-7">
    <!-- Breadcrumb -->
    <div class="flex gap-2 items-center pb-6 py-6">
      <router-link to="/" class="lato text-lg text-gray">
      {{ $t('menu.home') }}
      </router-link>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
      <p class="lato text-lg text-primary-100">{{ $t('footer.contact_us')}} </p>
    </div>
    <div class="flex flex-col" style="gap: 80px !important">
      <HelpSection class="container mx-auto px-4 lg:px-10 md:px-12 "/>
      <MapSection class="mt-14"/>
      <FormSection />
      <LastBanner />
    </div>
  </div>
</template>
<script>
import HelpSection from '@partials/contact_us/HelpSection.vue'
import MapSection from '@partials/contact_us/MapSection.vue'
import FormSection from '@partials/contact_us/FormSection.vue'
import LastBanner from '@partials/home/LastBanner.vue'

export default {
  components:{
    HelpSection,
    MapSection,
    FormSection,
    LastBanner
  }
}
</script>