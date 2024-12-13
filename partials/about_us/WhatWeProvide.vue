<template>
  <div class="px-12">
    <div>
      <h2 class="font-bold text-heading text-5xl text-center">{{ $t('about_us.what_we_provide') }}</h2>
      <div class="wavy-line-left wavy-line-right wavy-line-green" data-text="xxxxxxxxxxxxxx"></div>
    </div>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <div class="rounded-md provide">
        <ui-banner-card header footer>
        <template #title>
          <div class="flex flex-col gap-7 justify-center items-center">
            <img src="@components/svg/sale.svg" class="w-[100px] h-[100px] animate-scale"/>
            <h3 class="text-2xl text-heading font-bold text-center">{{ $t('about_us.offer') }}</h3>
          </div>
        </template>
        <template #content>
          <p class="lato text-lg text-gray pt-6 pb-8 text-center">{{ $t('about_us.info') }}</p>
        </template>
        <template #footer><a href="#" class="lato text-primary-100 text-lg flex justify-center">{{ $t('buttons.read_more') }}</a></template>
      </ui-banner-card>
      </div>
      <div class="rounded-md provide">
        <ui-banner-card header footer>
          <template #title>
            <div class="flex flex-col gap-7 justify-center items-center">
              <img src="@components/svg/assortment.svg" class="w-[100px] h-[100px] animate-scale"/>
              <h3 class="text-2xl text-heading font-bold text-center">{{ $t('about_us.wide_assortment') }}</h3>
            </div>
          </template>
          <template #content>
            <p class="lato text-lg text-gray pt-6 pb-8 text-center">{{ $t('about_us.info') }}</p>
          </template>
          <template #footer><a href="#" class="lato text-primary-100 text-lg flex justify-center">{{ $t('buttons.read_more') }}</a></template>
        </ui-banner-card>
      </div>
      <div class="rounded-md provide">
        <ui-banner-card header footer>
          <template #title>
            <div class="flex flex-col gap-7 justify-center items-center">
              <img src="@components/svg/delivery-box.svg" class="w-[100px] h-[100px] animate-scale"/>
              <h3 class="text-2xl text-heading font-bold text-center">{{ $t('about_us.free_delivery') }}</h3>
            </div>
          </template>
          <template #content>
            <p class="lato text-lg text-gray pt-6 pb-8 text-center">{{ $t('about_us.info') }}</p>
          </template>
          <template #footer><a href="#" class="lato text-primary-100 text-lg flex justify-center">{{ $t('buttons.read_more') }}</a></template>
        </ui-banner-card>
      </div>
      <div class="rounded-md provide">
        <ui-banner-card header footer>
          <template #title>
            <div class="flex flex-col gap-7 justify-center items-center">
              <img src="@components/svg/exchange.svg" class="w-[100px] h-[100px] animate-scale"/>
              <h3 class="text-2xl text-heading font-bold text-center">{{ $t('about_us.easy_return') }}</h3>
            </div>
          </template>
          <template #content>
            <p class="lato text-lg text-gray pt-6 pb-8 text-center">{{ $t('about_us.info') }}</p>
          </template>
          <template #footer><a href="#" class="lato text-primary-100 text-lg flex justify-center">{{ $t('buttons.read_more') }}</a></template>
        </ui-banner-card>
      </div>
      <div class="rounded-md provide">
        <ui-banner-card header footer>
          <template #title>
            <div class="flex flex-col gap-7 justify-center items-center">
              <img src="@components/svg/deal.svg" class="w-[100px] h-[100px] animate-scale"/>
              <h3 class="text-2xl text-heading font-bold text-center">{{ $t('about_us.satisfaction') }}</h3>
            </div>
          </template>
          <template #content>
            <p class="lato text-lg text-gray pt-6 pb-8 text-center">{{ $t('about_us.info') }}</p>
          </template>
          <template #footer><a href="#" class="lato text-primary-100 text-lg flex justify-center">{{ $t('buttons.read_more') }}</a></template>
        </ui-banner-card>
      </div>
      <div class="rounded-md provide">
        <ui-banner-card header footer>
          <template #title>
            <div class="flex flex-col gap-7 justify-center items-center">
              <img src="@components/svg/file.svg" class="w-[100px] h-[100px] animate-scale"/>
              <h3 class="text-2xl text-heading font-bold text-center">{{ $t('about_us.deal') }}</h3>
            </div>
          </template>
          <template #content>
            <p class="lato text-lg text-gray pt-6 pb-8 text-center">{{ $t('about_us.info') }}</p>
          </template>
          <template #footer><a href="#" class="lato text-primary-100 text-lg flex justify-center">{{ $t('buttons.read_more') }}</a></template>
        </ui-banner-card>
      </div>
    </div>
  </div>
</template>
<style>
.wavy-line-left , .wavy-line-right {
  width: 150px;
  height: 50px;
  overflow: hidden;
  margin: 0 auto 0 auto;
}
[dir = 'ltr'] .wavy-line-left:before {
  content: attr(data-text);
  position: relative;
  top: -55px;
  color: rgba(0,0,0,0);
  width: calc(100% + 27px);
  font-size: 4em;
  text-decoration-style: wavy;
  text-decoration-color: #25173A;
  text-decoration-line: underline;
  animation: animate .9s linear infinite;
  -webkit-animation: animate .9s linear infinite;
}
[dir = 'rtl'] .wavy-line-right:before {
  content: attr(data-text);
  position: relative;
  top: -55px;
  color: rgba(0,0,0,0);
  width: calc(100% + 27px);
  font-size: 4em;
  text-decoration-style: wavy;
  text-decoration-color: #25173A;
  text-decoration-line: underline;
  animation: right .9s linear infinite;
  -webkit-animation: right .9s linear infinite;
}
@keyframes animate {
  0% { left: -0px; }
  100% { left: -30px;}
}
@-webkit-keyframes animate {
  0% { left: -0px; }
  100% { left: -30px;}
}
@keyframes right {
  0% { right: -0px; }
  100% { right: -30px;}
}
@-webkit-keyframes right {
  0% { right: -0px; }
  100% { right: -30px;}
}
.wavy-line-green:before {
  text-decoration-color: #BCE3C9 !important;
 }
.provide{
  border: 1px solid #E5E5E5;
  border-radius: 15px;
  padding: 50px 32px;
}
.provide:hover{
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
@keyframes scale-up {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.provide:hover .animate-scale {
  animation: scale-up 1.5s ease-in-out infinite;
}
</style>