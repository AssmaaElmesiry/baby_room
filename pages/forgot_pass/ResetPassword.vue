<template>
  <!-- Breadcrumb -->
  <div class="bg-[#F5F5F5] py-6">
    <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
      <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.home') }}</router-link>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
      <p class="lato text-lg text-primary-100">{{ $t('menu.login') }}</p>
    </div>
  </div>
  <div class="flex justify-center items-center min-h-screen container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
    <div class="flex flex-col justify-center items-center w-auto ">
      <div class="relative ltr:ml-[-35px] rtl:mr-[-35px]" style="align-self: baseline;">
        <dotlottie-player src="https://lottie.host/c8319423-d19a-46ad-a32d-b7dacdb8657c/4PyrtbU474.json" background="transparent" speed="1" style="width: 140px; height: 110px;" loop autoplay></dotlottie-player>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-heading font-bold xl:text-[40px] text-3xl">{{ $t('set_new_password.title') }}</h3>
        <p class="text-gray lato">{{ $t('set_new_password.message') }}</p>
        <form>
          <!-- Password Input -->
          <div class="mb-4">
            <input 
              type="password" 
              class="ltr:pl-9 trl:pr-9 border border-[#E5E5E5] h-16 rounded-xl w-full" 
              :placeholder="$t('set_new_password.password')" 
              v-model="password"
            />
          </div>

          <!-- Confirm Password Input -->
          <div class="mb-6">
            <input 
              type="password" 
              class="ltr:pl-9 trl:pr-9 border border-[#E5E5E5] h-16 rounded-xl w-full" 
              :placeholder="$t('set_new_password.confirm_password')" 
              v-model="confirmPassword"
            />
          </div>

          <!-- Set New Password Button -->
          <div class="text-center">
            <button 
              type="submit" 
              class="w-full py-4 bg-heading text-white rounded-lg font-bold focus:outline-none">
              {{ $t('set_new_password.button') }}
            </button>
          </div>
        </form>
        <!-- Password Requirements Section -->
        <div class="mt-6">
          <h4 class="text-lg font-bold text-gray">{{ $t('set_new_password.requirements_title') }} :</h4>
          <ul class="list-disc list-inside text-gray">
            <li>{{ $t('set_new_password.requirement_1') }}</li>
            <p>{{ $t('set_new_password.requirement_2') }} :</p>
            <li>{{ $t('set_new_password.requirement_uppercase') }}</li>
            <li>{{ $t('set_new_password.requirement_lowercase') }}</li>
            <li>{{ $t('set_new_password.requirement_number') }}</li>
            <li>{{ $t('set_new_password.requirement_special') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: ''
    };
  }
};
</script>