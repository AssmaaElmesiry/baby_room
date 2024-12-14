<template>
  <div>
    <div class="grid xl:grid-cols-5 gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-12">
      <!-- Loading State -->
      <div v-if="loading">Loading products...</div>
      <!-- Products List -->
      <div
        v-else
        v-for="product in productsStore.products.slice(0, 4)" 
        :key="product.id"
        class="pt-5 pb-8 px-4 flex flex-col gap-7 border border-primary rounded-xl shadow-xl relative overflow-hidden group"
      >
        <div class="w-full h-52 flex justify-center relative">
          <img :src="product.image" class="w-full h-full object-contain"/>
          
          <!-- Icons Action -->
          <div class="flex justify-center items-center top-24 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 absolute bg-white w-[108px] h-8 rounded-md border border-primary transition-all duration-700">
            <div @click="addToWishlist(product)" class="icon  mx-2 delay-100 relative">
              <img src="@components/svg/fav.svg" class="hover:scale-125 transition-transform duration-300"/>
            </div>
            <div class="icon mx-2 delay-200 relative" @click="addToCompare(product)">
              <img src="@components/svg/shuffle.svg" class="hover:scale-125 transition-transform duration-300"/>
            </div>
            <div class="icon mx-2 delay-300 relative" @click="openProductPopup(product)">
              <img src="@components/svg/eye.svg" class="hover:scale-125 transition-transform duration-300"/>
            </div>
          </div>
        </div>
        <!-- Product Details -->
        <div class="flex flex-col gap-3">
          <router-link :to="{ name: 'product_details', params: { id: product.id } }"  class="flex justify-between items-center text-gray text-xs">
            <p>{{ product.vendor }}</p>
            <p>{{ product.status }}</p>
          </router-link>
          <router-link :to="{ name: 'product_details', params: { id: product.id } }"  class="font-bold text-sm text-heading-card">{{ product.name }}</router-link>
          <span class="text-gray text-xs">{{ product.status }}</span>
          <div class="flex justify-between items-center">
            <div class="flex gap-1 items-end">
              <p class="text-primary-100 font-bold text-xl">${{ discountedPrice(product) }}</p>
              <span class="line-through text-gray font-bold text-xs">${{ product.price }}</span>
            </div>
            <div class="text-primary-100 bg-[#DEF9EC] py-1 px-2 rounded-md font-bold cursor-pointer" @click="addToCart(product)">
              {{ isInCart(product) ? $t('added') : $t('add') }}
              <font-awesome-icon :icon="['fas', 'plus']" />
            </div>
          </div>
        </div>
        
        <!-- Sale Badge -->
        <div 
          class="sale absolute bg-[#F6C851] text-white ltr:rounded-tr-full ltr:rounded-br-full rtl:rounded-tl-full rtl:rounded-bl-full top-6 w-[106px] h-8 flex justify-center items-center transition-all duration-300 overflow-hidden group-hover:left-0"
          :class="{ 'ltr:left-[-80px] group-hover:left-0': $i18n.locale === 'en', 'rtl:right-[-80px] group-hover:right-0': $i18n.locale === 'ar' }"
        >
          <p>{{ $t('product_details.sale') }}</p>
        </div>
      </div>
      <div>
          <div class="rounded-2xl overflow-hidden bg-[#EDF1F4] flex flex-col gap-3 h-full relative before:absolute before:rounded-full before:bg-[#E7AC3E1A] before:w-[120px] before:h-[120px] before:ltr:left-[-60px] before:rtl:right-[-60px] before:top-[40%]">
            <div class="p-7 flex flex-col gap-3">
              <span class="text-second font-bold text-xl">{{ $t('product_details.summerDeals') }}</span>
              <h2 class="text-heading font-bold 2xl:text-4xl text-2xl">{{ $t('product_details.topBabyProducts') }}</h2>
              <span class="text-gray lato 2xl:text-lg">{{ $t('product_details.topBabyProducts') }}</span>
            </div>
            <div class="bg-[url('@/public/assets/images/bestsellerBanner.png')] bg-no-repeat bg-cover h-full pt-32">
              <router-link to="/products" class="ltr:ml-12 rtl:mr-12 w-[108px] h-8 flex justify-center items-center gap-2 text-xs bg-primary-100 text-white hover:bg-second transform duration-500 ease-in-out font-bold mb-10">
              {{ $t('buttons.shop_now') }}
              <img src="@components/svg/arrow_right.svg" class="rtl:rotate-180"/>
            </router-link>
            </div>
            
          </div>
      </div>
    </div>
    <ui-popup 
      :show="showProductPopup" 
      @close="closeProductPopup" 
      :header="true"
      :content="true"
    >
      <template #content>
      <div class="grid xl:grid-cols-2 grid-cols-1 gap-4">
        <div class="" v-if="selectedProduct.images.length > 0">
          <swiper
            v-if="selectedProduct?.images && selectedProduct.images.length > 0"
            :effect="'flip'"
            :grabCursor="true"
            :navigation="true"
            :modules="modules"
            :dir="isLtr ? 'ltr' : 'rtl'"
            class="mySwiper !pt-5"
          >
            <swiper-slide v-for="(image, index) in selectedProduct.images" :key="index">
              <img class="main-image" :src="image" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="pt-7 flex flex-col gap-2">
          <div
              :class="{
                'bg-[#DEF9EC] text-[#B5DBD8]': selectedProduct.inStock,
                'bg-[#FBDCDF] text-second': !selectedProduct.inStock
              }"
              class="font-bold text-sm py-1 px-2 rounded-md w-fit"
            >
            {{ selectedProduct.inStock ? $t('product_details.in_stock') : $t('product_details.out_of_stock') }}
            </div>
          <h2 class="text-xl font-bold text-primary-100">{{ selectedProduct?.name }}</h2>
          <div class="flex gap-2 items-center">
                <vue3-star-ratings 
                  v-model="selectedProduct.rating"
                  starColor="#F4A8AF"
                  inactiveColor="#CDCDCD"
                  :starSize="20"
                  :disableClick="true" 
                />
                <span class="lati text-xs text-gray">( {{ selectedProduct.rate }} )</span>
            </div>
          <span class="text-gray font-bold">{{ selectedProduct.status }}</span>
          <span class="text-gray">{{ selectedProduct.description }}</span>
          <div class="flex gap-1 items-end">
            <p class="text-primary-100 font-bold text-xl">${{ discountedPrice(selectedProduct) }} </p>
            <span class="line-through  text-gray font-bold text-xs"> ${{ selectedProduct.price }}</span>
          </div>
          <div class="flex justify-between items-center gap-6">
            <button @click="increase" class="flex justify-center items-center cursor-pointer text-white w-8">
              <img src="@components/svg/plus.png" />
            </button>
            <input 
              type="number" 
              class="text-primary-100 border-2 border-primary-100 h-12 w-full rounded-lg text-center no-arrows font-bold text-xl" 
              min="1"
              v-model="quantity"
            />
            <button @click="decrease" class="flex justify-center items-center cursor-pointer text-white w-8">
              <img src="@components/svg/minus.png" />
            </button>
          </div>
          <button @click="addToCart(selectedProduct)" class="bg-primary-100 text-white w-full h-12 flex justify-center items-center gap-2 rounded-lg">
            <img src="@components/svg/shopping-cart.svg"/>
            <p class="font-bold text-lg">{{ $t('buttons.add_to_cart') }}</p>
          </button>
          <div class="flex justify-between gap-6 items-center w-max">
              <div 
                class="flex gap-3 items-center cursor-pointer" 
                @click="addToWishlist(selectedProduct)"
              >
                <font-awesome-icon :icon="['fas', 'heart']" class="text-[#B6B6B6] text-xl"
                :class="isInWishlist(selectedProduct) ? 'text-second' : 'text-[#B6B6B6]'"/>
                <p class="text-gray">{{ isInWishlist(selectedProduct) ? 'Added to wishlist' : 'Add to wishlist' }}</p>
              </div>

            <div class="flex items-center gap-3 cursor-pointer" @click="addToCompare(selectedProduct)">
              <font-awesome-icon 
                :icon="['fas', 'shuffle']" 
                class=" text-[#B6B6B6]"
                :class="isInCompare(selectedProduct) ? 'text-second' : 'text-[#B6B6B6]'"
              />
              <p class="text-gray">{{ isInCompare(selectedProduct) ? 'Added to Compare' : 'Add to Compare' }}</p>
            </div>
          </div>
        </div>
      </div>
      </template>
      <template #action>
      </template>
    </ui-popup>
  </div>
