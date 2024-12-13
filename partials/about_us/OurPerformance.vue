<template>
  <div class="px-12">
    <div class="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-7">
      <div class="flex xl:justify-start justify-center items-center xl:order-none order-2">
        <img src="@assets/images/performance1.png" class="h-[438px] w-full 3xl:w-[395px] rounded-2xl object-cover"/>
      </div>
      <div class="3xl:w-[426px] h-[575px] rounded-2xl overflow-hidden">
        <img src="@assets/images/performance2.png" class="w-full h-full object-cover"/>
      </div>
      <div class="flex flex-col gap-3 2xl:col-span-1 col-span-3">
        <span class="text-gray font-bold 3xl:text-2xl">{{ $t('about_us.our_performance') }}</span>
        <h3 class="3xl:text-5xl xl:text-4xl text-2xl text-heading font-bold">{{ $t('about_us.performance_title') }}</h3>
        <p v-html="formattedDescription"></p>
      </div>
    </div>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 pt-12 gap-7">
      <div class="flex flex-col gap-4">
        <h3 class="text-3xl text-heading font-bold">{{ $t('about_us.who_we_are') }}</h3>
        <p class="lato text-gray">{{ $t('about_us.details') }}</p>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-3xl text-heading font-bold">{{ $t('about_us.history') }}</h3>
        <p class="lato text-gray">{{ $t('about_us.details') }}</p>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-3xl text-heading font-bold">{{ $t('about_us.mission') }}</h3>
        <p class="lato text-gray">{{ $t('about_us.details') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  computed:{
    formattedDescription() {
      const description = this.$t('about_us.performance_info');
      return description.replace(/\. /g, '.<br><br>');    
    },
  }
}
</script>