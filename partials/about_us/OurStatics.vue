<template>
  <div class="before:absolute before:w-full before:h-full before:top-0 before:left-0 before:right-0 before:bg-[#4B675A] before:bg-opacity-45 relative flex items-center justify-center py-32 px-24 mt-[69px] bg-[url('@/public/assets/images/static_banner.png')] bg-fixed">
    <img src="" class="absolute inset-0 w-full h-full object-cover -z-10" />
    <div class="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-28">
      <div class="relative z-10 flex flex-col items-center">
        <vue3-autocounter ref="counter" :startAmount="0" :endAmount="150" :duration="2" prefix="+" suffix="" separator="" decimalSeparator="" :decimals="0" :autoinit="true" class="text-7xl text-white font-bold"/>
        <h3 class="mt-2 text-white text-xl font-bold">Glorious years</h3>
      </div>
      <div class="relative z-10 flex flex-col items-center">
        <vue3-autocounter ref="counter" :startAmount="0" :endAmount="15" :duration="2" prefix="+" suffix="" separator="" decimalSeparator="" :decimals="0" :autoinit="true" class="text-7xl text-white font-bold"/>
        <h3 class="mt-2 text-white text-xl font-bold">Glorious years</h3>
      </div>
      <div class="relative z-10 flex flex-col items-center">
         <vue3-autocounter ref="counter" :startAmount="0" :endAmount="1000" :duration="2" prefix="+" suffix="" separator="" decimalSeparator="" :decimals="0" :autoinit="true" class="text-7xl text-white font-bold"/>
        <h3 class="mt-2 text-white text-xl font-bold">Glorious years</h3>
      </div>
      <div class="relative z-10 flex flex-col items-center">
         <vue3-autocounter ref="counter" :startAmount="0" :endAmount="850" :duration="2" prefix="+" suffix="" separator="" decimalSeparator="" :decimals="0" :autoinit="true" class="text-7xl text-white font-bold"/>
        <h3 class="mt-2 text-white text-xl font-bold">Glorious years</h3>
      </div>
      <div class="relative z-10 flex flex-col items-center">
         <vue3-autocounter ref="counter" :startAmount="0" :endAmount="300" :duration="2" prefix="+" suffix="" separator="" decimalSeparator="" :decimals="0" :autoinit="true" class="text-7xl text-white font-bold"/>
        <h3 class="mt-2 text-white text-xl font-bold">Glorious years</h3>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  components: { 
  },
  data() {
    return {};
  },
};
</script>
