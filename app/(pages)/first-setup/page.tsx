import { FirstSetup } from '@/app/components/first-setup/FirstSetup'
import { cookies } from 'next/headers';
import { MetaDataTranslations } from '@/app/lib/utils';
import { Locale } from '@/app/i18n/config';
import { getLocale } from 'next-intl/server';
import { getUserLocale } from '@/app/i18n/locale';

export async function generateMetadata() {
  const t = await MetaDataTranslations()
 
  return {
    title: t('First setup')
  };
}

export default async function Setup() {

  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value;
  const locale = await getUserLocale() as Locale

  return <FirstSetup jwt={jwt} locale={locale} />
}
