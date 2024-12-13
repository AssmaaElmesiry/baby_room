import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product, quantity) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity });
      }
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    totalItems: (state) => state.cart.length,
    cartTotal: (state) => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
  }
});
