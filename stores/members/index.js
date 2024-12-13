import { defineStore } from 'pinia';

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [],
  }),
  actions: {
    async fetchMembers(lang) {
      try {
        const response = await fetch('/content/members/members.json');
        const data = await response.json();
        this.members = data[lang];  
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    },
  },
});
