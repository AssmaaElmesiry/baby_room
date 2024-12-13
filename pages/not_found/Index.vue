<template>
  <div class="flex flex-col justify-center items-center h-full py-4 overflow-hidden">
    <dotlottie-player src="https://lottie.host/9ed406da-5851-4b17-a9e7-89e905a6d2d0/rGEUV9AU1y.lottie" background="transparent" speed="1" class="xl:w-[600px] xl:h-[320px]" loop autoplay></dotlottie-player>
    <h1 class="xl:text-7xl text-5xl font-bold text-heading">{{ $t('error.not_found') }}</h1>
    <div class="pt-5 text-center">
      <p class="lato text-gray">{{ $t('error.broken') }}</p>
      <p class="lato text-gray">
        {{ $t('error.visit') }}
        <router-link to="/" class="text-primary-100">{{ $t('footer.home_page') }}</router-link>
        {{ $t('error.or') }}
        <router-link to="/contact_us" class="text-primary-100">{{ $t('footer.contact_us') }}</router-link>
        {{ $t('error.problem') }}
      </p>
    </div>
  </div>
</template>