</template>

<script>
import { useProductsStore } from '@stores/products/index.js'
import { useWishlistStore } from '@stores/products/wishlist.js';
import { useCompareStore } from '@stores/products/compare.js';
import { useCartStore } from '@stores/products/cart.js';

import { mapStores } from "pinia";
import { Swiper, SwiperSlide } from 'swiper/vue';
import {EffectFlip , Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      selectedProduct: null,
      product: null,
      modules: [EffectFlip , Navigation],
      swiperKey: 0,
      loading: false,
      showProductPopup: false,
      quantity: 1,
      isActive: false,
      isAdded: {}, 
    };
  },
  computed: {
    ...mapStores(useProductsStore),
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
    openProductPopup(product) {
      console.log('Opening product:', product);
      if (!product) {
        console.error('No product provided to openProductPopup');
        return;
      }
      this.selectedProduct = product;
      console.log('Selected Product:', this.selectedProduct);
      this.showProductPopup = true;
    },
    closeProductPopup() {
      this.showProductPopup = false;
      this.selectedProduct = null;
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product, 1);
      this.isAdded[product.id] = true;
      if (this.selectedProduct && this.quantity > 0) {
        cartStore.addToCart(this.selectedProduct, this.quantity);
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
    isInCart(product) {
      return this.isAdded[product.id] || false;
    },
    addToWishlist(product) {
      const wishlistStore = useWishlistStore();
      
      if (this.isInWishlist(product)) {
        wishlistStore.removeFromWishlist(product.id);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        this.$toast(this.$t('toast_success_remove_from_wishlist'), {
          autoClose: 3000,
          position: toastPosition,
          hideProgressBar: false,
        });
      } else {
        wishlistStore.addToWishlist(product);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        this.$toast(this.$t('toast_success_add_to_wishlist'), {
          autoClose: 3000,
          position: toastPosition,
          hideProgressBar: false,
        });
      }
    },
    isInWishlist(product) {
      const wishlistStore = useWishlistStore();
      return wishlistStore.wishlist.some(item => item.id === product.id);
    },
    addToCompare(product) {
      const compareStore = useCompareStore();
      if (this.isInCompare(product)) {
        compareStore.removeFromCompare(product);
      } else {
        compareStore.addToCompare(product);
      }
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
      this.$toast(this.isInCompare(product) ? 'Removed from compare' : 'Added to compare', {
        autoClose: 3000,
        position: toastPosition,
        hideProgressBar: false,
      });
    },
    isInCompare(product) {
      const compareStore = useCompareStore(); 
      return compareStore.compareList.some(item => item.id === product.id);
    },
    increase() {
      this.quantity += 1;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
  },
  watch: {
    '$i18n.locale'() {
      this.productsStore.fetchProducts(newValue);
    }
  }
};
</script>
<style>
[dir="ltr"] .sale:not(:last-child):before {
  content: "";
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #BCE3C9;
  right: -10px !important;
}
[dir="rtl"] .sale:not(:last-child):before {
  content: "";
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #BCE3C9;
  left: -10px !important;

}
</style>