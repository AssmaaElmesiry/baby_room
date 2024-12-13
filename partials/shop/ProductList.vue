<template>
  <div>
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
      <div class="bg-[#F5F5F5] py-6 mt-11 px-9 flex xl:flex-row flex-col gap-4 justify-between xl:items-center items-start">
        <div>
          <p class="font-bold">
            {{ $t('menu.There_are') }} <span class="text-primary-100 font-bold">{{ filteredProducts.length }}</span> {{ $t('menu.products_in_this_category') }}</p>
        </div>
        <div class="flex xl:flex-row flex-col xl:items-end items-start gap-4">
          <div class="flex items-end">
            <label for="show">
            <font-awesome-icon :icon="['fas', 'grip-vertical']" /> Show:</label>
            <v-select 
              v-model="itemsPerPage" 
              :options="[10, 20, 50, 100]" 
              label="عدد العناصر" 
              placeholder="اختر عدد العناصر"
            />
          </div>
          <div class="flex items-end">
            <label for="sort">Sort by:</label>
            <v-select 
              v-model="sortBy" 
              :options="['featured', 'price', 'rating']" 
              placeholder=""
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-5 gap-4 py-12">
        <div
          v-for="product in filteredProducts" 
          :key="product.id"
          class="pt-5 pb-8 px-4 flex flex-col gap-7 border border-primary rounded-xl shadow-xl relative overflow-hidden group"
        >
          <div class="w-full h-52 flex justify-center relative">
            <img :src="product.image" class="w-full h-full object-contain"/>
            <!-- icons Action -->
            <div class="flex justify-center items-center top-24 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 absolute bg-white w-[108px] h-8 rounded-md border border-primary transition-all duration-700">
              <div class="icon mx-2 delay-100 relative" @click="addToWishlist(product)">
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
          <router-link :to="{ name: 'product_details', params: { id: product.id } }" class="flex flex-col gap-3">
            <div class="flex justify-between items-center text-gray text-xs">
              <p>{{ product.vendor }}</p>
              <p>{{ product.status }}</p>
            </div>
            <h3 class="font-bold text-sm text-heading-card">
              {{ product.name }}
            </h3>
            <span class="text-gray text-xs">{{ product.status }}</span>
            <div class="flex gap-1 items-end">
              <p class="text-primary-100 font-bold text-xl">${{ discountedPrice(product) }} </p>
              <span class="line-through text-gray font-bold text-xs"> ${{ product.price }}</span>
            </div>
          </router-link>
          <!-- discount -->
          <div 
            class="discount absolute bg-second-100 text-white ltr:rounded-tr-full rtl:rounded-tl-full ltr:rounded-br-full rtl:rounded-bl-full top-6 w-[130px] h-8 ltr:left-[-102px] rtl:right-[-102px] flex justify-center items-center transition-all duration-700 overflow-hidden group-hover:left-0 group-hover:right-0"
          >
            <p> Save {{ product.discount }}%</p>
          </div>
          <!-- used/new -->
          <div 
            class="used absolute bg-primary-100 text-white ltr:rounded-tr-full rtl:rounded-tl-full ltr:rounded-br-full rtl:rounded-bl-full top-20 w-[106px] h-8 ltr:left-[-80px] rtl:right-[-80px] flex justify-center items-center transition-all duration-300 overflow-hidden group-hover:left-0 group-hover:right-0"
          >
            <p>{{ product.used ? 'Used' : 'New' }}</p>
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
          <div class="flex justify-between items-center">
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
                :class="isActive ? 'text-second-100' : 'text-[#B6B6B6]'"
              />
              <p class="text-gray">Add to Compare</p>
            </div>
          </div>
        </div>
      </div>
      </template>
      <template #action>
      </template>
    </ui-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFlip,Navigation } from 'swiper/modules';
import { useCartStore } from '@stores/products/cart.js';
import { useWishlistStore } from '@stores/products/wishlist.js';
import { useCompareStore } from '@stores/products/compare.js';
import { useToast } from 'vue-toastification';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    filteredProducts: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      itemsPerPage: 50,
      sortBy: 'featured',
      showProductPopup: false,
      thumbsSwiper: null,
      modules: [EffectFlip, Navigation],
      swiperKey: 0,
      quantity: 1,
      isActive: false,
    }
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
    increase() {
      this.quantity += 1;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product, 1);
      const toast = useToast();
      if (this.selectedProduct) {
        cartStore.addToCart(this.selectedProduct, this.quantity);
      }
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.success(product.name + this.$t('toast_success_add_to_cart'),  {
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
    addToWishlist(product) {
      const wishlistStore = useWishlistStore();
      const toast = useToast();
      if (this.isInWishlist(product)) {
        wishlistStore.removeFromWishlist(product.id);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(product.name + this.$t('toast_success_remove_to_wishlist'),  {
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
      } else {
        wishlistStore.addToWishlist(product);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.success(product.name + this.$t('toast_success_add_to_wishlist'),  {
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
      }
    },
    isInWishlist(product) {
      const wishlistStore = useWishlistStore();
      return wishlistStore.wishlist.some(item => item.id === product.id);
    },
    addToCompare(product) {
      const compareStore = useCompareStore();
      const toast = useToast();
      if (this.isInCompare(product)) {
        compareStore.removeFromCompare(product);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(product.name + this.$t('toast_success_remove_to_compare'),  {
          position: toastPosition,
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          hideProgressBar: true,
          icon: true,
          rtl: this.$i18n.locale === 'ar' ? true : false
        });
      } else {
        compareStore.addToCompare(product);
        const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.success(product.name + this.$t('toast_success_add_to_compare'),  {
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
      }
    },
    isInCompare(product) {
      const compareStore = useCompareStore(); 
      return compareStore.compareList.some(item => item.id === product.id);
    },
  },
  watch:{
    '$i18n.locale'() {
      this.swiperKey += 1;
    }
  }
}
</script>
