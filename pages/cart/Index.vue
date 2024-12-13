<template>
  <div>
    <!-- Breadcrumb -->
    <div class="bg-[#F5F5F5] py-6">
      <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.home') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <router-link to="/" class="lato text-lg text-gray">{{ $t('menu.shop') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <p class="lato text-lg text-primary-100">{{ $t('menu.your_cart') }}</p>
      </div>
    </div>
    <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 pt-12">
      <!-- Empty Cart -->
      <div v-if="cartItems.length === 0" class="flex flex-col gap-4 justify-center items-center pt-8 xl:col-span-2">
        <!-- <img src="@assets/images/cart_empty.png" alt="Cart is Empty" class="w-1/2"/> -->
        <dotlottie-player src="https://lottie.host/52fdba64-5dd8-429a-8255-61e85e5ac683/RgiNROfEUt.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
        <p class="text-center text-heading font-bold text-xl">{{ $t('menu.cart_empty') }}</p>
      </div>
      <div v-else class="grid xl:grid-cols-3 grid-cols-1 gap-7 ">
        <!-- Products table -->
        <div class="col-span-2 xl:block hidden">
          <div class="flex justify-between">
            <div class="flex flex-col gap-5">
              <h2 class="font-bold text-[40px] text-heading">{{ $t('menu.your_cart') }}</h2>
              <p class="text-gray font-bold">{{ $t('menu.There_are') }} <span class="text-primary-100 font-bold">{{ totalItems }}</span> {{ $t('menu.products_in_your_cart') }}</p>
            </div>
            <div 
              class="flex items-center gap-2 text-gray self-end cursor-pointer"
              @click="clearCart"
              :class="{ 'animate': isAnimating }"
            >
              <font-awesome-icon :icon="['far', 'trash-can']" class="" />
              <p class="font-bold">{{ $t('cart.clear_cart') }}</p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 pt-12 border-b border-[#E5E5E5]">
            <div class="grid grid-cols-7 bg-[#F5F5F5] rounded-md p-3">
              <div class="font-bold col-span-3 text-center">{{ $t('cart.products') }}</div>
              <div class="font-bold text-center">{{ $t('cart.unit_price') }}</div>
              <div class="font-bold text-center">{{ $t('cart.quantity') }}</div>
              <div class="font-bold text-center">{{ $t('cart.subtotal') }}</div>
              <div class="font-bold text-center">{{ $t('cart.remove') }}</div>
            </div>
            <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-7 items-center p-3">
              <div class="col-span-3 flex items-center gap-2">
                <div class="border border-[#E5E5E5] rounded-xl w-28 h-28 p-2">
                  <img :src="item.image" alt="item.name" class="w-full h-full object-cover"/>
                </div>
                <div class="font-bold text-heading">{{ item.name }}</div>
              </div>
              <div class="text-center font-bold text-[#B6B6B6] text-2xl">{{ item.price }}</div>
              <div class="relative flex items-center border-2 border-primary-100 rounded-lg">
                <input 
                  type="number" 
                  class="text-primary-100 text-center no-arrows font-bold text-xl w-9/12" 
                  v-model.number="item.quantity"
                  min="1"
                  @change="updateQuantity(item)"
                />
                <div class="flex flex-col">
                  <button @click="increase(item)" class="text-primary-100">
                    <font-awesome-icon :icon="['fas', 'angle-up']" class="text-sm" />
                  </button>
                  <button @click="decrease(item)" class="text-primary-100">
                    <font-awesome-icon :icon="['fas', 'angle-down']" class="text-sm" />
                  </button>
                </div>
              </div>
              <div class="text-center text-primary-100 font-bold text-2xl">{{ (item.price * item.quantity) }}</div>
              <div class="text-center">
                <button @click="removeItem(item.id)" class="text-[#B6B6B6] text-centers">
                  <font-awesome-icon :icon="['far', 'circle-xmark']" />
                </button>
              </div>
            </div>
          </div>
          <!-- continue shopping -->
          <div class="flex justify-between items-center pt-11">
            <router-link to="/products" class="h-[50px] px-4 text-white rounded-md bg-second flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'arrow-left-long']" class="rtl:rotate-180"/>
              {{ $t('buttons.continue_shopping') }}
            </router-link>
            <!-- update cart -->
            <button @click="updateCart" class="h-[50px] px-4 text-white rounded-md bg-primary-100 flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'rotate']" />
              {{ $t('buttons.update_cart') }}
            </button>
          </div>
        </div>
        <!-- Mobile Responsive -->
        <div class="xl:hidden border border-[#E5E5E5] rounded-2xl py-11 px-10 shadow-md">
          <div class="border-b border-[#E5E5E5] pb-6 flex justify-between items-center">
            <div>
              <h2 class="font-bold text-[28px] text-heading">{{ $t('menu.your_cart') }}</h2>
              <p class="text-gray font-bold">{{ $t('menu.There_are') }} <span class="text-primary-100 font-bold">{{ totalItems }}</span> {{ $t('menu.products_in_your_cart') }}</p>
            </div>
            <div 
              class="flex items-center gap-2 text-gray self-end cursor-pointer"
              @click="clearCart"
              :class="{ 'animate': isAnimating }"
            >
              <font-awesome-icon :icon="['far', 'trash-can']" class="" />
              <p class="font-bold">{{ $t('cart.clear_cart') }}</p>
            </div>
          </div>
          <div v-if="cartItems.length === 0" class="flex flex-col gap-4 justify-center items-center pt-8">
            <img src="@assets/images/cart_empty.png" alt="Cart is Empty" class="w-1/2"/>
            <p class="text-center text-heading font-bold text-xl">{{ $t('menu.cart_empty') }}</p>
          </div>
          <div v-for="item in cartItems" :key="item.id" class="flex flex-col xl:flex-row gap-4 justify-between items-center border-b border-[#E5E5E5] py-4">
            <div class="flex justify-between items-center gap-2 w-full">
              <div class="flex items-center gap-2">
                <div class="border border-[#E5E5E5] rounded-xl w-16 h-16 p-1">
                  <img :src="item.image" alt="item.name" class="w-full h-full object-cover"/>
                </div>
                <div class="font-bold text-heading">{{ item.name }}</div>
              </div>
              <button @click="removeItem(item.id)" class="text-[#B6B6B6]">
                <font-awesome-icon :icon="['far', 'circle-xmark']" />
              </button>
            </div>
            <div class="flex items-center justify-between w-full">
              <div class="text-center text-primary-100 font-bold">{{ (item.price * item.quantity) }}</div>
              <div class="relative flex items-center border-2 border-primary-100 rounded-lg">
                <input 
                  type="number" 
                  class="text-primary-100 text-center no-arrows font-bold text-xl w-9/12" 
                  v-model.number="item.quantity"
                  min="1"
                  @change="updateQuantity(item)"
                />
                <div class="flex flex-col">
                  <button @click="increase(item)" class="text-primary-100">
                    <font-awesome-icon :icon="['fas', 'angle-up']" class="text-sm" />
                  </button>
                  <button @click="decrease(item)" class="text-primary-100">
                    <font-awesome-icon :icon="['fas', 'angle-down']" class="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex xl:flex-row flex-col gap-6 justify-between items-center pt-6">
            <router-link to="/products" class="h-[50px] px-4 text-white rounded-md bg-second flex items-center gap-2 w-full justify-center">
              <font-awesome-icon :icon="['fas', 'arrow-left-long']" class="rtl:rotate-180"/>
              {{ $t('buttons.continue_shopping') }}
            </router-link>
            <button @click="updateCart" class="h-[50px] px-4 text-white rounded-md bg-primary-100 flex items-center gap-2 w-full justify-center">
              <font-awesome-icon :icon="['fas', 'rotate']" />
              {{ $t('buttons.update_cart') }}
            </button>
          </div>
        </div>

        <!-- Proceed to Checkout -->
        <div class="border border-[#E5E5E5] rounded-2xl py-11 px-10 h-max xl:mt-[154px] shadow-md">
          <ul class="flex flex-col gap-8 pb-8">
            <li class="flex justify-between items-center pb-4 border-b border-b-[#E5E5E5]">
              <p class="font-bold text-[#B6B6B6]">{{ $t('cart.subtotal') }}</p>
              <span class="font-bold text-primary-100">{{ total }}</span>
            </li>
            <div class="flex flex-col gap-2 pb-4 border-b border-b-[#E5E5E5]">
              <li class="flex justify-between items-center">
                <p class="font-bold text-[#B6B6B6]">{{ $t('cart.shipping') }}</p>
                <span class="font-bold text-heading">{{ $t('cart.free_shipping') }}</span>
              </li>
              <li class="flex justify-between items-center">
                <p class="font-bold text-[#B6B6B6]">{{ $t('cart.estimate_for') }}</p>
                <span class="font-bold text-heading">{{ $t('cart.CAIRO') }}</span>
              </li>
            </div>
            <li class="flex justify-between items-center">
              <p class="font-bold text-[#B6B6B6]">{{ $t('cart.total') }}</p>
              <span class="font-bold text-primary-100">{{ total }}</span>
            </li>
          </ul>
          <router-link to="/check_out" class="w-full h-[50px] bg-primary-100 text-white rounded-md font-bold flex justify-center items-center gap-2">
            {{ $t('cart.proceed_to_checkout') }} <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" class="rtl:rotate-180" />
          </router-link>
        </div>
      </div>
      <div v-if="cartItems.length > 0" class="flex justify-center pt-20">
        <div class="flex flex-col gap-2">
          <h2 class="text-heading text-2xl font-bold">{{ $t('cart.apply_coupon') }}</h2>
          <p class="text-gray pt-4 pb-8">{{ $t('cart.promo_code') }}</p>
          <div>
            <div class="relative rounded-xl border border-[#E5E5E5] h-[50px] overflow-hidden">
              <input class=" ltr:pl-[53px] rtl:pr-[53px] h-full ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg" :placeholder="$t('cart.coupon_code')"/>
              <font-awesome-icon :icon="['fas', 'tags']" class="text-[#B6B6B6] absolute ltr:left-[18px] top-4 text-lg" />
              <button class="ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg bg-primary-100 h-full text-white px-8" >{{ $t('cart.apply') }}</button>
            </div>
          </div>
        </div>
      </div>
      <LastBannerVue class="mt-16"/>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/products/cart';
import LastBannerVue from '../../partials/home/LastBanner.vue';
import { useToast } from 'vue-toastification';
export default {
  components:{
    LastBannerVue
  },
  setup() {
    const cartStore = useCartStore();

    return {
      cartStore,
    };
  },
  data() {
    return{
      cartItems: [],
      totalItems: 0,
      total: 0,
      isAnimating: false,
    }
  },
  computed: {
    cartItems() {
    return this.cartStore.cartItems;
  },
  totalItems() {
    return this.cartStore.totalItems;
  },
  subtotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  total() {
    const shipping = 0;
    return this.subtotal + shipping;
  }
  },
  methods: {
    clearCart() {
      this.cartStore.clearCart();
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(this.$t('toast_success_remove_to_cart'),  {
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
    removeItem(productId) {
      this.cartStore.removeFromCart(productId);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(this.$t('toast_success_add_to_cart'),  {
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
    updateQuantity(item) {
      item.subtotal = item.price * item.quantity;
    },
    calculateTotal() {
      this.total = this.subtotal;
      this.totalItems = this.cartItems.length;
    },
    increase(item) {
      item.quantity = Math.max(1, item.quantity + 1); // Prevent below 1
      this.updateQuantity(item);
    },
    decrease(item) {
      if (item.quantity > 1) {
        item.quantity -= 1; 
        this.updateQuantity(item);
      }
    },
    updateCart() {
      this.cartItems.forEach(item => {
        this.updateQuantity(item);
      });

    },
  },
  watch: {
    cartItems: {
      handler() {
        this.calculateTotal();
      },
      deep: true,
    }
  },
  mounted() {
    const cartStore = useCartStore();
    this.cartItems = cartStore.cartItems;
    this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

};
</script>
<style>
.animate {
  animation: scaleAnimation 0.3s ease;
}

@keyframes scaleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1); /* Scale up to 110% */
  }
  100% {
    transform: scale(1); /* Scale back to 100% */
  }
}

</style>
