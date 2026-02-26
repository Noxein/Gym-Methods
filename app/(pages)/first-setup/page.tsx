import { FirstSetup } from '@/app/components/first-setup/FirstSetup'
import { cookies } from 'next/headers';
import { MetaDataTranslations } from '@/app/lib/utils';

export async function generateMetadata() {
  const t = await MetaDataTranslations()
 
  return {
    title: t('First setup')
  };
}

export default async function Setup() {

  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value;

  return <FirstSetup jwt={jwt} />
}
