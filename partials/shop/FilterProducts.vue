<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
    <!-- Mobile Filter -->
    <div class="flex gap-4 items-center py-8" @click="showFilter = true">
      <font-awesome-icon :icon="['fas', 'filter']" class="text-[#B6B6B6]"/>
      <p class="font-bold text-lg text-primary-100">{{ $t('shop.filter') }}</p> 
    </div>

    <div class="xl:grid hidden md:grid-cols-4 gap-6">
      <!-- Category -->
      <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
        <h3 class="text-2xl font-bold pb-5">{{ $t('shop.category') }}</h3>
        <ul class="flex flex-col gap-2">
          <li v-for="(category, index) in categories" :key="index" class="flex items-center gap-2">
            <input type="checkbox" :id="category.slug" v-model="selectedCategories" :value="category.slug" class="custom-checkbox" @change="applyFilters" />
            <label :for="category.slug" :class="{ 'text-selected': selectedCategories.includes(category.slug), 'text-default': !selectedCategories.includes(category.slug) }">
              {{ $t(`filter_categories.${category.slug}`) }}
            </label>
          </li>
        </ul>
      </div>
      <!-- Brands -->
      <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
        <h3 class="text-2xl font-bold pb-5">{{ $t('shop.brand') }}</h3>
        <ul class="flex flex-col gap-2">
          <li v-for="(brand, index) in brands" :key="index" class="flex items-center gap-2">
            <input type="checkbox" :id="brand.slug" v-model="selectedBrands" :value="brand.slug" class="custom-checkbox" @change="applyFilters" />
            <label :for="brand.slug" :class="{ 'text-selected': selectedBrands.includes(brand.slug), 'text-default': !selectedBrands.includes(brand.slug) }">
              {{ $t(`filter_brands.${brand.slug}`) }}
            </label>
          </li>
        </ul>
      </div>
      <!-- Tags -->
      <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
        <h3 class="text-2xl font-bold pb-5">{{ $t('shop.tags') }}</h3>
        <ul class="flex flex-wrap gap-2">
          <li v-for="(tag, index) in tags" :key="index" class="flex items-center gap-2">
            <span
              @click="toggleTag(tag.slug)"
              :class="{
                'text-heading': selectedTags.includes(tag.slug),
                'text-primary-100': !selectedTags.includes(tag.slug),
              }"
              class="cursor-pointer px-4 py-2 rounded-full border border-[#E5E5E5] text-lg font-bold"
            >
              {{ $t(`tags.${tag.slug}`) }}
            </span>
          </li>
        </ul>
      </div>
      <!-- Price -->
      <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
        <h3 class="text-2xl font-bold pb-5">{{ $t('shop.price') }}</h3>
        <input type="range" min="16" max="173" v-model="priceRange" class="w-full" />
        <div class="price-range-label">{{ minValue }} - {{ maxValue }}</div>
      </div>
    </div>
    <ui-slide-over :show="showFilter" @closeSlideOver="showFilter = false">
      <template #title>
        {{ $t('shop.filter') }}
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <!-- Category -->
          <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
            <h3 class="text-2xl font-bold pb-5">{{ $t('shop.category') }}</h3>
            <ul class="flex flex-col gap-2">
              <li v-for="(category, index) in categories" :key="index" class="flex items-center gap-2">
                <input type="checkbox" :id="category.slug" v-model="selectedCategories" :value="category.slug" class="custom-checkbox" @change="applyFilters" />
                <label :for="category.slug" :class="{ 'text-selected': selectedCategories.includes(category.slug), 'text-default': !selectedCategories.includes(category.slug) }">
                  {{ $t(`filter_categories.${category.slug}`) }}
                </label>
              </li>
            </ul>
          </div>
          <!-- Brands -->
          <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
            <h3 class="text-2xl font-bold pb-5">{{ $t('shop.brand') }}</h3>
            <ul class="flex flex-col gap-2">
              <li v-for="(brand, index) in brands" :key="index" class="flex items-center gap-2">
                <input type="checkbox" :id="brand.slug" v-model="selectedBrands" :value="brand.slug" class="custom-checkbox" @change="applyFilters" />
                <label :for="brand.slug" :class="{ 'text-selected': selectedBrands.includes(brand.slug), 'text-default': !selectedBrands.includes(brand.slug) }">
                  {{ $t(`filter_brands.${brand.slug}`) }}
                </label>
              </li>
            </ul>
          </div>
          <!-- Tags -->
          <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
            <h3 class="text-2xl font-bold pb-5">{{ $t('shop.tags') }}</h3>
            <ul class="flex flex-wrap gap-2">
              <li v-for="(tag, index) in tags" :key="index" class="flex items-center gap-2">
                <span
                  @click="toggleTag(tag.slug)"
                  :class="{
                    'text-heading': selectedTags.includes(tag.slug),
                    'text-primary-100': !selectedTags.includes(tag.slug),
                  }"
                  class="cursor-pointer px-4 py-2 rounded-full border border-[#E5E5E5] text-lg font-bold"
                >
                  {{ $t(`tags.${tag.slug}`) }}
                </span>
              </li>
            </ul>
          </div>
          <!-- Price -->
          <div class="border border-[#E5E5E5] rounded-3xl p-10 shadow-md">
            <h3 class="text-2xl font-bold pb-5">{{ $t('shop.price') }}</h3>
            <input type="range" min="16" max="173" v-model="priceRange" class="w-full" />
            <div class="price-range-label">{{ minValue }} - {{ maxValue }}</div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button @click="applyFilters" class="btn-primary">{{ $t('apply') }}</button>
      </template>
    </ui-slide-over>
  </div>
