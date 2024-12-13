<template>
  <div id="deals">
    <div class="flex  justify-between mb-11">
      <h2 class="3xl:text-[40px] md:text-3xl text-2xl font-bold text-heading">
        {{ $t('home.deals') }}
      </h2>
      <router-link to="">{{ $t('home.all_deals') }}</router-link>
    </div>
    <div class="grid xl:grid-cols-4 gap-4 xl:gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      <div v-if="loading">Loading products...</div>
      <div
        v-for="product in productsStore.products.slice(0, 4)" 
        :key="product.id"
        class="flex flex-col group"
      >
        <img src="@assets/images/bestsellerBanner.png" class="rounded-3xl"/>
        <div class="-mt-32 flex flex-col">
          <div>
            <vue-countdown 
              :time="product.countdownTime"
              :transform="transformSlotProps" 
              v-slot="{ days, hours, minutes, seconds }"
              class="flex gap-4 items-center justify-center mx-4"
            >
              <div class="flex flex-col justify-center items-center w-[60px] h-[60px]  bg-white rounded-lg p-2">
                <p class="font-bold text-3xl text-primary-100">{{ days }}</p><span class="text-gray text-sm"> days</span>
              </div>
              <div class="flex flex-col justify-center items-center w-[60px] h-[60px]  bg-white rounded-lg p-2">
                <p class="font-bold text-3xl text-primary-100">{{ hours }}</p><span class="text-gray text-sm"> hours</span>
              </div>
              <div class="flex flex-col justify-center items-center w-[60px] h-[60px]  bg-white rounded-lg p-2">
                <p class="font-bold text-3xl text-primary-100">{{ minutes }}</p><span class="text-gray text-sm"> minutes</span>
              </div>
              <div class="flex flex-col justify-center items-center w-[60px] h-[60px]  bg-white rounded-lg p-2">
                <p class="font-bold text-3xl text-primary-100">{{ seconds }}</p><span class="text-gray text-sm"> seconds</span>
              </div>
            </vue-countdown>
          </div>
          <div class="bg-white mt-3 mx-[26px] py-6 px-8 flex flex-col gap-3 rounded-xl shadow-lg">
            <h3 class="text-sm text-heading font-bold">{{ product.name }}</h3>
            <p class="lato text-gray text-sm">{{ product.status }}</p>
            <p class="lato text-gray text-sm">{{ product.category }}</p>
            <div class="flex justify-between items-center">
              <div class="flex gap-1 items-end">
                <p class="text-primary-100 font-bold text-xl">${{ discountedPrice(product) }} </p>
                <span class="line-through  text-gray font-bold text-xs"> ${{ product.price }}</span>
              </div>
              <button class="bg-[#DEF9EC] text-primary-100 w-[76px] h-8 flex justify-center items-center group-hover:bg-opacity-40 group-hover:bg-second group-hover:text-second rounded-md transform duration-500 ease-in-out" @click="addToCart(product)">
                {{ $t('home.add') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useProductsStore } from '@stores/products/index.js';
import { useCartStore } from '@stores/products/cart.js';

export default {
  props: {

  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapStores(useProductsStore),
  },
  mounted() {
    this.productsStore.fetchProducts(this.$i18n.locale);
  },
  watch: {
    '$i18n.locale'(newValue) {
      this.productsStore.fetchProducts(newValue);
    },
  },
  methods: {
    discountedPrice(product) {
      if (!product.price || !product.discount) {
        return product.price;
      }
      const discountValue = parseFloat(product.discount) / 100;
      const discountAmount = product.price * discountValue;
      
      return (product.price - discountAmount).toFixed(2);
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product, 1);
      if (this.selectedProduct) {
        cartStore.addToCart(this.selectedProduct, this.quantity);
        cartStore.addToCart(product);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        this.$toast(this.$t('toast_success_add_to_cart'), {
          autoClose: 3000,
          position: toastPosition,
          hideProgressBar: false,
        });
      } else {
        console.error('No product selected for adding to cart');
      }
    },

  }

}
</script>