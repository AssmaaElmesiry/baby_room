<template>
  <div>
    <!-- Breadcrumb -->
    <div class="bg-[#F5F5F5] py-6">
      <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.home') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <p class="lato text-lg text-primary-100">{{ $t('header.wishlist') }}</p>
      </div>
    </div>
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 pt-12">
      <!-- Empty Wishlist -->
      <div v-if="wishlistItems.length === 0" class="flex flex-col gap-4 justify-center items-center pt-8">
        <dotlottie-player src="https://lottie.host/5280ce3e-bf34-4f04-a909-a321d4dba17f/7BC3qeLWLZ.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
        <p class="text-center text-heading font-bold text-xl">{{ $t('menu.wishlist_empty') }}</p>
      </div>
      <div v-else>
        <div class="flex flex-col gap-5">
          <h2 class="font-bold text-[40px] text-heading">{{ $t('menu.your_wishlist') }}</h2>
          <p class="text-gray font-bold">{{ $t('menu.There_are') }} <span class="text-primary-100 font-bold">{{ totalWishlistItems }}</span> {{ $t('menu.products_in_your_wishlist') }}</p>
        </div>
        <div class="xl:grid hidden grid-cols-1 gap-4 pt-12 border-b border-[#E5E5E5]">
          <div class="grid grid-cols-7 bg-[#F5F5F5] rounded-md p-3">
            <div class="font-bold col-span-3 text-center">{{ $t('cart.products') }}</div>
            <div class="font-bold text-center">{{ $t('wishlist.price') }}</div>
            <div class="font-bold text-center">{{ $t('wishlist.stock_status') }}</div>
            <div class="font-bold text-center">{{ $t('wishlist.action') }}</div>
            <div class="font-bold text-center">{{ $t('wishlist.remove') }}</div>
          </div>
          <div v-for="item in wishlistItems" :key="item.id" class="grid grid-cols-7 items-center p-3">
            <div class="col-span-3 flex items-center gap-2">
              <div class="border border-[#E5E5E5] rounded-xl w-16 h-16 p-1">
                <img :src="item.image" alt="item.name" class="w-full h-full object-cover"/>
              </div>
              <div class="flex flex-col gap-2">
                <h2 class="font-bold text-heading">{{ item.name }}</h2>
                <div class="flex gap-2 items-center">
                  <vue3-star-ratings 
                    v-model="item.rating"
                    starColor="#F4A8AF"
                    inactiveColor="#CDCDCD"
                    :starSize="15"
                    :disableClick="true" 
                  />
                  <span class="lati text-xs text-gray">( {{ item.rate }} )</span>
                </div>
              </div>
            </div>
            <div class="text-center font-bold text-primary-100 text-2xl">{{ item.price }}</div>
            <div
              :class="{
                'bg-[#DEF9EC] text-[#B5DBD8]': item.inStock,
                'bg-[#FBDCDF] text-second': !item.inStock
              }"
              class="font-bold text-sm py-1 px-2 rounded-md w-fit"
            >
            {{ item.inStock ? $t('product_details.in_stock') : $t('product_details.out_of_stock') }}
            </div>
            <div>
              <button @click="addToCart(item)" class="bg-primary-100 text-white w-full h-12 flex justify-center items-center gap-2 rounded-lg">
                <p class="font-bold text-lg">{{ $t('buttons.add_to_cart') }}</p>
              </button>
            </div>
            <button @click="removeFromWishlist(item.id)" class="text-[#B6B6B6]">
              <font-awesome-icon :icon="['far', 'circle-xmark']" />
            </button>
          </div>
        </div>
        <!-- Mobile Responsive -->
        <div class="xl:hidden border border-[#E5E5E5] rounded-2xl py-11 px-10 shadow-md mt-6">
          <div class="border-b border-[#E5E5E5] pb-6 flex justify-between items-center">
            <div 
              class="flex items-center gap-2 text-gray self-end cursor-pointer"
              @click="clearWishlist"
              :class="{ 'animate': isAnimating }"
            >
              <font-awesome-icon :icon="['far', 'trash-can']" class="" />
              <p class="font-bold">{{ $t('wishlist.clear_wishlist') }}</p>
            </div>
          </div>
          <div v-if="wishlistItems.length === 0" class="flex flex-col gap-4 justify-center items-center pt-8">
            <img src="@/public/assets/images/cart_empty.png" alt="Cart is Empty" class="w-1/2"/>
            <p class="text-center text-heading font-bold text-xl">{{ $t('menu.cart_empty') }}</p>
          </div>
          <div v-for="item in wishlistItems" :key="item.id" class="flex flex-col xl:flex-row gap-4 justify-between items-center border-b border-[#E5E5E5] py-4">
            <div class="flex justify-between items-center gap-2 w-full">
              <div class="flex items-center gap-2">
                <div class="border border-[#E5E5E5] rounded-xl w-16 h-16 p-1">
                  <img :src="item.image" alt="item.name" class="w-full h-full object-cover"/>
                </div>
                <div class="font-bold text-heading">{{ item.name }}</div>
              </div>
              <button @click="removeFromWishlist(item.id)" class="text-[#B6B6B6]">
                <font-awesome-icon :icon="['far', 'circle-xmark']" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <LastBannerVue class="mt-16"/>
    </div>
  </div>
</template>

<script>
import { useWishlistStore } from '@stores/products/wishlist';
import { useCartStore } from '@stores/products/cart.js';
import LastBannerVue from '../../partials/home/LastBanner.vue';
import { useToast } from 'vue-toastification';

export default {
  components: {
    LastBannerVue
  },
  data() {
    return {
      totalWishlistItems: 0,
      wishlistStore: useWishlistStore(),
      cartStore: useCartStore(),
    };
  },
  computed: {
    wishlistItems() {
      return this.wishlistStore.wishlistItems;
    },
  },
  methods: {
    removeFromWishlist(productId) {
      this.wishlistStore.removeFromWishlist(productId);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(this.$t('toast_success_remove_to_wishlist'),  {
          position: toastPosition,
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          icon: true,
          rtl: this.$i18n.locale === 'ar' ? true : false
        });
    },
    addToCart(item) {
      this.cartStore.addToCart(item);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.success(item.name + this.$t('toast_success_add_to_cart'),  {
          position: toastPosition,
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          hideProgressBar: true,
          toastClassName: "my-custom-toast-class",
          icon: true,
          rtl: this.$i18n.locale === 'ar' ? true : false
        });
    },
    clearWishlist() {
      this.wishlistStore.clearWishlist();
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(this.$t('toast_success_remove_to_wishlist'),  {
          position: toastPosition,
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          icon: true,
          rtl: this.$i18n.locale === 'ar' ? true : false
        });
    },
  },
  mounted() {
    this.totalWishlistItems = this.wishlistItems.length; 
  },
};
</script>
