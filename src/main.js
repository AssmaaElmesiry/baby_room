import { registerUIComponents } from "./ui-components";



import "@/public/assets/css/tailwind.css";
import "@/public/assets/css/app.css";
import 'vue-select/dist/vue-select.css';
import 'floating-vue/dist/style.css'
import "vue-toastification/dist/index.css";
import 'animate.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import vSelect from 'vue-select'
import FloatingVue from 'floating-vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import vue3StarRatings from "vue3-star-ratings";
import Toast from "vue-toastification";
import Vue3Autocounter from 'vue3-autocounter';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '@/pages/App.vue'
import router from '@/router'
import localeEn from '@lang/en.json'
import localeAr from '@lang/ar.json'

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

const i18n = createI18n({
	locale: 'en',
	messages: {
		en: localeEn,
		ar: localeAr
	}
})

const app = createApp(App)

app.component('v-select', vSelect)
app.use(createPinia())
registerUIComponents(app);
app.use(router);
app.use(i18n);
app.use(FloatingVue);
app.use(Toast);
app.component(VueCountdown.name, VueCountdown);
app.component("vue3-star-ratings", vue3StarRatings);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('vue3-autocounter', Vue3Autocounter)
app.mount('#app')
