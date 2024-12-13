<template>
  <div class="container mx-auto px-4 3xl:px-40 xl:px-20 lg:px-10 md:px-10 py-24">
    <div class="grid xl:grid-cols-3 grid-cols-1 gap-20 px-2">
      <div class="w-full">
        <div class="flex xl:flex-col flex-row gap-4 w-full xl:justify-start justify-between">
          <div 
            v-for="(tab, index) in tabs" 
            :key="tab.title"
            class="tab xl:py-5 xl:px-7 py-2 px-4 rounded-xl cursor-pointer border border-[#E5E5E5] xl:w-full flex gap-6 items-center transition ease-in duration-300"
            @click="selectTab(index)"
            :class="{ 'active': activeTab === index }"
            :v-tooltip="tab.title"
          >
            <font-awesome-icon :icon="tab.icon" class="text-gray" :class="{ 'text-white transition ease-in duration-300': activeTab === index }"/>
            <p class="font-bold text-gray xl:block hidden" :class="{ 'text-white transition ease-in duration-300': activeTab === index }">{{ tab.title }}</p>
          </div>
        </div>
      </div>
      <div class="xl:col-span-2">
        <div v-if="activeTab === 0">
          <dotlottie-player src="https://lottie.host/58b3859f-1181-4d6e-862b-7109fe005552/yeYJXkIddw.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
        </div>
        <!-- Orders list -->
        <div v-if="activeTab === 1">
          <h2 class="text-heading text-3xl font-bold">{{ $t('my_account.your_orders') }}</h2>
          <table class="min-w-full mt-4 rounded-2xl">
            <thead class="mt-5 bg-[#F5F5F5] h-[58px] px-8">
              <tr class="rounded-2xl">
                <th class="text-heading font-bold xl:text-base text-xs">{{ $t('my_account.order_id') }}</th>
                <th class="text-heading font-bold xl:text-base text-xs">{{ $t('my_account.date') }}</th>
                <th class="text-heading font-bold xl:text-base text-xs">{{ $t('my_account.status') }}</th>
                <th class="text-heading font-bold xl:text-base text-xs">{{ $t('my_account.total') }}</th>
                <th class="text-heading font-bold xl:text-base text-xs">{{ $t('my_account.actions') }}</th>
              </tr>
            </thead>
            <tbody class="mt-6">
              <tr v-for="(order, index) in orders" :key="order.id">
                <td class="lato text-gray text-center xl:text-base text-xs py-4 xl:px-6">{{ order.id }}</td>
                <td class="lato text-gray text-center xl:text-base text-xs py-4 xl:px-6">{{ order.date }}</td>
                <td class="text-second text-center xl:text-base text-xs py-4 xl:px-6">{{ order.status }}</td>
                <td class="lato text-gray text-center xl:text-base text-xs py-4 xl:px-6">{{ order.total }}</td>
                <td class="lato text-primary-100 text-center xl:text-base text-xs py-4 xl:px-6">{{ $t('my_account.view') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Track Your Orders -->
        <div v-if="activeTab === 2">
          <div>
            <dotlottie-player src="https://lottie.host/6ced3d44-10df-441f-a019-581f523002e6/ouKsvtJY6X.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
          </div>
        </div>
        <!-- Address -->
        <div v-if="activeTab === 3">
          <div v-for="(address, index) in addresses" :key="index" class="mb-4">
            <h3 class="text-heading font-bold">{{ address.title }} :</h3>
            <div class="flex items-center justify-between">
              <p v-if="!address.isEditing" class="text-gray">{{ address.content }}</p>
              <input 
                v-else 
                v-model="address.content" 
                type="text" 
                class="border border-[#E5E5E5] rounded-lg px-9 h-11 w-full"
                @blur="toggleEditAddress(address)"
              />
              <button @click="toggleEditAddress(address)" class="ml-2 text-blue-500">
                <font-awesome-icon 
                  v-if="address.isEditing" 
                  :icon="['fas', 'check']" 
                  class="text-second"
                />
                <font-awesome-icon 
                  v-else 
                  :icon="['fas', 'pencil']" 
                  class="text-second"
                />
              </button>
            </div>
          </div>
        </div>
        <!-- Account Details -->
        <div v-if="activeTab === 4">
          <div>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-heading text-3xl font-bold">{{ $t('my_account.account_details') }}</h2>
              <div>
                <button 
                  @click="isEditing ? saveAccountDetails() : toggleEditMode()" 
                  class="font-bold py-2 px-4 rounded" 
                  :class="isEditing ? 'bg-second-100 text-white' : 'bg-primary-100 text-white'"
                >
                  {{ isEditing ? $t('my_account.save') : $t('my_account.edit') }}
                </button>
              </div>
            </div>
            <div v-for="(detail, key) in accountDetails" :key="key" class="mb-4 flex gap-3">
              <label class="block text-gray font-bold">{{ $t(`my_account.${key}`) }} :</label>
              <input 
                v-if="isEditing" 
                v-model="accountDetails[key]" 
                type="text" 
                class="border border-gray-300 p-2 w-full rounded"
              />
              <p v-else>{{ accountDetails[key] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LastBanner class="mt-14" />
  </div>
</template>

<script>
import LastBanner from '@partials/home/LastBanner.vue';
export default {
  components:{
    LastBanner
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          title: this.$t('my_account.dashboard'), 
          icon: ['fas', 'house-chimney'] 
        },
        {
          title: this.$t('my_account.orders_list'), 
          icon: ['fas', 'gear'] 
        },
        {
          title: this.$t('my_account.track_your_orders'), 
          icon: ['fas', 'bag-shopping'] 
        },
        {
          title: this.$t('my_account.my_address'), 
          icon: ['fas', 'location-dot'] 
        },
        {
          title: this.$t('my_account.account_details'),
          icon: ['fas', 'user'] 
        },
        {
          title: this.$t('my_account.log_out'), 
          icon: ['fas', 'arrow-right-from-bracket'] 
        }
      ],
      addresses: [
        { title: 'Address 1', content: 'Details about Address 1', isEditing: false },
        { title: 'Address 2', content: 'Details about Address 2', isEditing: false },
      ],
      accountDetails: {
        full_name: 'Assmaa Elmesiry',
        email: 'assmaa@123.com',
        phone: '015555555'
      },
      isEditing: false,
      orders: [
        { id: '#1357', date: 'March 15, 2023', status: this.$t('my_account.processing'), total: '$125.00 for 2 item' },
        { id: '#1358', date: 'March 16, 2023', status: this.$t('my_account.completed'), total: '$150.00 for 3 item' },
      ]
    };
  },
  methods: {
    selectTab(index) {
      this.activeTab = index;
    },
    toggleEditAddress(address) {
      address.isEditing = !address.isEditing;
    },
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    saveAccountDetails() {
      // Your save logic here
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
.tab {
  background-color: white;
}
.tab.active {
  background-color: #B5DBD8;
}
</style>
