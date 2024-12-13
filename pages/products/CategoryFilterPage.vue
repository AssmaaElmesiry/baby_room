<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10">
    <div class="bg-[#FD6E6E] bg-opacity-20 rounded-[20px] py-16 mt-8 mb-20 px-14 flex flex-col gap-2">
      <div class="flex xl:flex-row flex-col gap-4 justify-between items-center">
        <h2 class="text-heading text-5xl font-bold">{{ categoryName }}</h2>
        <div class="flex xl:flex-row flex-col gap-3 items-center" v-if="selectedSubcategories.length">
          <div 
            v-for="(subcategory, index) in selectedSubcategories" 
            :key="index"
            class="bg-white border border-[#F2F3F4] rounded-full py-4 px-5 flex items-center gap-1 cursor-pointer xl:w-auto w-full"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-[#B6B6B6]"/>
            <p class="xl:text-lg font-bold text-primary-100">{{ subcategory.name }}</p>
          </div>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <router-link to="/" class="lato text-lg text-gray">
          {{ $t('menu.home') }}
        </router-link>
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[#B6B6B6] text-sm rtl:rotate-180" />
        <router-link to="/products" class="lato text-lg text-gray">{{ $t('menu.shop') }}</router-link>
      </div>
    </div>
  </div>
  <!-- Products -->
  <ProductList :filteredProducts="filteredProducts" />

</template>
<script>
import ProductList from '@partials/shop/ProductList.vue';
import { useProductsStore } from '@stores/products/index';

export default {
  props: {
    categoryId: {
      type: String,
      required: true,
    },
  },
  components:{
    ProductList
  },
  data() {
    return {
      categoryName: '',
      selectedSubcategories: [],
    };
  },
  created() {
    this.fetchCategoryDetails();
  },
  computed:{
    productsStore() {
      return useProductsStore();
    },
    filteredProducts() {
      return this.productsStore.filteredProducts;
    }
  },
  methods: {
    fetchCategoryDetails() {
      const categories = this.getCategories();
      const category = categories.find(cat => cat.key === this.categoryId);
      if (category) {
        this.categoryName = category.name;
        this.selectedSubcategories = Object.values(category.subcategories);
        this.productsStore.updateFilters([this.categoryId], [], []);
      } else {
        this.categoryName = this.$t('categories.not_found');
      }
    },
    getCategories() {
      return [
        { 
          key: 'strollers', 
          name: this.$t('categories.strollers.name'),
          subcategories: {
            lightweight: {
              name: this.$t('categories.strollers.subcategories.lightweight'),
            },
            double: {
              name: this.$t('categories.strollers.subcategories.double'),
            },
          },
        },
        { 
          key: 'dress', 
          name: this.$t('categories.dress.name'),
          subcategories: {
            casual: {
              name: this.$t('categories.dress.subcategories.casual'),
            },
            formal: {
              name: this.$t('categories.dress.subcategories.formal'),
            },
          },
        },
        { 
          key: 'toys', 
          name: this.$t('categories.toys.name'),
          subcategories: {
            educational: {
              name: this.$t('categories.toys.subcategories.educational'),
            },
            stuffed: {
              name: this.$t('categories.toys.subcategories.stuffed'),
            },
          },
        },
        { 
          key: 'clothes', 
          name: this.$t('categories.clothes.name'),
          subcategories: {
            infant: {
              name: this.$t('categories.clothes.subcategories.infant'),
            },
            toddler: {
              name: this.$t('categories.clothes.subcategories.toddler'),
            },
          },
        },
        { 
          key: 'maternity', 
          name: this.$t('categories.maternity.name'),
          subcategories: {
            clothing: {
              name: this.$t('categories.maternity.subcategories.clothing'),
            },
            nursing: {
              name: this.$t('categories.maternity.subcategories.nursing'),
            },
          },
        },
        { 
          key: 'bathing', 
          name: this.$t('categories.bathing.name'),
          subcategories: {
            tubs: {
              name: this.$t('categories.bathing.subcategories.tubs'),
            },
            bathToys: {
              name: this.$t('categories.bathing.subcategories.bathToys'),
            },
          },
        },
        { 
          key: 'safety', 
          name: this.$t('categories.safety.name'),
          subcategories: {
            carSeats: {
              name: this.$t('categories.safety.subcategories.carSeats'),
            },
            monitors: {
              name: this.$t('categories.safety.subcategories.monitors'),
            },
          },
        },
        { 
          key: 'feeding', 
          name: this.$t('categories.feeding.name'),
          subcategories: {
            bottles: {
              name: this.$t('categories.feeding.subcategories.bottles'),
            },
            highChairs: {
              name: this.$t('categories.feeding.subcategories.highChairs'),
            },
          },
        },
        { 
          key: 'footwear', 
          name: this.$t('categories.footwear.name'),
          subcategories: {
            sneakers: {
              name: this.$t('categories.footwear.subcategories.sneakers'),
            },
            boots: {
              name: this.$t('categories.footwear.subcategories.boots'),
            },
          },
        },
        { 
          key: 'bedding', 
          name: this.$t('categories.bedding.name'),
          subcategories: {
            sheets: {
              name: this.$t('categories.bedding.subcategories.sheets'),
            },
            crib: {
              name: this.$t('categories.bedding.subcategories.crib'),
            },
          },
        },
      ];
    },
    fetchCategory() {
      const categoryId = this.$route.params.categoryId;

      // Replace with your logic to find the category based on categoryId
      const category = this.findCategoryById(categoryId); // Implement this method
      if (category) {
        this.selectedCategory = category;
        this.selectedSubcategories = Object.values(category.subcategories);
      }
    },
    findCategoryById(categoryId) {
      // Replace with your categories data structure
      const categories = [
        // Your categories data...
      ];
      return categories.find((cat) => cat.key === categoryId);
    },
  },
  watch:{
    categoryId: 'fetchCategoryDetails',
  }
};
</script>
