import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    selectedCategories: [],
    selectedBrands: [],
    selectedTags: [],
    priceRange: { min: 0, max: 1000 },
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id);
    },
    getRelatedProducts(state) {
      return (productId) => {
        const currentProduct = state.products.find(product => product.id === productId);
        return state.products.filter(product => product.id !== productId && product.categoryId === currentProduct.categoryId);
      };
    },

    filteredProducts(state) {
      return state.products.filter((product) => {
        const matchesCategory = state.selectedCategories.length === 0 || state.selectedCategories.includes(product.category);
        const matchesBrand = state.selectedBrands.length === 0 || state.selectedBrands.includes(product.brand);
        const matchesTag = state.selectedTags.length === 0 || state.selectedTags.includes(product.tag);
        const matchesPrice = product.price >= state.priceRange.min && product.price <= state.priceRange.max;
        return matchesCategory && matchesBrand && matchesTag && matchesPrice;
      });
    },
  },

  actions: {
    async fetchProducts(lang) {
      try {
        const response = await fetch('/content/products/products.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.products = data[lang] || [];
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchCategories(lang) {
      try {
        const response = await fetch('/content/categories/categories.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Categories:', data);
        this.categories = data[lang] || []; 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },    
    

    updateFilters(categories = [], brands = [], tags = []) {
      this.selectedCategories = categories;
      this.selectedBrands = brands;
      this.selectedTags = tags;
    
      console.log('Updated Filters:', categories, brands, tags);
    },
    
    resetFilters() {
      this.selectedCategories = [];
      this.selectedBrands = [];
      this.selectedTags = [];
      this.priceRange = { min: 0, max: 1000 };
    },
  },
});
