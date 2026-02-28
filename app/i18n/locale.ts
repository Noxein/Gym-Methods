'use server';

import {cookies} from 'next/headers';
import {Locale, defaultLocale} from '@/app/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
    const store = await cookies();
    console.log(store.get(COOKIE_NAME))
    const locale = store.get(COOKIE_NAME)?.value || defaultLocale;

  return locale as Locale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}