<template>
  <button
    :class="['flex justify-center items-center rounded-full bg-transparent transition-all ease-in duration-500']"
    aria-label="Favourite"
  >
    <svg
      :class="['w-5 h-auto transition-transform', isLiked ? 'animate-heart-grow' : '']"
      viewBox="0 0 515.99347 480.73038"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          class="heart"
          id="b"
          d="m372.59 17.99c-48.54 0-92.99 26.12-118 67.99-24.79-42.41-67.41-68-115.18-68-72.86 0-131.09 59.68-138.55 141.94-0.59 3.63-3.02 22.76 4.35 53.94 10.61 44.98 35.13 85.89 70.89 118.29 11.89 10.79 71.34 64.75 178.37 161.87 108.86-97.12 169.34-151.07 181.43-161.86 35.76-32.41 60.28-73.31 70.89-118.3 7.37-31.17 4.94-50.3 4.36-53.93-7.47-82.26-65.69-141.94-138.56-141.94z"
        />
        <path
          class="shine"
          id="a"
          d="m59.07 176.3c0 5.44 4.4 9.84 9.85 9.84 5.44 0 9.84-4.4 9.84-9.84 0-43.44 35.34-78.78 78.78-78.78 5.44 0 9.84-4.4 9.84-9.84 0-5.45-4.41-9.85-9.84-9.85-54.3 0-98.47 44.17-98.47 98.47z"
        />
      </defs>
      <g transform="translate(1.9963 -15.98)">
        <use
          width="100%"
          height="100%"
          xlink:href="#b"
          :fill="isLiked ? '#F4A8AF' : 'rgba(0, 0, 0, 0.15)'"
        />
        <use width="100%" height="100%" xlink:href="#a" fill="#ffffff" />
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isLiked: false,
    };
  },
  methods: {
    // toggleLike() {
    //   this.isLiked = !this.isLiked;
    // },
  },
};
</script>

<style>
@keyframes animate-heart-grow {
  0% {
    transform: scale(3);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>
