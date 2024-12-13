import { defineStore } from 'pinia';

export const useCompareStore = defineStore('compare', {
  state: () => ({
    compareList: [],
  }),
  actions: {
    addToCompare(product) {
      if (!this.compareList.some(item => item.id === product.id)) {
        this.compareList.push(product);
      }
    },
    removeFromCompare(product) {
      this.compareList = this.compareList.filter(item => item.id !== product.id);
    },
    clearAll() {
      this.compareList = [];
    },
  },
});
