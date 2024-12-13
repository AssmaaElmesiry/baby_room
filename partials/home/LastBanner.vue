<template>
  <div class="flex xl:flex-row flex-col gap-8 bg-[#3BB77E] bg-opacity-20 rounded-[30px] xl:px-16 px-12 xl:pt-[87px] pt-20 xl:pb-16 pb-12">
    <div class="flex flex-col gap-8">
      <h1 class="3xl:text-7xl leading-[4rem] xl:w-[78%] xl:text-[57.5px] text-4xl text-heading font-bold">{{ $t('home.banner2_title') }}</h1>
      <router-link to="/products" class="3xl:text-3xl xl:text-2xl text-[#2B3D34#2B3D34] lato">{{ $t('home.start_shopping') }}</router-link>
    </div>
    <div class="flex justify-center">
      <img src="@assets/images/bannerHomeBg.svg" class="w-3/4"/>
    </div>
  </div>
</template>