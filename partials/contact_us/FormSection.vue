<template>
  <div>
    <div class="">
      <div class="">
        <h5 class="text-primary-100 font-bold text-2xl">Contact form</h5>
        <h2 class="text-heading font-bold text-5xl py-7">Drop Us a Line</h2>
        <p class="lato text-sm text-gray">Your email address will not be published. Required fields are marked *</p>
        <form class="pt-12" id="contact-form">
          <div class="grid xl:grid-cols-2 grid-cols-1 gap-6">
            <div class="">
              <input v-model="form.name" name="name" placeholder="First Name" type="text" class="h-16 w-full ltr:pl-9 rtl:pr-9 border border-[#E5E5E5] rounded-lg">
            </div>
            <div class="">
              <input v-model="form.email" name="email" placeholder="Your Email" type="email" class="h-16 w-full ltr:pl-9 rtl:pr-9 border border-[#E5E5E5] rounded-lg">
            </div>
            <div class="">
              <input v-model="form.telephone" name="telephone" placeholder="Your Phone" type="tel" class="h-16 w-full ltr:pl-9 rtl:pr-9 border border-[#E5E5E5] rounded-lg">
            </div>
            <div class="">
              <input v-model="form.subject" name="subject" placeholder="Subject" type="text" class="h-16 w-full ltr:pl-9 rtl:pr-9 border border-[#E5E5E5] rounded-lg">
            </div>
            <div class="xl:col-span-2">
              <textarea v-model="form.message" name="message" placeholder="Message" class="resize-none w-full ltr:pl-9 rtl:pr-9 border border-[#E5E5E5] rounded-lg pt-9" rows="5"></textarea>
              <button class="h-16 mt-8 rounded-lg bg-heading text-white px-24" type="submit">Send message</button>
            </div>
          </div>
        </form>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        telephone: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
    }
  }
};
</script>