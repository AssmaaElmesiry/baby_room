<template>
  <div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
    <div>
      <h2 class="text-2xl text-heading font-bold pb-10">{{ $t('home.top_selling') }}</h2>
      <div 
        v-for="product in productsStore.products.slice(0, 3)" 
      :key="product.id">
        <div class="grid grid-cols-1 gap-2">
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
    <div>
      <h2 class="text-2xl text-heading font-bold pb-10">{{ $t('home.trending_products') }}</h2>
      <div 
        v-for="product in productsStore.products.slice(0, 3)" 
      :key="product.id">
        <div class="grid grid-cols-1 gap-2">
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
    <div>
      <h2 class="text-2xl text-heading font-bold pb-10">{{ $t('home.recently_added') }}</h2>
      <div 
        v-for="product in productsStore.products.slice(0, 3)" 
      :key="product.id">
        <div class="grid grid-cols-1 gap-2">
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
    <div>
      <h2 class="text-2xl text-heading font-bold pb-10">{{ $t('home.top_rated') }}</h2>
      <div 
        v-for="product in productsStore.products.slice(0, 3)" 
      :key="product.id">
        <div class="grid grid-cols-1 gap-2">
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
</template>
<script>
import { mapStores } from "pinia";
import { useProductsStore } from '@stores/products/index.js';

export default {
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
  }
}
</script>
<style>
.vue3-star-ratings__icon{
  padding: 0 1px !important;
}
</style>