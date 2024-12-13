<template>
  <transition name="slide-fade">
    <div
      :class="
        'slide-over-mask fixed w-full h-full top-0 !z-[999999999999999] ' 
      "
      v-if="show"
      @click="close"
    >
      <div
        :class="
          'fixed w-full h-full ' + (show ? 'slide-over-open' : 'slide-over-close')
        "
       
      >
        <div
          :class="
            'flex transition flex-col items-center slide-over fixed bg-white h-full top-0 '
          "
          @click.stop

        >
          <div
            class="w-full flex-initial flex justify-between items-center bg-white px-6 py-4 shadow"
          >
            <div class="text-primary-100 text-xl font-bold pe-4 capitalize flex justify-between items-center gap-6">
              <slot name="title"></slot>
            </div>
            <div
              class="text-primary-100 w-10 cursor-pointer transition"
              @click="close"
            >
              <button class="close"></button>
            </div>
          </div>
          <div class="slide-over-content w-full flex-auto overflow-auto">
            <div class="p-6 min-h-full">
              <slot name="content"></slot>
            </div>
          </div>
          <div v-if="actions" class="w-full ">
            <div class="flex justify-end items-center w-full">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  components: {
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    actions: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      appDir: null
    }
  },
  created: function () {
    this.appDir = document.documentElement.getAttribute('dir') ?? 'ltr'
  },
  methods: {
    close() {
      this.$emit('closeSlideOver');
    },
  },
  computed: {},
  watch: {}
}
</script>
