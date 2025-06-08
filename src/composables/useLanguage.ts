import { useI18n } from 'vue-i18n';

export function useLanguage() {
    const { locale } = useI18n()

    const setLanguage = (lang: 'ro' | 'en') => {
        locale.value = lang
        if (localStorage.getItem('cookiesAccepted') === 'true') {
            localStorage.setItem('language', lang)
        }
    }

    const initLanguage = () => {
        const savedLang = localStorage.getItem('language')
        if (savedLang) {
            locale.value = savedLang
        }
    }

    return {
        setLanguage,
        initLanguage
    }
}