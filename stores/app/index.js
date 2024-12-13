import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		language: localStorage.language ? localStorage.language : 'ar',
		direction: localStorage.direction ? localStorage.direction : 'rtl',
	}),
	getters: {
		//
	},
	actions: {
		initialLanguage: function (i18n) {
			if (this.language === 'en' || !('language' in localStorage)) {
				document.documentElement.setAttribute('lang', 'en')
				document.documentElement.setAttribute('dir', 'ltr')
				i18n.locale = 'en'
				this.language = 'en'
				localStorage.language = 'en'
				this.direction = 'ltr'
				localStorage.direction = 'ltr'
			} else {
				document.documentElement.setAttribute('lang', 'ar')
				document.documentElement.setAttribute('dir', 'rtl')
				i18n.locale = 'ar'
				this.language = 'ar'
				localStorage.language = 'ar'
				this.direction = 'ltr'
				localStorage.direction = 'ltr'
			}
		},
		setLanguage: function (i18n, language) {
			if (language === 'en') {
				document.documentElement.setAttribute('lang', 'en')
				document.documentElement.setAttribute('dir', 'ltr')
				i18n.locale = 'en'
				this.language = 'en'
				localStorage.language = 'en'
				localStorage.direction = 'ltr'
        this.appDir = 'ltr'
			} else {
				document.documentElement.setAttribute('lang', 'ar')
				document.documentElement.setAttribute('dir', 'rtl')
				i18n.locale = 'ar'
				this.language = 'ar'
				localStorage.language = 'ar'
				localStorage.direction = 'rtl'
        this.appDir = 'rtl'
			}
		}
	}
})
