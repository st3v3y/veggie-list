import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

export function initI18n() {
    register('es', () => import('./locales/es.json'));
    register('en', () => import('./locales/en.json'));

    init({
        fallbackLocale: 'es',
        initialLocale: getLocaleFromNavigator(),
    });

    locale.set('es');
}