</template>

<script>
import { useProductsStore } from '@/stores/products/index.js';

export default {
  data() {
    return {
      categories: [
        { slug: "strollers" },
        { slug: "dress" },
        { slug: "toys" },
        { slug: "clothing" },
        { slug: "bedding" },
        { slug: "footwear" },
        { slug: "safety" },
      ],
      selectedCategories: [],
      brands: [
        { slug: "test1" },
        { slug: "test2" },
        { slug: "test3" },
        { slug: "test4" },
      ],
      selectedBrands: [],
      tags: [
        { slug: "tag1" },
        { slug: "tag2" },
        { slug: "tag3" },
        { slug: "tag4" },
      ],
      selectedTags: [],
      minValue: 16,
      maxValue: 200,
      priceRange: { min: 16, max: 200 },
      showFilter: false,
    };
  },
  computed: {
    productsStore() {
      return useProductsStore();
    },
    minPrice() {
    return Math.min(...this.productsStore.products.map(product => product.price));
  },
  maxPrice() {
    return Math.max(...this.productsStore.products.map(product => product.price));
  },
  priceRangeLabel() {
    return `${this.priceRange.min} - ${this.priceRange.max}`;
  }
  },
  methods: {
    toggleTag(tagSlug) {
      const index = this.selectedTags.indexOf(tagSlug);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tagSlug);
      }
    },
    applyFilters() {
      this.$emit('update-filters', this.selectedCategories, this.selectedBrands, this.selectedTags);
    },
  },
};
</script>

<style scoped>
.text-selected {
  color: #FF6347;
}
.text-default {
  color: #000;
}
input[type='range'] {
  overflow: hidden;
  -webkit-appearance: none;
  background-color: #F2F3F4;
  border-radius: 5px;
}

input[type='range']::-webkit-slider-runnable-track {
  height: 10px;
  width: 100%;
  -webkit-appearance: none;
  color: #13bba4;
  margin-top: -1px;
}

input[type='range']::-webkit-slider-thumb {
  width: 10px;
  -webkit-appearance: none;
  height: 10px;
  cursor: ew-resize;
  background: #B5DBD8;
  box-shadow: -80px 0 0 80px #B5DBD8;
}
input[type="range"]::-moz-range-track {  
  background-color: #F2F3F4;
}

</style>
