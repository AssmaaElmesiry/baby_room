<template>
    <!-- Breadcrumb -->
    <div class="bg-[#F5F5F5] py-6">
      <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.home') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <p class="lato text-lg text-primary-100">{{ $t('menu.login') }}</p>
      </div>
    </div>
  <div class="flex flex-col items-center justify-center min-h-screen container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-14 pt-24 pb-28">
      <div class="flex items-center justify-center h-full xl:w-[500px] overflow-hidden rounded-2xl">
        <img src="@/public/assets/images/bestsellerBanner.png" class="w-full h-full object-cover"/>
      </div>
      <div class="py-8 flex flex-col gap-5">
        <h2 class="text-5xl font-bold text-heading">Login</h2>
        <p class="lato text-gray text-sm">Don’t have an account? <router-link to="/create_account" class="text-primary-100">Create here</router-link></p>
        <form class="mt-4">
          <div class="mb-4">
            <input type="text" id="username" class="w-full border border-[#E5E5E5] rounded-lg px-9 h-16" placeholder="Username or Email *" required />
          </div>
          <div class="mb-4">
            <input type="password" id="password" class="w-full border border-[#E5E5E5] rounded-lg  px-9 h-16" placeholder="Your password *" required />
          </div>
          <div class="flex items-center mb-4 gap-3">
            <input type="checkbox" id="remember" class="custom-checkbox" />
            <label for="remember" class="text-muted-foreground">Remember me</label>
          </div>
          <div class="flex justify-between mb-4">
            <router-link to="/forgot_password" class="text-primary">Forgot password?</router-link>
          </div>
          <button type="submit" class="xl:w-auto w-full rounded-lg px-7 py-3 bg-heading text-white ">Log in</button>
        </form>
      </div>
    </div>
    <LastBanner />
  </div>
</template>
<script>
import LastBanner from '@partials/home/LastBanner.vue';

export default{
components:{
  LastBanner
}
}
</script>
