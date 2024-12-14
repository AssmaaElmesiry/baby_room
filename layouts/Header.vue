<template>
  <div class="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E5E5E5] ">
    <!-- top Header -->
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
      <div class="flex justify-between items-center pt-[18px] pb-[10px] ">
        <!-- logo -->
        <div class="flex xl:order-none order-2">
          <router-link to="/" class="flex xl:justify-start justify-end items-center">
            <img src="@/public/assets/images/BRLogo.svg" class="xl:w-full w-4/5"/>
          </router-link>
        </div>
        <!-- Search Bar -->
        <div class="hidden xl:flex flex-grow mx-32 relative">
          <input id="search" type="text" class="w-full border-2 h-[50px] border-primary relative ltr:pl-48 rtl:pr-48 rounded-md transition ease-in duration-300"/>
          <v-select
            :options="categories"
            v-model="selectedCategory"
            placeholder="All Categories"
            label="name"
            class=" !absolute top-2 w-44 font-bold"
          />
          <span class="absolute top-4 ltr:right-6 rtl:left-6"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-gray" /></span>
          <span class="h-[19px] w-[2px] bg-[#CACACA] absolute top-4 ltr:left-44 rtl:right-44"></span>
        </div>
        <div class="flex items-center gap-2 xl:order-3 order-3">
          <!-- Account -->
          <router-link to="/my_account" class="xl:flex hidden items-baseline gap-2 mx-2">
            <img src="@components/svg/user.svg" class="" v-tooltip="$t('header.account')"/>
            <p class="text-gray lato xl:block hidden">{{ $t('header.account') }}</p>
          </router-link>
          <!-- Compare --> 
          <router-link to="/compare" class="flex items-baseline gap-2 mx-2 relative">
            <img src="@components/svg/compare.svg" v-tooltip="$t('header.compare')"/>
            <p class="text-gray lato xl:block hidden">{{ $t('header.compare') }}</p>
          </router-link>
          <!-- Wishlist -->
          <div @click.prevent="add_to_wishlist"  class="flex items-baseline gap-2 mx-2 relative">
            <img src="@components/svg/heart.svg" v-tooltip="$t('header.wishlist')"/>
            <span class="w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white absolute -top-2 rtl:right-3 ltr:left-3"> {{ totalWishlistItems  }}</span>
            <p class="text-gray lato xl:block hidden">{{ $t('header.wishlist') }}</p>
          </div>
          <!-- Cart -->
          <div @click.prevent="add_to_cart" class="flex items-baseline gap-2 mx-2 relative">
            <img src="@components/svg/cart.svg" v-tooltip="$t('header.cart')"/>
            <span class="w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white absolute -top-2 rtl:right-3 ltr:left-3">{{ totalItems }}</span>
            <p class="text-gray lato xl:block hidden">{{ $t('header.cart') }}</p>
          </div>
          <!-- language -->
          <div class="xl:flex hidden 3xl:w-12 w-7 3xl:h-12 h-7 bg-primary-100 justify-center items-center lang relative rounded-full ">
              <div @click="appStore.setLanguage($i18n, 'en')" class="flex flex-row items-center gap-2 cursor-pointer"
                  v-if="appStore.language == 'ar'">
                  <p class="text-white 3xl:text-lg text-sm p-1 ">EN</p>
              </div>
              <div @click="appStore.setLanguage($i18n, 'ar')" v-if="appStore.language == 'en'"
                  class="flex flex-row-reverse items-center gap-2 cursor-pointer -mt-2">
                  <p class="text-white 3xl:text-lg text-sm p-1">ع</p>
              </div>
          </div>
        </div>
        <!-- Bars -->
        <div class="block xl:hidden order-1"  @click="toggleSlideOver">
          <img src="@components/svg/bars.svg" class="w-9 h-9"/>
        </div>
      </div>
    </div>
    <!-- Menu Bar -->
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 border-t border-[#E5E5E5]">
      <div class="xl:flex hidden justify-between items-center py-3">
        <div class="2xl:flex hidden 3xl:gap-9 gap-3 items-center">
          <div class="relative text-lg 3xl:w-64 w-56">
            <button
              class="flex items-center justify-between px-3 py-2 bg-second text-white w-full rounded-md"
              @click="isOptionsExpanded = !isOptionsExpanded"
              @blur="isOptionsExpanded = false"
            >
              <img src="@components/svg/apps.svg"/>
              <span class="font-bold 3xl:text-base text-sm">{{ selectedOption}}</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
                :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <transition
              enter-active-class="transform transition duration-500 ease-custom"
              enter-class="-translate-y-1/2 scale-y-0 opacity-0"
              enter-to-class="translate-y-0 scale-y-100 opacity-100"
              leave-active-class="transform transition duration-300 ease-custom"
              leave-class="translate-y-0 scale-y-100 opacity-100"
              leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
            >
              <ul
                v-show="isOptionsExpanded"
                class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
              >
                <li
                  v-for="(option, index) in options"
                  :key="index"
                  class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 border-none"
                  @mousedown.prevent="setOption(option.name)"
                >
                  <router-link :to="{ name: 'CategoryFilter', params: { categoryId: option.key } }" >{{ option.name }}</router-link>
                </li>
              </ul>
            </transition>
          </div>
          <div class="xl:flex hidden gap-2 items-center w-max">
            <img src="@components/svg/flame.svg" />
            <a href="#deals" class="text-[#1b1b1b] font-bold text-sm">{{ $t('header.hot_deals') }}</a>
          </div>
        </div>
        <div class=" flex justify-center">
          <ul class="flex items-center space-x-7">
            <li>
              <router-link to="/" class="text-heading font-bold text-sm px-3 hover:text-second transition duration-300 ease-in-out">{{ $t('menu.home') }}</router-link>
            </li>
            <li class="flex items-center gap-1 relative group">
              <router-link to="/products" class="text-heading font-bold text-sm hover:text-second transition duration-300 ease-in-out">{{ $t('menu.shop') }}</router-link> 
              <img src="@components/svg/vector.svg" class="group-hover:rotate-180 transition duration-150 ease-in-out"/>
              <ul class="absolute bg-white p-3 w-52 top-6 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top shadow-lg">
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
              </ul>
            </li>
            <li><router-link to="/wishlist" class="text-heading font-bold text-sm hover:text-second transition duration-300 ease-in-out">{{ $t('menu.favorites') }}</router-link></li>
            <li><router-link to="/category/strollers" class="text-heading font-bold text-sm hover:text-second transition duration-300 ease-in-out">{{ $t('menu.strollers') }}</router-link></li>
            <li><router-link to="/category/clothes" class="text-heading font-bold text-sm hover:text-second transition duration-300 ease-in-out">{{ $t('menu.clothes') }}</router-link></li>
            <li class="flex items-center gap-1 relative group">
              <router-link to="/category/feeding" class="text-heading font-bold text-sm hover:text-second transition duration-300 ease-in-out">{{ $t('menu.feeding') }}</router-link> 
              <img src="@components/svg/vector.svg" class="group-hover:rotate-180 transition duration-150 ease-in-out"/>
              <ul class="absolute bg-white p-3 w-52 top-6 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top shadow-lg">
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">test</a></li>
              </ul>
            </li>
            <li><router-link to="/category/nursing" class="text-heading font-bold text-sm hover:text-second transition duration-300 ease-in-out">{{ $t('menu.nursing') }}</router-link></li>
          </ul>
        </div>
        <div class="flex items-center gap-3">
          <div>
            <img src="@components/svg/headset.svg" />
          </div>
          <div class="flex flex-col">
            <p class="3xl:text-[32px] text-2xl text-primary-100 font-bold">01066113440</p>
            <span class="text-gray lato text-xs ltr:tracking-[4px] font-medium">{{ $t('menu.support') }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <ui-slide-over :show="isSlideOpen" @closeSlideOver="closeSlideOver">
      <template #title>
        <router-link to="/" class="flex justify-start items-center">
          <img src="@/public/assets/images/BRLogo.svg" class="xl:w-full w-4/5"/>
        </router-link>
      </template>
      <template #content>
        <ul @click="closeSlideOver" class="flex flex-col gap-4 p-2">
          <!-- Home -->
          <li class="border-b border-[#E5E5E5] pb-3"><router-link to="/" class="text-heading font-bold block py-1">{{ $t('menu.home') }}</router-link></li>
          <!-- Shop with submenu -->
          <li class="relative group border-b border-[#E5E5E5] pb-3">
            <router-link to="/products" class="text-heading font-bold block py-1">{{ $t('menu.shop') }}</router-link> 
          </li>

          <!-- Favorites with submenu -->
          <li class="relative group border-b border-[#E5E5E5] pb-3">
            <router-link to="#" class="text-heading font-bold block py-1">{{ $t('menu.favorites') }}</router-link> 
          </li>

          <!-- Additional Menu Items -->
          <li  class="border-b border-[#E5E5E5] pb-3"><a href="#" class="text-heading font-bold block py-1">{{ $t('menu.strollers') }}</a></li>
          <li  class="border-b border-[#E5E5E5] pb-3"><a href="#" class="text-heading font-bold block py-1">{{ $t('menu.clothes') }}</a></li>

          <!-- Feeding with submenu -->
          <li class="relative group border-b border-[#E5E5E5] pb-3">
            <router-link to="#" class="text-heading font-bold block py-1">{{ $t('menu.feeding') }}</router-link>             
          </li>
          <!-- Nursing -->
          <li  class="border-b border-[#E5E5E5] pb-3"><a href="#" class="text-heading font-bold block py-1">{{ $t('menu.nursing') }}</a></li>
          <li class="border-b border-[#E5E5E5] pb-3">
             <!-- language -->
          <div class=" block py-1 relative ">
              <div @click="appStore.setLanguage($i18n, 'en')" class="flex flex-row items-center gap-2 cursor-pointer"
                  v-if="appStore.language == 'ar'">
                  <p class="text-heading font-bold">English</p>
              </div>
              <div @click="appStore.setLanguage($i18n, 'ar')" v-if="appStore.language == 'en'"
                  class="flex flex-row-reverse items-center gap-2 cursor-pointer -mt-2">
                  <p class="text-heading font-bold">العربية</p>
              </div>
          </div>
          </li>
        </ul>
      </template>
    </ui-slide-over>
    <!-- Cart Slide -->
    <ui-slide-over :show="showSlideOver" @closeSlideOver="closeSlideOver" :actions="true">
    <!-- Slide Over Title -->
      <template #title>
        {{ $t('header.cart') }}
      </template>

    <!-- Slide Over Content -->
      <template #content>
        <!-- Empty -->
        <div  v-if="cartItems.length === 0" class="flex flex-col gap-4 justify-center items-center pt-8" @click="closeSlideOver">
          <!-- <img src="@/public/assets/images/cart_empty.png" alt="Cart is Empty" /> -->
          <dotlottie-player src="https://lottie.host/52fdba64-5dd8-429a-8255-61e85e5ac683/RgiNROfEUt.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="-1" playMode="normal" loop autoplay></dotlottie-player>
          <p class="text-center text-heading font-bold text-xl">{{ $t('menu.cart_empty') }}</p>
        </div>

        <div v-else class="flex flex-col gap-4" @click="closeSlideOver">
          <div v-for="(item, index) in cartItems" :key="item.id" class="flex justify-between items-center border-b border-second border-opacity-50 pb-1">
            <router-link :to="{ name: 'product_details', params: { id: item.id } }" class="flex gap-4">
              <img :src="item.image" alt="Product Image" class="w-16 h-16" />
              <div class="cursor-pointer">
                <p class="font-bold">{{ item.name }}</p>
                <p>{{ item.quantity }} x {{ item.price }}</p>
              </div>
            </router-link>
            <button @click.stop="removeItem(item.id)"  class="text-red-500">
              <font-awesome-icon :icon="['far', 'circle-xmark']" />
            </button>
          </div>
        </div>
      </template>

    <!-- Slide Over Footer -->
      <template #footer>
        <router-link to="/cart" @click="closeSlideOver" class="bg-second text-white w-full h-[50px] flex justify-center items-center">
          {{ $t('menu.shopping_cart') }}
        </router-link>
      </template>
    </ui-slide-over>
    <!-- Wishlist Slide -->
    <ui-slide-over :show="showWishlistSlideOver" @closeSlideOver="closeSlideOver" :actions="true">
      <!-- Slide Over Title -->
      <template #title>
        {{ $t('header.wishlist') }}
      </template>

      <!-- Slide Over Content -->
      <template #content>
        <!-- Empty Wishlist -->
        <div v-if="wishlistItems.length === 0" class="flex flex-col gap-4 justify-center items-center pt-8" @click="closeWishlistSlideOver">
          <dotlottie-player 
            src="https://lottie.host/52fdba64-5dd8-429a-8255-61e85e5ac683/RgiNROfEUt.json" 
            background="transparent" 
            speed="1" 
            style="width: 300px; height: 300px" 
            direction="-1" 
            playMode="normal" 
            loop 
            autoplay>
          </dotlottie-player>

          <p class="text-center text-heading font-bold text-xl">{{ $t('menu.wishlist_empty') }}</p>
        </div>

        <!-- Wishlist Items -->
        <div v-else class="flex flex-col gap-4" @click="closeWishlistSlideOver">
          <div v-for="(item, index) in wishlistItems" :key="item.id" class="flex justify-between items-center border-b border-second border-opacity-50 pb-1">
            <router-link :to="{ name: 'product_details', params: { id: item.id } }" class="flex gap-4">
              <img :src="item.image" alt="Product Image" class="w-16 h-16" />
              <div class="cursor-pointer">
                <p class="font-bold">{{ item.name }}</p>
                <p>{{ item.price }}</p>
              </div>
            </router-link>
            <button @click="removeFromWishlist(item.id)" class="text-red-500">
              <font-awesome-icon :icon="['far', 'circle-xmark']" />
            </button>
          </div>
        </div>
      </template>

      <!-- Slide Over Footer -->
      <template #footer>
        <router-link to="/wishlist" @click="closeWishlistSlideOver" class="bg-second text-white w-full h-[50px] flex justify-center items-center">
          {{ $t('menu.your_wishlist') }}
        </router-link>
      </template>
    </ui-slide-over>

  </div>
</template>

<script>
import { mapStores, mapActions } from "pinia";
import { useAppStore } from "@/stores/app/index.js";
import { useCartStore } from '@/stores/products/cart.js';
import { useWishlistStore } from '@/stores/products/wishlist.js';
import { useToast } from 'vue-toastification';

export default {
  components:{
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: null,
      categories: this.initializeCategories(),
      isOptionsExpanded: false,
      selectedOption: this.$t('header.browse'),
      options: this.initializeCategories(),
      isSlideOpen: false,
      showSlideOver: false,
      showWishlistSlideOver: false,
      cartItems: [],
      wishlistItems: [],
      isCartEmpty: true,
      isWishlistEmpty: true,

    };
  },
  methods: {
    handleSearch() {
      if (this.selectedCategory && this.searchQuery) {
        console.log(`Searching for ${this.searchQuery} in category ${this.selectedCategory}`);
      } else {
        alert('Please select a category and enter a search term.');
      }
    },
    setOption(option) {
      this.selectedOption = option;
      this.isOptionsExpanded = false;
    },
    initializeCategories() {
      return [
        {
          key: 'strollers',
          name: this.$t('categories.strollers.name'),
        },
        {
          key: 'dress',
          name: this.$t('categories.dress.name'),
        },
        {
          key: 'bedding',
          name: this.$t('categories.bedding.name'),
          
        },
        {
          key: 'footwear',
          name: this.$t('categories.footwear.name'),
        },
        {
          key: 'safety',
          name: this.$t('categories.safety.name'),
        },
        {
          key: 'toys',
          name: this.$t('categories.toys.name'),
        },
        {
          key: 'feeding',
          name: this.$t('categories.feeding.name'),
        },
        {
          key: 'bathing',
          name: this.$t('categories.bathing.name'),
        },
        {
          key: 'maternity',
          name: this.$t('categories.maternity.name'),
        },
        {
          key: 'clothes',
          name: this.$t('categories.clothes.name'),
        }
      ];
    },
    updateCategories() {
      this.categories = this.initializeCategories();
    },
    toggleSlideOver() {
      this.isSlideOpen = !this.isSlideOpen;
    },
    add_to_cart() {
      this.showSlideOver = !this.showSlideOver;
    },
    removeItem(productId) {
      const cartStore = useCartStore();
      cartStore.removeFromCart(productId);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(this.$t('toast_success_remove_cart'),  {
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
    closeSlideOver() {
      this.isSlideOpen = false;
      this.showSlideOver = false;
      this.showWishlistSlideOver = false; 
    },
    add_to_wishlist() {
      this.showWishlistSlideOver = !this.showWishlistSlideOver;
      
    },
    removeFromWishlist(productId) {
      const wishlistStore = useWishlistStore();
      const toast = useToast();
      wishlistStore.removeFromWishlist(productId);
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
    ...mapActions(useAppStore, ['setTheme', 'setLanguage']),

  },
  computed: {
    ...mapStores(useAppStore),
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cartItems;
    },
    isCartEmpty() {
      const cartStore = useCartStore();
      return cartStore.isCartEmpty;
    },
    totalItems() {
      const cartStore = useCartStore();
      return cartStore.totalItems;
    },
    wishlistItems(){
      const wishlistStore = useWishlistStore();
      return wishlistStore.wishlistItems;
    },
    totalWishlistItems() {
      const wishlistStore = useWishlistStore();
      return wishlistStore.totalWishlistItems;
    },
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateCategories(); 
    },
  },
};

</script>
<style>
.vs__dropdown-toggle{
  border: none;
  padding: 0 15px;
}
.vs__actions{
  gap: 3px;
}
.vs__search{
  font-weight: bold;
  color: #253D4E;
  font-size: 14px;
}
input {

  box-sizing: border-box;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}

input:focus {
  border: 3px solid #F4A8AF;
}
.ease-custom {
  transition-timing-function: cubic-bezier(.61,-0.53,.43,1.43);
}
</style>