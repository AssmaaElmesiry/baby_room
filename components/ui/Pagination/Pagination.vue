<template>
    <div class="flex justify-end items-stretch -mx-1">
        <div
            :class="currPage == 1 ? disabledButtonTheme : buttonTheme"
            @click="currPage == 1 ? noOp() : navigate(-1)"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="ltr:rotate-180"/>
        </div>
        <div
            :class="currPage == 2 ? disabledButtonTheme : buttonTheme"
            @click="currPage == 2 ? noOp() : navigate(-2)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" class="ltr:rotate-180"/>
        </div>
        <button
            v-for="(item, index) in pagination"
            :key="index"
            :class="item == currPage ? activeButtonTheme : buttonTheme"
            @click="handlePageChange(item)"
        >
            {{ item }}
        </button>
        <div
            :class="currPage == pages ? disabledButtonTheme : buttonTheme"
            @click="currPage == pages ? noOp() : navigate(1)"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="ltr:rotate-180"/>
        
        </div>
        <div
            :class="currPage == pages ? disabledButtonTheme : buttonTheme"
            @click="currPage == pages ? noOp() : navigate(2)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" class="ltr:rotate-180"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            pagination: [],
            currPage: 0,
            buttonTheme:
                'rounded-full border border-[#F1F1F1] text-primary-100 text-sm font-bold px-3 py-1 mx-1 cursor-pointer flex justify-center items-center transition focus:outline-none hover:bg-secondary hover:text-white ',
            activeButtonTheme:
                'bg-secondary rounded-full shadow text-white text-sm font-bold px-3 py-1 mx-1 focus:outline-none',
            disabledButtonTheme:
                'rounded-full text-white text-sm font-bold px-3 py-1 mx-1 flex justify-center items-center focus:outline-none cursor-not-allowed'
        };
    },
    methods: {
        noOp: function () {
            return;
        },
        handlePageChange(item) {
            if (item == '...') {
                return;
            }

            if (this.currPage !== item) {
                this.currPage = item;
                this.setPagination();
                this.$emit('pageChanged', item);
            }
        },
        navigate: function (dir) {
            this.currPage += dir;
            this.setPagination();
            this.$emit('pageChanged', this.currPage);
        },
        setPagination: function () {
            var current = this.currPage,
                last = this.pages,
                delta = 2,
                left = current - delta + 1,
                right = current + delta,
                range = [],
                rangeWithDots = [],
                l;
            for (let i = 1; i <= last; i++) {
                if (i == 1 || i == last || (i >= left && i < right)) {
                    range.push(i);
                }
            }
            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }
            this.pagination = rangeWithDots;
        }
    },
    mounted() {
        this.currPage = this.currentPage;
        this.setPagination();
    },
    watch: {
        currentPage: function (val) {
            this.handlePageChange(val);
        },
        pages: function () {
            this.setPagination();
        }
    }
};
</script>
