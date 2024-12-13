<template>
  <div>
    <h1 class="text-center text-2xl font-bold my-4 text-heading">{{ $t('compare.title') }}</h1>
    <div v-if="compareList.length === 0" class="flex flex-col justify-center items-center">
      <dotlottie-player src="https://lottie.host/8203883a-6493-47da-9224-6bac4110e283/aqF6sxhifV.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
      <p>{{ $t('compare.empty') }}</p>
      <router-link to="/products" class="text-primary-100 font-bold">{{ $t('compare.back') }}</router-link>
    </div>
    <div v-else class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 pt-12">
      <button @click="clearAll" class="btn-secondary mt-4">{{ $t('compare.clear') }}</button>
      <div class="grid md:grid-cols-2 grid-cols-1 mt-4">
        <div v-for="product in compareList" :key="product.id" class="border border-gray border-opacity-10 p-4 m-2 rounded shadow-md flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-2xl">{{ product.name }}</h2>
            <button @click="removeFromCompare(product)" class="mt-2 text-second"><font-awesome-icon :icon="['far', 'trash-can']" /></button>
          </div>
          <router-link :to="{ name: 'product_details', params: { id: product.id } }"  class="flex flex-col gap-4">
            <div class="md:self-start self-center">
              <img :src="product.image" alt="Product Image" class="md:w-32 md:h-32 w-full h-full object-cover mb-2"/>
            </div>
            <p class="text-gray text-lg font-bold">{{ $t('wishlist.price') }}: <span class="text-primary-100 font-bold">{{ product.price }}</span></p>
            <p class="text-gray text-lg font-bold">{{ $t('product_details.description') }}: <span class="font-medium">{{ product.description }}</span></p>
          </router-link>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCompareStore } from '@stores/products/compare'; 
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      compareStore: useCompareStore(),
    };
  },
  computed: {
    compareList() {
      return this.compareStore.compareList;
    }
  },
  methods: {
    removeFromCompare(product) {
      this.compareStore.removeFromCompare(product);
      const toast = useToast();
      const toastPosition = this.$i18n.locale === 'ar' ? 'bottom-left' : 'bottom-right';
        toast.error(product.name + this.$t('toast_success_remove_to_compare'),  {
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
    clearAll() {
      this.compareStore.clearAll();
    }
  },
};
</script>
