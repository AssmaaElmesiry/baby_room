<template>
  <div>
    <!-- Breadcrumb -->
    <div class="bg-[#F5F5F5] py-6">
      <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.home') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.shop') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <p class="lato text-lg text-primary-100">{{ $t('check_out.title') }}</p>
      </div>
    </div>
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 pt-12">
      <div class="flex flex-col gap-5">
        <h2 class="font-bold text-[40px] text-heading">{{ $t('check_out.title') }}</h2>
        <p class="text-gray font-bold">{{ $t('menu.There_are') }} <span class="text-primary-100 font-bold">{{ totalItems }}</span> {{ $t('menu.products_in_your_cart') }}</p>
      </div>
      <div class="pt-12 grid xl:grid-cols-3 grid-cols-1 gap-6">
        <div class="xl:col-span-2 xl:order-none order-2">
          <div class="grid xl:grid-cols-2 grid-cols-1 gap-7">
            <div class="border border-[#E5E5E5] shadow-md flex gap-3 items-center 3xl:px-14 px-10 h-[50px] rounded-lg ">
              <font-awesome-icon :icon="['far', 'user']" class="text-gray"/>
              <p class="text-gray lato">{{ $t('check_out.have_account') }}</p>
              <router-link to="/login" class="text-primary-100">{{ $t('check_out.click_here') }}</router-link>
            </div>
            <div class="relative rounded-xl border border-[#E5E5E5] h-[50px] overflow-hidden">
              <input class=" ltr:pl-[53px] rtl:pr-[53px] h-full ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg" :placeholder="$t('cart.coupon_code')"/>
              <font-awesome-icon :icon="['fas', 'tags']" class="text-[#B6B6B6] absolute ltr:left-[18px] top-4 text-lg" />
              <button class="absolute top-0 ltr:right-0 rtl:left-0 ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg bg-heading h-full text-white px-8" >{{ $t('cart.apply') }}</button>
            </div>
          </div>
          <!-- form -->
          <form class="pt-16" @submit.prevent="submitForm">
            <h2 class="text-heading text-2xl font-bold pb-10">{{ $t('check_out.billing_details') }}</h2>
            <div class="grid xl:grid-cols-2 grid-cols-1 gap-6">
              <input type="text" id="first_name" name="first_name" v-model="formData.first_name" :placeholder="$t('check_out.first_name')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="text" id="last_name" name="last_name" v-model="formData.last_name" :placeholder="$t('check_out.last_name')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="text" id="address_1" name="address_1" v-model="formData.address_1" :placeholder="$t('check_out.address_1')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="text" id="address_2" name="address_2" v-model="formData.address_2" :placeholder="$t('check_out.address_2')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300">
              <input type="text" id="state_country" name="state_country" v-model="formData.state_country" :placeholder="$t('check_out.state_country')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="text" id="city_town" name="city_town" v-model="formData.city_town" :placeholder="$t('check_out.city_town')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="text" id="postcode_zip" name="postcode_zip" v-model="formData.postcode_zip" :placeholder="$t('check_out.postcode_zip')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="tel" id="phone_number" name="phone_number" v-model="formData.phone_number" :placeholder="$t('check_out.phone_number')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="email" id="email" name="email" v-model="formData.email" :placeholder="$t('check_out.email')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300" required>
              <input type="text" id="company" name="company" v-model="formData.company" :placeholder="$t('check_out.company')" class="w-full border-2 h-16 border-primary relative ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300">
              <textarea 
                v-model="formData.additional_information"
                rows="5" 
                id="additional_information" 
                name="additional_information" 
                :placeholder="$t('check_out.additional_information')" 
                class="w-full border-2 border-primary relative pt-5 ltr:pl-8 rtl:pr-8 rounded-md transition ease-in duration-300 xl:col-span-2 resize-none"
              ></textarea>
            </div>
            <div class="pt-8 flex flex-col gap-5">
              <label class="flex items-center gap-3">
                <input type="checkbox" class="custom-checkbox" v-model="formData.create_account" />
                {{ $t('check_out.create_account') }}
              </label>
              <label class="flex items-center gap-3">
                <input type="checkbox" class="custom-checkbox" v-model="formData.skip" />
                {{ $t('check_out.skip') }}
              </label>
            </div>
            <div class="pt-16">
              <button type="submit" class="bg-primary-100 text-white font-bold h-[50px] w-full rounded flex gap-3 items-center justify-center" @click="openPopup">{{ $t('check_out.place') }} <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" class="rtl:rotate-180" /></button>
            </div>
          </form>
        </div>
        <!-- Your Order -->
        <div class="">
          <div class="border border-[#E5E5E5] rounded-2xl shadow-md h-max pt-7 pb-9 px-8 xl:order-none order-1">
            <div class="flex justify-between items-center pb-7 border-b border-[#E5E5E5]">
              <h3 class="text-heading text-2xl font-bold">{{ $t('check_out.your_orders') }}</h3>
              <p class="font-bold text-gray">{{ $t('cart.subtotal') }}</p>
            </div>
            <div class="h-[550px] overflow-auto">
              <div v-for="(item, index) in cartItems" :key="item.id" class="flex gap-4 justify-between items-center py-8">
                <div class="flex gap-3 items-center">
                  <img :src="item.image" alt="Product Image" class="w-16 h-16" />
                  <p class="font-bold w-1/2">{{ item.name }}</p>
                </div>
                <div>
                  <p class="font-bold text-2xl text-gray">  x{{ item.quantity }}</p>
                </div> 
                <div>
                  <p class="font-bold text-2xl text-primary-100">{{ item.price }}</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center pt-8 border-t border-[#E5E5E5]">
              <h3 class="text-heading text-2xl font-bold">{{ $t('cart.total') }}</h3>
              <p class="font-bold text-2xl text-primary-100">{{ total }}</p>
            </div>
          </div>
          <div class="pt-16">
            <h3 class="text-2xl text-heading font-bold">{{ $t('check_out.payment') }}</h3>
            <div class="flex items-center gap-2 mt-8">
              <input 
                type="radio" 
                v-model="formData.paymentMethod" 
                id="bank" 
                name="paymentMethod" 
                value="bank" 
                class="cursor-pointer w-5 h-5" 
              />
              <label 
                for="bank" 
                :class="{'text-heading': formData.paymentMethod === 'bank', 'text-gray': formData.paymentMethod !== 'bank'}" 
                class="cursor-pointer lato"
              >
                {{ $t('check_out.bank') }}
              </label>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <input 
                type="radio" 
                v-model="formData.paymentMethod" 
                id="cash" 
                name="paymentMethod" 
                value="cash" 
                class="cursor-pointer w-5 h-5" 
              />
              <label 
                for="cash" 
                :class="{'text-heading': formData.paymentMethod === 'cash', 'text-gray': formData.paymentMethod !== 'cash'}" 
                class="cursor-pointer lato"
              >
                {{ $t('check_out.cash') }}
              </label>
            </div>
            <div class="pt-5" v-if="formData.paymentMethod === 'bank'">
              <img src="@assets/images/payment_logo.png" />
            </div>
          </div>
        </div>
      </div>
      <ui-popup
        v-if="showPopup"
        :show="showPopup"
        @close="showPopup = false"
        :header="true"
        :content="true"
      >
        <template #content>
          <div class="flex flex-col justify-center items-center">
            <p class="text-7xl font-bold text-heading">Done </p>
            <dotlottie-player class="-mt-28" src="https://lottie.host/88aa3548-cee8-4526-a706-97065b94077b/2Q6u7RueTh.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
          </div>
        </template>
      </ui-popup>
    </div>
  </div>
</template>
<script>
import { useCartStore } from '@/stores/products/cart';

export default {
  data() {
    return {
      cartItems: [],
      totalItems: 0,
      total: 0,
      showPopup: false,
      formData: {
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        state_country: '',
        city_town: '',
        postcode_zip: '',
        phone_number: '',
        email: '',
        company: '',
        additional_information: '',
        create_account: false,
        skip: false,
        paymentMethod: '' // Ensure payment method is included in formData
      }
    };
  },
  mounted() {
    const cartStore = useCartStore();
    this.cartItems = cartStore.cartItems;
    this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  methods: {
    submitForm() {
      // Check if all required fields are filled
      const allFieldsFilled = Object.values(this.formData).every(field => field !== '' || typeof field === 'boolean');
      
      if (allFieldsFilled) {
        this.showPopup = true; // Show confirmation popup
      } else {
        alert("Please fill in all required fields."); // Error message
      }
    },
    proceedToPayment() {
      // Logic to proceed with payment, e.g., API call
      console.log("Proceeding to payment with data:", this.formData);
      this.showPopup = false; // Close popup
    },
  },
};
</script>

