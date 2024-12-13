<template>
  <div>
    <!-- Breadcrumb -->
    <div class="bg-[#F5F5F5] py-6">
      <div class="flex gap-2 items-center container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
        <router-link to="/" class="lato text-lg text-gray">
          {{ $t('menu.home') }}
        </router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <router-link to="/products" class="lato text-lg text-gray">{{ $t('menu.shop') }}</router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <p class="lato text-lg text-primary-100">{{ $t('shop.filter') }}</p>
      </div>
    </div>

    <!-- Filter -->
    <FilterProducts @update-filters="updateFilters" />

    <!-- Products -->
    <ProductList :filteredProducts="filteredProducts" />
    
    <!-- No Products Message -->
    <div v-if="!filteredProducts.length" class="text-center py-4">
      <p class="lato text-gray-500">{{ $t('shop.noProducts') }}</p>
    </div>
  </div>
</template>

<script>
import FilterProducts from '@partials/shop/FilterProducts.vue';
import ProductList from '@partials/shop/ProductList.vue';
import { useProductsStore } from '@stores/products/index';

export default {
  components: {
    FilterProducts,
    ProductList,
  },
  setup() {
    const productsStore = useProductsStore();
    
    const fetchProducts = async () => {
      await productsStore.fetchProducts(this.$i18n.locale); // Fetch products when the component is created
    };

    fetchProducts();

    return { productsStore };
  },
  methods: {
    updateFilters(filters) {
      this.productsStore.updateFilters(filters); // Call updateFilters method from the store
    },
  },
  computed: {
    filteredProducts() {
      return this.productsStore.filteredProducts; // Access filteredProducts from the store
    },
  },
};
</script>
