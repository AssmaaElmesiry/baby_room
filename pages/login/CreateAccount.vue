<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
    <div class="flex xl:flex-row flex-col items-center justify-center min-h-screen ">
      <div class="max-w-md w-full p-6 rounded-lg">
        <h2 class="text-[40px] font-bold mb-4 text-heading">Create an Account</h2>
        <p class=" mb-6 text-gray text-xs">
          Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
        </p>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <input type="text" id="username" v-model="username" placeholder="Username" class="w-full border border-[#E5E5E5] rounded-lg px-9 h-16" required />
          </div>
          <div class="mb-4">
            <input type="email" id="email" v-model="email" placeholder="Email" class="w-full border border-[#E5E5E5] rounded-lg px-9 h-16" required />
          </div>
          <div class="mb-4">
            <input type="password" id="password" v-model="password" placeholder="Password" class="w-full border border-[#E5E5E5] rounded-lg px-9 h-16" required />
          </div>
          <div class="mb-4">
            <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm password" class="w-full border border-[#E5E5E5] rounded-lg px-9 h-16" required />
          </div>
          <div class="flex items-center mb-4">
            <input type="checkbox" id="terms" v-model="terms" class="mx-2 custom-checkbox" required />
            <label for="terms" class="flex justify-between items-center">
              I agree to terms & Policy. <a href="#" class="text-primary">Learn more</a>
            </label>
          </div>
          <button type="submit" class="bg-heading text-white w-full p-2 rounded-lg">Submit & Register</button>
        </form>
      </div>
      <div class="border border-[#E5E5E5] rounded-2xl flex flex-col gap-4 py-8 px-12">
        <div class=" flex gap-4 items-center h-14 border border-[#F2F3F4] shadow-md px-6 rounded-2xl cursor-pointer">
          <img src="@assets/images/GoogleLogo.svg" />
          <p class="font-bold text-xl text-gray">Continue with Google</p>
        </div>
        <div class="bg-black flex gap-4 items-center h-14 shadow-md px-6 rounded-2xl cursor-pointer">
          <img src="@assets/images/AppleLogo.svg" />
          <p class="font-bold text-xl text-white">Continue with Apple</p>
        </div>
      </div>
    </div>
    <LastBanner />
  </div>
</template>

<script>
import LastBanner from '@partials/home/LastBanner.vue';

export default {
  components:{LastBanner},
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    };
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        terms: this.terms,
      });
    },
  },
};
</script>