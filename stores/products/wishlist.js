import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: [],
  }),
  actions: {
    addToWishlist(product) {
      const existingProduct = this.wishlist.find(item => item.id === product.id);
      if (!existingProduct) {
        this.wishlist.push(product);
      }
    },
    removeFromWishlist(productId) {
      const index = this.wishlist.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.wishlist.splice(index, 1);
      }
    },
    clearWishlist() {
      this.wishlist = [];
    },
  },
  getters: {
    wishlistItems: (state) => state.wishlist,
    totalWishlistItems: (state) => state.wishlist.length,
  }
});
