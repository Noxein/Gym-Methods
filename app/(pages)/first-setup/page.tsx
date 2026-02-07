import React from 'react'
import { FirstSetup } from '@/app/components/first-setup/FirstSetup'
import { getLocale, getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const locale = getLocale()
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('First setup')
  };
}

export default async function Setup() {

  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value;

  return <FirstSetup jwt={jwt} />
}
