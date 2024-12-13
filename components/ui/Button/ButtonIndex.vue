<template>
  <div class="relative">
      <slot name="hover"></slot>
    <button :type="type" :class="classes" @click="handleClick" class="w-full h-full flex justify-center items-center">
      {{ text }}
      <slot name="icon"></slot>
    </button>

  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "button",
    },
    name: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: '',
      required: true,
    },
    activeText: {
      type: String,
      default: ''
    },
    design: {
      type: String,
      default: "primary",
    },
    theme: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "small",
    },
    rounded: {
      type: String,
      default: "full",
    },
    font: {
      type: String,
      default: "bold",
    },
  },
  data: function () {
    return {
      isActive: false,
      baseClasses:
        "focus:outline-none flex justify-center items-center gap-2 whitespace-nowrap capitalize transition relative w-full h-full transition ease-in duration-300 cursor-pointer",
      themes: {
        primary: {
          primary: "bg-secondary text-primary-100",
          secondary: "bg-primary-100 text-white",
          tertiary: "bg-white text-primary-100",
          base: "bg-transparent text-primary-100 border-4 border border-primary-100",
        }, 
      },
      sizes: {
        small: "py-1 px-5",
        medium: "py-2 px-10",
        normal: "py-3 px-10",
        large: "py-4 px-7",
        height: "h-12"

      },
      rounders: {
        full: "rounded-full",
        large: "rounded-lg",
        medium: "rounded-md",
        base: "rounded",
        none: "rounded-none",
      },
      fonts:{
        bold: "font-bold",
        normal: "font-normal",
        medium: "font-medium",
      }
    };
  },
  computed: {
    classes: function () {
      var theme = this.baseClasses;
      theme += " " + this.themes[this.design][this.theme];
      theme += " " + this.sizes[this.size];
      theme += " " + this.fonts[this.font];
      theme += " " + this.rounders[this.rounded];
      return theme;
    },
  },
  methods: {
    handleClick() {
      this.isActive = !this.isActive; 
      this.$emit('click', this.isActive);
    }
  }
};
</script>
