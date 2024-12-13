<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10" v-if="product"> 
    <!-- Breadcrumb -->
    <div class="flex gap-2 items-center pb-6">
      <router-link to="/" class="lato text-lg text-gray">
      {{ $t('menu.home') }}
      </router-link>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
      <router-link to="/" class="lato text-lg text-gray">{{ product.status}}</router-link>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
      <p class="lato text-lg text-primary-100">{{ product.name}} </p>
    </div>
    <div class="grid xl:grid-cols-4 grid-cols-1 gap-7">
      <div class="col-span-3">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-9">
          <div>
            <div v-if="product && product.images && product.images.length > 0">
              <Fancybox
                :options="{
                  Carousel: {
                    infinite: false,
                  },
                }"
              >
                <swiper
                  v-if="product.images.length > 0"
                  :loop="true"
                  :spaceBetween="50"
                  :navigation="false"
                  :dir="isLtr ? 'ltr' : 'rtl'"
                  :thumbs="{ swiper: thumbsSwiper }"
                  :modules="modules"
                  class="view-image"
                >
                  <swiper-slide
                    v-for="(image, index) in product.images" 
                    :key="index"
                  >
                    <a data-fancybox="gallery" :href="image">
                      <img class="main-image" :src="image" />
                    </a>
                  </swiper-slide>
                </swiper>
                <div class="overflow-hidden">
                    <swiper
                    @swiper="setThumbsSwiper"
                    :loop="false"
                    :spaceBetween="25"
                    :slidesPerView="4"
                    :freeMode="true"
                    :watchSlidesProgress="true"
                    :modules="modules"
                    :navigation="true"
                    :dir="isLtr ? 'ltr' : 'rtl'"
                    :key="swiperKey"
                    class="mySwiper mt-10"
                  >
                    <swiper-slide
                      v-for="(image, index) in product.images" 
                      :key="index"
                    >
                      <img :src="image" class="thumbnail-image" />
                    </swiper-slide>
                  </swiper>
                </div>

              </Fancybox>
            </div>
            <div v-else>تحميل...</div>
          </div>
          <div class="flex flex-col gap-6">
            <div
              :class="{
                'bg-[#DEF9EC] text-[#B5DBD8]': product.inStock,
                'bg-[#FBDCDF] text-second': !product.inStock
              }"
              class="font-bold text-sm py-1 px-2 rounded-md w-fit"
            >
            {{ product.inStock ? $t('product_details.in_stock') : $t('product_details.out_of_stock') }}
            </div>
            <h2 class="text-heading 3xl:text-[40px] text-3xl font-bold">{{ product.name }}</h2>
            <div class="flex gap-2 items-center">
                <vue3-star-ratings 
                  v-model="product.rating"
                  starColor="#F4A8AF"
                  inactiveColor="#CDCDCD"
                  :starSize="20"
                  :disableClick="true" 
                />
                <span class="lati text-xs text-gray">( {{ product.rate }} )</span>
            </div>
            <div class="flex gap-1 items-end">
              <p class="text-primary-100 font-bold 3xl:text-7xl text-5xl">${{ discountedPrice(product) }} </p>
              <span class="line-through  text-gray font-bold text-3xl"> ${{ product.price }}</span>
            </div>
            <p class="text-gray text-lg lato">{{ product.description }}</p>
            <div class="flex items-center gap-3">
              <div class="relative flex items-center">
                <input 
                  type="number" 
                  class="text-primary-100 border-2 border-primary-100 h-12 w-28 rounded-lg text-center no-arrows font-bold text-xl ltr:pr-8 rtl:pl-8" 
                  min="1"
                  v-model="quantity"
                />
                <div class="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 flex flex-col">
                  <button @click="increase" class="text-primary-100">
                    <font-awesome-icon :icon="['fas', 'angle-up']" class="text-sm" />
                  </button>
                  <button @click="decrease" class="text-primary-100">
                    <font-awesome-icon :icon="['fas', 'angle-down']" class="text-sm" />
                  </button>
                </div>
              </div>
              <div>
                <button @click="addToCart" class="bg-primary-100 text-white w-44 h-12 flex justify-center items-center gap-2">
                  <img src="@components/svg/shopping-cart.svg"/>
                  <p class="font-bold text-lg">{{ $t('buttons.add_to_cart') }}</p>
                </button>
                
              </div>
              <div class="flex gap-3 items-center">
                <div class="border border-[#F2F3F4] rounded-md flex justify-center items-center w-[50px] h-[50px]"  @click="addToWishlist(product)">
                  <font-awesome-icon :icon="['far', 'heart']" class="text-[#B6B6B6]" :class="{'text-second-100': isWished}"/>
                </div>
                <div class="border border-[#F2F3F4] rounded-md flex justify-center items-center w-[50px] h-[50px]" @click="addToCompare(product)">
                  <font-awesome-icon :icon="['fas', 'shuffle']" class=" text-[#B6B6B6]" :class="{'text-second-100': isCompared}"/>
                </div>
              </div>
            </div>
            <div class="pt-4 flex flex-col gap-3">
              <p class="lato text-lg text-heading flex items-center gap-2">{{ $t('product_details.vendor') }} : <span class="text-gray">{{ product.vendor }}</span></p>
              <p class="lato text-lg text-heading"> {{ $t('product_details.SKU') }} : <span class="text-gray">{{ product.SKU }}</span></p>
            </div>
          </div>
        </div>
        <!-- Information -->
        <div class="mt-[67px] p-12 border border-[#F2F3F4] rounded-2xl">
          <div class="flex gap-5">
            <div 
              class="cursor-pointer border border-[#F2F3F4] py-3 px-7 rounded-full transition-colors duration-200  flex justify-center items-center text-[#B6B6B6]"
              :class="{ selectedTab: selectedTab === 0, unselectedTab: selectedTab !== 0 , active: selectedTab === 0 }"
              @click="selectTab(0)"
            >
              <span class="text-lg font-bold">{{ $t('product_details.description') }}</span>
            </div>
            
            <div 
              class="cursor-pointer border border-[#F2F3F4] py-3 px-7 rounded-full transition-colors duration-200  flex justify-center items-center text-[#B6B6B6]"
              :class="{ selectedTab: selectedTab === 1, unselectedTab: selectedTab !== 1, active: selectedTab === 1  }"
              @click="selectTab(1)"
            >
              <span class="text-lg font-bold">{{ $t('product_details.additional_info') }}</span>
            </div>
            
            <div 
              class="cursor-pointer border border-[#F2F3F4] py-3 px-7 rounded-full transition-colors duration-200  flex justify-center items-center text-[#B6B6B6]"
              :class="{ selectedTab: selectedTab === 2, unselectedTab: selectedTab !== 2 , active: selectedTab === 2  }"
              @click="selectTab(2)"
            >
              <span class="text-lg font-bold">{{ $t('product_details.reviews') }}</span>
            </div>
          </div>

           <!-- Tabs Content -->
           <div class="pt-4">
              <div v-if="selectedTab === 0" class="flex flex-col gap-3">
                <div>
                  <p class="lato text-gray">{{ $t('product_details.description_details') }}</p>
                  <br>
                  <p class="lato text-gray">{{ $t('product_details.description_details') }}</p>
                </div>
                <div class="pt-12">
                  <h3 class="text-heading text-xl font-bold  pb-4">{{ $t('product_details.packaging_and_delivery') }}</h3>
                  <p class="lato text-gray">{{ $t('product_details.description_details') }}</p>
                  <br>
                  <p class="lato text-gray">{{ $t('product_details.description_details') }}</p>
                </div>
                <div class="pt-12">
                  <h3 class="text-heading text-xl font-bold  pb-4">{{ $t('product_details.packaging_and_delivery') }}</h3>
                  <p class="lato text-gray">{{ $t('product_details.description_details') }}</p>
                  <br>
                  <p class="lato text-gray">{{ $t('product_details.description_details') }}</p>
                </div>
                
              </div>
              <div v-if="selectedTab === 1">
                <p>This is the content for the second tab.</p>
              </div>
              <div v-if="selectedTab === 2">
                <p>This is the content for the third tab.</p>
              </div>
            </div>
        </div>
      </div>
      <!-- Slide -->
      <div class="flex flex-col gap-14">
        <div class="shadow-lg rounded-2xl p-7">
          <h2 class="text-2xl text-heading font-bold pb-3 border-b border-[#D7DEDB]">{{ $t('home.top_rated') }}</h2>
          <div class="grid grid-cols-1 gap-6 pt-9">
            <div 
              v-for="product in productsStore.products.slice(0, 4)" 
              :key="product.id"
              >
              <div class="flex gap-2">
                <div class="w-32 h-32">
                  <img :src="product.image" class="rounded-lg" />
                </div>
                <div class="flex flex-col gap-3">
                  <h2 class="text-sm font-bold text-heading">{{ product.name }}</h2>
                  <div class="flex gap-2 items-center">
                    <vue3-star-ratings 
                      v-model="product.rating"
                      starColor="#F4A8AF"
                      inactiveColor="#CDCDCD"
                      :starSize="13"
                    />
                    <span class="lati text-xs text-gray">( {{ product.rate }} )</span>
                  </div>
                  <div class="flex gap-1 items-end">
                    <p class="text-primary-100 font-bold text-xl">${{ discountedPrice(product) }} </p>
                    <span class="line-through  text-gray font-bold text-xs"> ${{ product.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- Related Products -->
    <div class="">
      <div>
        <RelatedProducts/>
      </div>
    </div>
    <LastBanner />
  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapStores } from "pinia";
import { useProductsStore } from '@stores/products/index.js';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Fancybox from '../../../components/ui/Fancybox.vue';
import { useCartStore } from '@stores/products/cart.js';
import { useWishlistStore } from '@stores/products/wishlist.js';
import { useCompareStore } from '@stores/products/compare.js';
import BestSellers from '@partials/home/BestSellers.vue';
import RelatedProducts from '@partials/shop/RelatedProducts.vue';
import LastBanner from '../../../partials/home/LastBanner.vue';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Fancybox,
    BestSellers,
    RelatedProducts,
    LastBanner
  },
  data() {
    return {
      product: null,
      thumbsSwiper: null,
      modules: [FreeMode, Navigation, Thumbs ],
      swiperKey: 0,
      quantity: 1,
      selectedTab: 0,
      isWished: false,
      isCompared: false,
    };
  },
  created() {
    const productId = Number(this.$route.params.id);
    const productStore = useProductsStore();
    this.product = productStore.getProductById(productId);
  },
  computed:{
    isLtr() {
      return this.$i18n.locale === 'en';
    },
    ...mapStores(useProductsStore),
  },
  mounted() {
    this.productsStore.fetchProducts(this.$i18n.locale);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    discountedPrice(product) {
      if (!product.price || !product.discount) {
        return product.price;
      }
      const discountValue = parseFloat(product.discount) / 100;
      const discountAmount = product.price * discountValue;
      
      return (product.price - discountAmount).toFixed(2);
    },
    increase() {
      this.quantity += 1;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    addToCart() {
      const cartStore = useCartStore();
      cartStore.addToCart(this.product, this.quantity);

      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
      toast.success(this.$t('toast_success_add_to_cart'), {
        autoClose: 3000,
        position: toastPosition,
        hideProgressBar: false,
      });
    },
    addToWishlist(product) {
      const wishlistStore = useWishlistStore();
      this.isWished = !this.isWished;
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
      this.isCompared = !this.isCompared;
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
    selectTab(index) {
      this.selectedTab = index;
    },
  },
  watch: {
    '$i18n.locale'() {
      this.productsStore.fetchProducts(newValue);
      this.swiperKey += 1;
    }
  },
};
</script>

<style>
.main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.view-image.swiper{
  border: 1px solid #E5E5E5;
  border-radius: 15px;
  padding: 30px;
}
.mySwiper.swiper{
  overflow: visible;
}
.mySwiper .swiper-button-prev ,
 .mySwiper .swiper-button-next {
  background-color: #B5DBD8;
  color: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  top: -70px
}
.mySwiper .swiper-button-prev:after,
 .mySwiper .swiper-button-next:after {
  font-size: 10px;
}
.mySwiper.swiper .swiper-slide{
  border: 1px solid #E5E5E5;
  border-radius: 15px;
  overflow: hidden;
}
.mySwiper .swiper-button-prev,
.mySwiper .swiper-button-next {
  top: -15px;
}
[dir="ltr"] .mySwiper .swiper-button-prev{
  left: 0;
}
[dir="ltr"] .mySwiper .swiper-button-next{
  left: 0;
}
[dir="rtl"] .mySwiper .swiper-button-prev{
  right: 0;
}
[dir="rtl"] .mySwiper .swiper-button-next{
  left: 0;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.active{
  color: #B5DBD8;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);;
}
</style>
