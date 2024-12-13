<template>
  <div class="flex gap-7 items-center lg:justify-center justify-start md:overflow-x-hidden overflow-x-scroll py-3">
    <button
      class="transition ease-in duration-300 lato"
      :class="{ 'font-bold': selected === 'all' }"
      @click="filter('all')"
    >
      {{ $t('home.all') }}
    </button>
    <button
      v-for="(category, index) in categories" 
      :key="index"
      class="transition ease-in duration-300 lato"
      @click="filter(category.key)"
    >
      <p class="w-max" :class="{ 'font-bold': selected === category.key }">{{ category.name }}</p>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  methods: {
    filter(categoryKey) {
      this.$emit('filter-changed', categoryKey);
    },
  },
};
</script>
