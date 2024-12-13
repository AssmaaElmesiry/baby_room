<template>
  <div class="flex flex-col gap-5">
    <span class="text-primary-100 text-2xl font-bold">
      {{ $t('contact_us.how_can_we_help_you') }}
    </span>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 py-5 gap-8">
      <div class="flex flex-col gap-5">
        <h2 class="text-heading text-5xl font-bold">
          {{ $t('contact_us.let_us_know') }}
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
        <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      </div>

      <ul class="grid xl:grid-cols-2 grid-cols-1 gap-8 xl:col-span-2" style="list-style: decimal-leading-zero !important">
        <li class="">
          <h3 class="font-bold text-xl">{{ $t('contact_us.title1') }}</h3>
          <p class="lato text-gray">{{ $t('contact_us.description1') }}</p>
        </li>
        <li class="">
          <h3 class="font-bold text-xl">{{ $t('contact_us.title2') }}</h3>
          <p class="lato text-gray">{{ $t('contact_us.description2') }}</p>
        </li>
        <li class="">
          <h3 class="font-bold text-xl text-primary-100">{{ $t('contact_us.title3') }}</h3>
          <p class="lato text-gray">{{ $t('contact_us.description3') }}</p>
        </li>
        <li class="">
          <h3 class="font-bold text-xl">{{ $t('contact_us.title4') }}</h3>
          <p class="lato text-gray">{{ $t('contact_us.description4') }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>