<template>
  <!-- Footer  -->
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 pt-[68px]">
    <!-- Top Footer -->
    <div class="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 pb-16 xl:gap-8 gap-12 border-b border-[#D8F1E5]">
      <div class="flex flex-col gap-10 items-start col-span-2">
        <img src="@/public/assets/images/BRLogo.svg" alt="logo" />
        <div class="flex flex-col gap-[10px]">
          <div class="flex items-start gap-2">
            <img src="@components/svg/marker.svg" />
            <p class="font-bold text-heading">{{ $t('footer.address') }}: <span class="font-medium text-heading lato"> {{ $t('footer.place') }} </span></p>
          </div>
          <div class="flex items-center gap-2">
            <img src="@components/svg/head.svg" />
            <p class="font-bold text-heading">{{ $t('footer.call_us') }} :</p>
            <a class="font-medium text-heading lato" href="tel:+201066113440">(+20) 10 6611 3440 </a>
          </div>
          <div class="flex items-center gap-2">
            <img src="@components/svg/email.svg" />
            <p class="font-bold text-heading">{{ $t('footer.email') }} :</p>
            <a class="font-medium text-heading lato" href="mailto:contact@babyroom.com">contact@babyroom.com</a>
          </div>
          <div class="flex items-center gap-2">
            <img src="@components/svg/marker.svg" />
            <p class="font-bold text-heading">{{ $t('footer.hours') }} :</p>
            <span class="font-medium text-heading lato"> 10:00 - 18:00, Mon - Sat</span>
          </div>
        </div>
      </div>
      <!-- company -->
      <div class="md:flex hidden flex-col md:col-span-1 col-span-2">
        <h4 class="text-heading font-bold text-2xl pb-7">{{ $t('footer.company') }}</h4>
        <ul class="grid md:grid-cols-1 grid-cols-2 gap-[10px] ">
          <li class="font-bold text-heading lato footer-item"><a href="/about_us">{{ $t('footer.about_us') }}</a></li>
          <li class="font-bold text-heading lato footer-item"><a href="/delivery_information">{{ $t('footer.delivery_information') }}</a></li>
          <li class="font-bold text-heading lato footer-item"><a href="/privacy_policy">{{ $t('footer.privacy_policy') }}</a></li>
          <li class="font-bold text-heading lato footer-item"><a href="/terms_conditions">{{ $t('footer.terms_conditions') }}</a></li>
          <li class="font-bold text-heading lato footer-item"><a href="/contact_us">{{ $t('footer.contact_us') }}</a></li>
          <li class="font-bold text-heading lato footer-item"><a href="/support_center">{{ $t('footer.support_center') }}</a></li>
          <li class="font-bold text-heading lato footer-item"><a href="/careers">{{ $t('footer.careers') }}</a></li>
        </ul>
      </div>
      <!-- account -->
      <div class="md:flex hidden flex-col md:col-span-1 col-span-2">
        <h4 class="text-heading font-bold text-2xl pb-7">{{ $t('footer.account') }}</h4>
        <ul class="grid md:grid-cols-1 grid-cols-2 gap-[10px]  ">
          <li  class="font-bold text-heading lato footer-item"><router-link to="/login">{{ $t('footer.sign_in') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/cart">{{ $t('footer.view_cart') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/wishlist">{{ $t('footer.my_wishlist') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/my_account">{{ $t('footer.track_my_order') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/help_ticket">{{ $t('footer.help_ticket') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/shipping_details">{{ $t('footer.shipping_details') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/compare">{{ $t('footer.compare_products') }}</router-link></li>
        </ul>
      </div>
      <!-- account -->
      <div class="md:flex hidden flex-col md:col-span-1 col-span-2">
        <h4 class="text-heading font-bold text-2xl pb-7">{{ $t('footer.account') }}</h4>
        <ul class="grid md:grid-cols-1 grid-cols-2 gap-[10px] ">
          <li  class="font-bold text-heading lato footer-item"><router-link to="/login">{{ $t('footer.sign_in') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/cart">{{ $t('footer.view_cart') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/wishlist">{{ $t('footer.my_wishlist') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/my_account">{{ $t('footer.track_my_order') }}</router-link></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/help_ticket">{{ $t('footer.help_ticket') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/shipping_details">{{ $t('footer.shipping_details') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><router-link to="/compare">{{ $t('footer.compare_products') }}</router-link></li>
        </ul>
      </div>
      <!-- information -->
      <div class="md:flex hidden flex-col md:col-span-1 col-span-2">
        <h4 class="text-heading font-bold text-2xl pb-7">{{ $t('footer.information') }}</h4>
        <ul class="grid md:grid-cols-1 grid-cols-2 gap-[10px]  ">
          <li  class="font-bold text-heading lato footer-item"><a href="/search_terms">{{ $t('footer.search_terms') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/advanced_search">{{ $t('footer.advanced_search') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/help_faqs">{{ $t('footer.help_faqs') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/store_location">{{ $t('footer.store_location') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/orders_returns">{{ $t('footer.orders_returns') }}</a></li>
          <li  class="font-bold text-heading lato footer-item"><a href="/feedback_for_us">{{ $t('footer.feedback_for_us') }}</a></li>
        </ul>
      </div>
      <!-- app_payment -->
      <div class="md:flex hidden flex-col xl:items-start items-center col-span-2">
        <h4 class="text-heading font-bold text-2xl pb-7">{{ $t('footer.app_payment') }}</h4>
        <div class="flex flex-col gap-5">
          <p class="lato text-sm text-gray">{{ $t('footer.install_babyroom_app') }}</p>
          <div class="flex gap-6">
            <img src="@/public/assets/images/app_store.svg"/>
            <img src="@/public/assets/images/google_play.svg"/>
          </div>
          <p class="lato text-sm text-gray">{{ $t('footer.secured_payment_gateways') }}</p>
          <img src="@/public/assets/images/payment_method.svg" />
        </div>
      </div>
      <!-- Mobile Footer -->
      <div class="md:hidden flex flex-col gap-3 col-span-2">
        <!-- company collapse -->
        <div class="flex flex-col">
          <div class="flex justify-between items-center pb-5" @click="toggleCompany">
            <h4 class="text-heading font-bold text-2xl">{{ $t('footer.company') }}</h4>
            <font-awesome-icon :icon="['fas', 'angle-down']" :class="{ 'rotate': isCompany }" />
          </div>
          <transition name="slide">
            <ul v-if="isCompany" class="grid md:grid-cols-1 grid-cols-2 gap-[10px]">
              <li class="font-bold text-heading lato footer-item"><a href="/about_us">{{ $t('footer.about_us') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/delivery_information">{{ $t('footer.delivery_information') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/privacy_policy">{{ $t('footer.privacy_policy') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/terms_conditions">{{ $t('footer.terms_conditions') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/contact_us">{{ $t('footer.contact_us') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/support_center">{{ $t('footer.support_center') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/careers">{{ $t('footer.careers') }}</a></li>
            </ul>
          </transition>
        </div>

        <!-- account -->
        <div class="flex flex-col">
          <div class="flex justify-between items-center pb-5" @click="toggleAccount">
            <h4 class="text-heading font-bold text-2xl">{{ $t('footer.account') }}</h4>
            <font-awesome-icon :icon="['fas', 'angle-down']" :class="{ 'rotate': isAccount }" />
          </div>
          <transition name="slide" >
            <ul v-if="isAccount" class="grid md:grid-cols-1 grid-cols-2 gap-[10px]">
              <li class="font-bold text-heading lato footer-item"><router-link to="/login">{{ $t('footer.sign_in') }}</router-link></li>
              <li class="font-bold text-heading lato footer-item"><router-link to="/cart">{{ $t('footer.view_cart') }}</router-link></li>
              <li class="font-bold text-heading lato footer-item"><router-link to="/wishlist">{{ $t('footer.my_wishlist') }}</router-link></li>
              <li class="font-bold text-heading lato footer-item"><router-link to="/my_account">{{ $t('footer.track_my_order') }}</router-link></li>
              <li class="font-bold text-heading lato footer-item"><a href="/help_ticket">{{ $t('footer.help_ticket') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/shipping_details">{{ $t('footer.shipping_details') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><router-link to="/compare">{{ $t('footer.compare_products') }}</router-link></li>
            </ul>
          </transition>
        </div>

        <!-- information -->
        <div class="flex flex-col" >
          <div class="flex justify-between items-center pb-5" @click="toggleInformation">
            <h4 class="text-heading font-bold text-2xl">{{ $t('footer.information') }}</h4>
            <font-awesome-icon :icon="['fas', 'angle-down']" :class="{ 'rotate': isInformation }" />
          </div>
          <transition name="slide">
            <ul v-if="isInformation" class="grid md:grid-cols-1 grid-cols-2 gap-[10px]">
              <li class="font-bold text-heading lato footer-item"><a href="/search_terms">{{ $t('footer.search_terms') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/advanced_search">{{ $t('footer.advanced_search') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/help_faqs">{{ $t('footer.help_faqs') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/store_location">{{ $t('footer.store_location') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/orders_returns">{{ $t('footer.orders_returns') }}</a></li>
              <li class="font-bold text-heading lato footer-item"><a href="/feedback_for_us">{{ $t('footer.feedback_for_us') }}</a></li>
            </ul>
          </transition>
        </div>

        <!-- app_payment -->
        <div class="flex flex-col" >
          <div class="flex justify-between items-center pb-5" @click="togglePayment">
            <h4 class="text-heading font-bold text-2xl">{{ $t('footer.app_payment') }}</h4>
            <font-awesome-icon :icon="['fas', 'angle-down']" :class="{ 'rotate': isPayment }" />
          </div>
          <transition name="slide">
            <div v-if="isPayment" class="flex flex-col gap-5">
              <p class="lato text-sm text-gray">{{ $t('footer.install_babyroom_app') }}</p>
              <div class="flex gap-6">
                <img src="@/public/assets/images/app_store.svg" />
                <img src="@/public/assets/images/google_play.svg" />
              </div>
              <p class="lato text-sm text-gray">{{ $t('footer.secured_payment_gateways') }}</p>
              <img src="@/public/assets/images/payment_method.svg" />
            </div>
          </transition>
        </div>
      </div>   
    </div> 
  <!-- Bottom Footer -->
    <div class="flex justify-center items-center py-8">
      <p class="lato text-heading">{{ $t('footer.designed_by') }}<span class="lato text-primary-100 px-1">DOKKAN AGENCY</span> . {{ $t('footer.rights') }}</p>
    </div>
  </div>
</template>
<script>
export default{
 data(){
  return{
    isCompany : false,
    isAccount : false,
    isInformation : false,
    isPayment : false,
  }
 },
 methods:{
  toggleCompany() {
    this.isCompany = !this.isCompany;
  },
  toggleAccount() {
    this.isAccount = !this.isAccount;
  },
  toggleInformation() {
    this.isInformation = !this.isInformation;
  },
  togglePayment() {
    this.isPayment = !this.isPayment;
  },
 }
}
</script>

<style>
.footer-item {
  transition: all 0.3s ease;
}

.footer-item:hover {
  color: #B5DBD8;
  transform: translateX(5px);
}
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to {
  max-height: 200px;
  opacity: 1;
}

.rotate {
  transition: transform 0.3s ease;
}

.rotate-active {
  transform: rotate(180deg);
}

</style>