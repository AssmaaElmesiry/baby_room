<template>
  <transition name="popup">
    <div class="popup-mask overflow-auto fixed top-0 left-0 w-full h-full bg-primary-100 bg-opacity-50 z-[99]" 
    v-if="show" style="backdrop-filter: blur(1px); box-shadow: 0px 0px 10px 0px rgba(0,46,95,1);">
      <div class="fixed top-0 left-0 w-full h-full flex flex-col md:justify-center justify-end items-center " @click="handleOutsideClick">
        <div :class="classes" @click.stop>
          <div class="flex lg:hidden justify-center pt-4">
            <div class="text-center bg-[#3D3D3D80] w-9 h-1 rounded-full"></div>
          </div>
          <button class="close"  @click="$emit('close')"></button>
          <div class="flex flex-col gap-5 items-start py-8 px-8">
            
            <div
              class="w-full rounded-md flex flex-col-reverse sm:flex-row justify-between items-center bg-white"
              v-if="header"
            >
              <slot name="title"></slot>              
            </div>
            <div class="flex flex-col w-full" v-if="content">
              <div class="flex flex-col w-full">
                <slot name="content"></slot>
              </div>
            </div>
            <div v-if="action" class="w-full">
                <slot name="action"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    theme: {
			type: String,
			default: 'primary'
		},
    size:{
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'medium'
    },
    header: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    },
    content: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data: function () {
    return {
      widths: {
        large: 'md:w-[955px] w-full',
        medium: 'md:w-[775px] w-full',
        small: 'md:w-[670px] w-full',
      },
      themes: {
        primary: 'bg-white',
        gary: 'bg-[#F0F0F0]'
      },
      sizes:{
      }
    };
  },
  computed: {
    classes: function () {
      var theme =
        'popup-container rounded-md relative flex flex-col justify-between transition duration-300 max-h-full overflow-y-scroll border-[3px] border-primary-100';
      theme += ' ' + this.widths[this.width];
      theme += ' ' + this.sizes[this.size];
      theme += ' ' + this.themes[this.theme];
      return theme;
    },
    titleClasses: function () {
      var theme = 'flex text-slate-900 font-bold tracking-wider capitalize text-xl';
      return theme;
    }
  },
  methods: {
    handleOutsideClick() {
      this.$emit('close'); // Emit close event when clicking outside
    }
  }
};
</script>
<style>
.popup-mask {
  backdrop-filter: blur(5px);
}

.popup-container {
  padding: 20px; /* ضبط المسافة الداخلية */
}

.popup-container .close {
  background-color: transparent; /* التأكد من أن زر الإغلاق واضح */
  border: none;
  cursor: pointer;
  font-size: 20px; /* حجم الخط */
  color: #333; /* لون الخط */
}

.popup-title {
  font-size: 24px; /* حجم عنوان البوب أب */
  margin-bottom: 10px; /* مسافة أسفل العنوان */
}

.popup-content {
  max-height: 60vh; /* أقصى ارتفاع للمحتوى */
  overflow-y: auto; /* تفعيل التمرير إذا كان المحتوى طويلاً */
}

.popup-actions {
  margin-top: 20px; /* مسافة فوق الأزرار */
  display: flex; /* جعل الأزرار في صف */
  justify-content: flex-end; /* محاذاة الأزرار إلى اليمين */
}
@keyframes popup-enter {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popup-leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.popup-enter-active {
  animation: popup-enter 0.3s ease forwards;
}

.popup-leave-active {
  animation: popup-leave 0.3s ease forwards;
}

</style>