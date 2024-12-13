<template>
  <div class="flex xl:flex-row flex-col gap-8 bg-[#FDC040] bg-opacity-20 rounded-[30px] xl:px-24 px-12 xl:pt-[103px] pt-20 xl:pb-24 pb-12">
    <div class="flex flex-col gap-8">
      <h1 id="animated-text" class="3xl:text-7xl leading-[4rem] xl:w-[78%] xl:text-[57.5px] text-4xl text-heading font-bold">{{ $t('home.dont_miss') }}</h1>
      <router-link to="/login" class="3xl:text-3xl xl:text-2xl text-gray lato">{{ $t('home.newsletter') }}</router-link>
      <div class="xl:w-4/5 relative mt-14">
        <input type="text" class="w-full h-[50px] rounded-full overflow-hidden ltr:pl-12 rtl:pr-12">
        <button class="md:absolute relative md:mt-0 mt-2 top-0 ltr:right-0 rtl:left-0 bg-primary-100 text-white md:w-[150px] w-full h-[50px] rounded-full">{{ $t('home.subscribe') }}</button>
        <img src="@components/svg/send.svg" class="w-4 absolute top-[14px] ltr:left-[26px] rtl:right-[26px]"/>
      </div>
    </div>
    <div class="hanging-image">
      <img src="@assets/images/bannerHomeBg.svg" class=""/>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__backInDown');
          observer.unobserve(entry.target);
        }
      });
    });

    const animatedText = document.getElementById('animated-text');
    if (animatedText) {
      observer.observe(animatedText);
    }
  }
}
</script>
<style>
.hanging-image img {
  width: 100%; 
  transform-origin: top center;
  animation: swing 3s ease-in-out infinite;
}

@keyframes swing {
  0% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg);
  }
}

</style>