<template>
  <div class="px-12">
    <div>
      <h2 class="font-bold text-heading text-5xl text-center">{{ $t('about_us.our_team') }}</h2>
      <div class="wavy-line-left wavy-line-right wavy-line-green" data-text="xxxxxxxxxxxxxx"></div>
    </div>
    <div class="grid xl:grid-cols-3 grid-cols-1 gap-7">
      <div class="flex flex-col justify-center">
        <span class="text-primary-100 font-bold text-lg">{{ $t('about_us.our_team') }}</span>
        <h2 class="3xl:text-5xl text-3xl text-heading font-bold pt-2 pb-7">{{ $t('about_us.expert_team') }}</h2>
        <p class="lato text-gray pb-6">{{ $t('about_us.info') }}</p>
        <br>
        <p class="lato text-gray pb-6">{{ $t('about_us.info') }}</p>
        <button class="w-52 h-[50px] flex justify-center items-center font-bold text-white text-lg bg-primary-100 rounded">{{ $t('about_us.view_all') }}</button>
      </div>
      <div class="xl:col-span-2 flex xl:flex-row flex-col xl:gap-3 gap-40">
        <div 
          class="relative xl:w-1/2 w-full h-[500px] rounded-lg" 
          v-for="member in membersStore.members" 
          :key="member.id"
        >
          <img :src="member.image" class="h-full w-full object-cover rounded-2xl"/>
          <div class="bg-white rounded-2xl flex flex-col gap-2 justify-between items-center xl:mx-16 mx-6 relative -mt-20 shadow-lg py-7">
            <h3 class="text-heading text-2xl font-bold">{{ member.name }}</h3>
            <p class="text-gray lato text-lg">{{ member.position }}</p>
            <div class="flex gap-3 items-center pt-4">
              <a href="#">
                <font-awesome-icon :icon="['fab', 'facebook-messenger']" class="text-2xl text-primary-100" />
              </a>
              <a href="#">
                <font-awesome-icon :icon="['fab', 'twitter']" class="text-2xl text-primary-100" />
              </a>
              <a href="#">
                <font-awesome-icon :icon="['fab', 'youtube']" class="text-2xl text-primary-100" />
              </a>
              <a href="#">
                <font-awesome-icon :icon="['fab', 'instagram']" class="text-2xl text-primary-100" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useMembersStore } from '@stores/members/index';


export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapStores(useMembersStore),
  },
  mounted() {
    this.membersStore.fetchMembers(this.$i18n.locale);
  },
  watch: {
    '$i18n.locale'(newValue) {
      this.membersStore.fetchMembers(newValue);
    },
  },
}
</script>