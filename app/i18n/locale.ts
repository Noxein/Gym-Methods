'use server';

import {cookies} from 'next/headers';
import {Locale, defaultLocale} from '@/app/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
    const store = await cookies();
    const locale = store.get('locale')?.value || defaultLocale;

  return locale
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}