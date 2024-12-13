<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
    <div class="pt-8">
      <!-- Top Banner -->
      <top-banner />
      <!-- Featured Categories -->
      <featured-categories class="pt-16" :selected="selectedProducts" @filter-changed="filterProducts" />
      <!-- Banner Section -->
      <banner-section class="pt-[75px]" />
      <!-- Popular Products Section -->
      <div class="pt-16">
        <div class="flex 2xl:flex-row flex-col justify-between mb-11">
          <h2 id="popular_products" class="3xl:text-[40px] md:text-3xl text-2xl font-bold text-heading">{{ $t('home.popular_products') }}</h2>
          <filter-category 
            :categories="categories" 
            :selected="selectedPopular" 
            @filter-changed="filterPopularProducts" 
          />
        </div>
        <div v-if="loading">Loading popular products...</div>
        <popular-products 
          v-if="!loading && filteredPopularProducts.length > 0" 
          :products="filteredPopularProducts" 
        />
        <div v-else-if="!loading" class="flex justify-center h-[400px]">
          <dotlottie-player src="https://lottie.host/161565eb-92c4-4c73-bed2-b682f78a7528/7PZXW7pLM5.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
        </div>
      </div>

      <!-- Best Sellers Section -->
      <div class="pt-16">
        <div class="flex 2xl:flex-row flex-col justify-between mb-11">
          <h2 id="best_sellers" class="3xl:text-[40px] md:text-3xl text-2xl font-bold text-heading">{{ $t('home.best_sellers') }}</h2>
          <filter-category 
            :categories="categories" 
            :selected="selectedBestSellers" 
            @filter-changed="filterBestSellers" 
          />
        </div>
        <best-sellers 
          v-if="!loading && filteredBestSellers.length > 0" 
          :products="filteredBestSellers" 
        />
        <div v-else-if="!loading">
          <p>No best sellers available.</p>
        </div>
      </div>

      <!-- Additional Sections -->
      <deals-section class="py-16" />
      <collection-section class="pt-16" />
      <last-banner class="mt-16" />
    </div>
  </div>
</template>

<script>
import TopBanner from '@partials/home/TopBanner.vue';
import FeaturedCategories from '@partials/home/FeaturedCategories.vue';
import BannerSection from '@partials/home/BannerSection.vue';
import PopularProducts from '@partials/home/PopularProducts.vue';
import FilterCategory from '@components/ui/FilterCategory/FilterCategory.vue';
import BestSellers from '@partials/home/BestSellers.vue';
import DealsSection from '@partials/home/DealsSection.vue';
import CollectionSection from '@partials/home/CollectionSection.vue';
import LastBanner from '@partials/home/LastBanner.vue';

import { mapStores } from "pinia";
import { useProductsStore } from '@stores/products/index.js';

export default {
  components: {
    "top-banner": TopBanner,
    "featured-categories": FeaturedCategories,
    "banner-section": BannerSection,
    "popular-products": PopularProducts,
    "filter-category": FilterCategory,
    "best-sellers": BestSellers,
    "deals-section": DealsSection,
    "collection-section": CollectionSection,
    "last-banner": LastBanner,
  },
  computed: {
    ...mapStores(useProductsStore),
    products() {
      return this.productsStore.products || [];
    },
    filteredPopularProducts() {
      if (this.selectedPopular === 'all') {
        return this.products;
      }
      return this.products.filter(product => product.category === this.selectedPopular);
    },
    filteredBestSellers() {
      if (this.selectedBestSellers === 'all') {
        return this.products;
      }
      return this.products.filter(product => product.category === this.selectedBestSellers);
    }
  },
  data() {
    return {
      loading: true,
      selectedPopular: 'all',
      selectedBestSellers: 'all',
      categories: [
        { key: 'strollers', name: 'Strollers' },
        { key: 'dresses', name: 'Dresses' },
        { key: 'bedding', name: 'Bedding' },
        { key: 'footwear', name: 'Footwear' },
        { key: 'safety', name: 'Safety' },
        { key: 'toys', name: 'Toys' },
        { key: 'feeding', name: 'Feeding' },
        { key: 'bathing', name: 'Bathing' },
        { key: 'maternity', name: 'Maternity' },
        { key: 'clothes', name: 'Clothes' }
      ],
    };
  },
  mounted() {
    this.fetchProducts();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const direction = document.dir || 'ltr';
          if (entry.target.id === 'popular_products') {
            if (direction === 'ltr') {
              entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
            } else if (direction === 'rtl') {
              entry.target.classList.add('animate__animated', 'animate__fadeInRight');
            }
          } else if (entry.target.id === 'best_sellers') {
            if (direction === 'ltr') {
              entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
            } else if (direction === 'rtl') {
              entry.target.classList.add('animate__animated', 'animate__fadeInRight');
            }
          }
          observer.unobserve(entry.target);
        }
      });
    });

    const elementsToAnimate = [
      document.getElementById('popular_products'),
      document.getElementById('best_sellers'), // Fixed typo here
    ];

    elementsToAnimate.forEach(element => {
      if (element) {
        observer.observe(element);
      }
    });

  },
  methods: {
    fetchProducts() {
      this.productsStore.fetchProducts(this.$i18n.locale)
        .finally(() => {
          this.loading = false; 
        });
    },
    filterProducts(categoryKey) {
      this.selectedProducts = categoryKey; 
    },
    filterPopularProducts(categoryKey) {
      this.selectedPopular = categoryKey;
    },
    filterBestSellers(categoryKey) {
      this.selectedBestSellers = categoryKey;
    },
  },
  watch: {
    '$i18n.locale': 'fetchProducts',
  },
}
</script>
