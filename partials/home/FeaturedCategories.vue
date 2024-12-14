<template>
  <div class="">
    <div class="flex 2xl:flex-row flex-col 2xl:items-center 3xl:gap-48 2xl:gap-28 gap-10 mb-11">
      <h2 id="animated" class="3xl:text-[40px] md:text-3xl text-2xl font-bold text-heading">{{ $t('home.featured_categories') }}</h2>
      <div class="flex gap-7 items-center lg:justify-center justify-start md:overflow-x-hidden overflow-x-scroll py-3">
        <button
          class="transition ease-in duration-300 lato"
          :class="{'font-bold': selectedFeaturedCategory === 'all'}"
          @click="filterFeatured('all')"
        >
          {{ $t('home.all') }}
        </button>
        <button
          v-for="category in categories" 
          :key="category.key"
          class="transition ease-in duration-300 lato"
          
          @click="filterFeatured(category.key)"
        >
          <p class="w-max" :class="{'font-bold': selectedFeaturedCategory === category.key}">{{ category.name }}</p>
        </button>
      </div>
    </div>

    <div v-if="selectedFeaturedCategory === 'all'">
      <Swiper
        :navigation="true" 
        :modules="modules"
        :dir="isLtr ? 'ltr' : 'rtl'"
        :space-between="24"
        class="category"
        :breakpoints="{
          '991': {
            slidesPerView: 3,
            spaceBetween: 70,
          },
          '1250': {
            slidesPerView: 5,
            spaceBetween: 70,
          },
          '1535': {
            slidesPerView: 10,
            spaceBetween: 24,
          },
        }"
      >
        <SwiperSlide 
          v-for="category in categories" 
          :key="category.key"
          class="!flex flex-col justify-center items-center gap-5 px-5 py-4 rounded-xl hover:animate-bounce-slight hover:shadow-2xl" 
          :style="{ backgroundColor: category.backgroundColor ,
            animation: 'fadeIn 0.5s ease-out',
            'animation-delay': `${index * 5}s`}"
        >
          <router-link :to="{ name: 'CategoryFilter', params: { categoryId: category.key } }" class="w-full h-full flex flex-col justify-center items-center gap-5">
            <img :src="category.image" alt="category image" class="xl:w-full w-1/2"/>
            <div class="flex flex-col gap-2 justify-center items-center">
              <p class="font-bold text-heading w-max">{{ category.name }}</p>
              <span class="lato text-[#B6B6B6] text-xs">{{ category.items }} {{ $t('home.items') }}</span>
            </div>
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>

    <div v-if="selectedFeaturedCategory !== 'all' && selectedCategory && selectedCategory.subcategories">
      <Swiper
        :navigation="true" 
        :modules="modules"
        :dir="isLtr ? 'ltr' : 'rtl'"
        :space-between="24"
        class="category"
        :breakpoints="{
          '991': {
            slidesPerView: 3,
            spaceBetween: 70,
          },
          '1250': {
            slidesPerView: 5,
            spaceBetween: 70,
          },
          '1916': {
            slidesPerView: 10,
            spaceBetween: 24,
          },
        }"
      >
      <SwiperSlide 
        v-for="(subValue, subKey, index) in selectedCategory.subcategories" 
        :key="subKey"
        class="flex gap-5 px-5 py-4 rounded-xl hover:animate-bounce-slight hover:shadow-2xl" 
        :style="{
          backgroundColor: subValue.backgroundColor,
          animation: 'fadeIn 0.5s ease-out',
          'animation-delay': `${index * 5} s`  /* Adjust delay based on index */
        }"
      >
        <router-link :to="{ name: 'CategoryFilter', params: { categoryId: subKey } }"
          class="flex flex-col gap-5 items-center px-5 py-4"
        >
          <img src="@/public/assets/images/bannerHomeBg.svg" alt="subcategory image" class="md:w-full w-1/2"/>
          <div class="flex flex-col gap-2 justify-center items-center">
            <p class="font-bold text-heading w-max">{{ subValue.name }}</p>
            <span class="lato text-[#B6B6B6] text-xs">{{ subValue.items }} {{ $t('home.items') }}</span>
          </div>
        </router-link>
      </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import CategoryImage from '@/public/assets/images/bannerHomeBg.svg';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      selectedFeaturedCategory: 'all',
      categories: this.initializeCategories(), 
      modules: [Navigation],
      swiperKey: 0,
      colors: ['#F2FCE4', '#FFFCEB', '#ECFFEC', '#FEEFEA', '#FFF3EB', '#FFF3FF', '#F2FCE4'],
    };
  },
  computed: {
    selectedCategory() {
      return this.categories.find(category => category.key === this.selectedFeaturedCategory) || null;
    },
    isLtr() {
      return this.$i18n.locale === 'en';
    }
  },
  mounted() {
    this.updateCategories();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const direction = document.dir || 'ltr';
          if (entry.target.id === 'animated') {
            if (direction === 'ltr') {
            entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
          } else if (direction === 'rtl') {
            entry.target.classList.add('animate__animated', 'animate__fadeInRight');
          };
          observer.unobserve(entry.target);
        }
        }
      });
    });

    const elementsToAnimate = [
      document.getElementById('animated'),
    ];

    elementsToAnimate.forEach(element => {
      if (element) {
        observer.observe(element);
      }
    });
  },
  methods: {
    GoToCategoryFilter(categoryId) {
      this.$router.push({ name: 'CategoryFilter', params: { categoryId } });
    },
    getRandomColor() {
      if (this.colors && Array.isArray(this.colors) && this.colors.length > 0) {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
      }
      console.warn('Colors array is undefined or empty.');
      return '#FFFFFF';
    },
    initializeCategories() {
      return [
        {
          key: 'strollers',
          name: this.$t('categories.strollers.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            lightweight: {
              name: this.$t('categories.strollers.subcategories.lightweight'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            double: {
              name: this.$t('categories.strollers.subcategories.double'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'dress',
          name: this.$t('categories.dress.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            casual: {
              name: this.$t('categories.dress.subcategories.casual'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            formal: {
              name: this.$t('categories.dress.subcategories.formal'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'bedding',
          name: this.$t('categories.bedding.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            crib: {
              name: this.$t('categories.bedding.subcategories.crib'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            sheets: {
              name: this.$t('categories.bedding.subcategories.sheets'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'footwear',
          name: this.$t('categories.footwear.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            sneakers: {
              name: this.$t('categories.footwear.subcategories.sneakers'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            boots: {
              name: this.$t('categories.footwear.subcategories.boots'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'safety',
          name: this.$t('categories.safety.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            carSeats: {
              name: this.$t('categories.safety.subcategories.carSeats'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            monitors: {
              name: this.$t('categories.safety.subcategories.monitors'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'toys',
          name: this.$t('categories.toys.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            stuffed: {
              name: this.$t('categories.toys.subcategories.stuffed'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            educational: {
              name: this.$t('categories.toys.subcategories.educational'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'feeding',
          name: this.$t('categories.feeding.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            bottles: {
              name: this.$t('categories.feeding.subcategories.bottles'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            highChairs: {
              name: this.$t('categories.feeding.subcategories.highChairs'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'bathing',
          name: this.$t('categories.bathing.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            tubs: {
              name: this.$t('categories.bathing.subcategories.tubs'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            bathToys: {
              name: this.$t('categories.bathing.subcategories.bathToys'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'maternity',
          name: this.$t('categories.maternity.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            clothing: {
              name: this.$t('categories.maternity.subcategories.clothing'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            nursing: {
              name: this.$t('categories.maternity.subcategories.nursing'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
        {
          key: 'clothes',
          name: this.$t('categories.clothes.name'),
          image: CategoryImage,
          backgroundColor: this.getRandomColor(),
           items : 22,
          subcategories: {
            infant: {
              name: this.$t('categories.clothes.subcategories.infant'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
            toddler: {
              name: this.$t('categories.clothes.subcategories.toddler'),
              backgroundColor: this.getRandomColor(),
           items : 22,
            },
          },
        },
      ];
    },
    updateCategories() {
      this.categories = this.initializeCategories();
    },
    filterFeatured(category) {
      this.selectedFeaturedCategory = category;

      this.swiperKey += 1;
    },
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateCategories(); 
    },
  },
};
</script>

<style>
.category.swiper{
  overflow: visible !important;
}
@keyframes bounceSlight {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hover\:animate-bounce-slight:hover {
  animation: bounceSlight 2s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
