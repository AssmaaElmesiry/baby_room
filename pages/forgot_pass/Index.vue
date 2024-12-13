<template>
    <!-- Breadcrumb -->
    <div class="bg-[#F5F5F5] py-6">
      <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.home') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <p class="lato text-lg text-primary-100">{{ $t('menu.login') }}</p>
      </div>
    </div>
  <div class="h-screen flex flex-col items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 py-24">
    <div class="flex flex-col justify-center items-center w-auto ">
      <div class="relative ltr:ml-[-105px] rtl:mr-[-105px]" style="align-self: baseline;">
        <dotlottie-player src="https://lottie.host/0c8d4633-8f5f-44d0-8c06-6eed8421a745/sAiZzpVr7l.json" background="transparent" speed="1" style="width: 300px; height: 130px;" loop autoplay></dotlottie-player>
        <dotlottie-player src="https://lottie.host/c5f920b8-0d35-4c07-bc0e-bcf8a36a8428/XaKIqndKOn.json" background="transparent" speed="3" style="width: 300px; height: 160px; left:-30px;" class="absolute top-6" loop autoplay></dotlottie-player>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-heading font-bold xl:text-[40px] text-3xl">{{ $t('forgot_password.title') }}</h3>
        <p class="text-gray lato">{{ $t('forgot_password.message') }}</p>
        <input type="text" class="ltr:pl-9 trl:pr-9 border border-[#E5E5E5] h-16 rounded-xl my-6" :placeholder="$t('forgot_password.input_placeholder')" />
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="terms" id="terms" class="custom-checkbox"/>
            <label for="terms">
              {{ $t('forgot_password.terms') }}
            </label>
          </div>
          <router-link to="" class="lato font-bold text-gray">{{ $t('forgot_password.learn_more') }}</router-link>
        </div>
        <button class="bg-heading text-white font-bold w-56 h-[64px] rounded-xl mt-4">{{ $t('forgot_password.reset_password') }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      terms : ""
    }
  }
}
</script>