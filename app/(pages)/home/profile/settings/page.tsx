import { getAccountSettings } from "@/app/actions";
import { SettingsPage } from "@/app/components/profile/settings/SettingsPage";
import { getLocale, getTranslations } from "next-intl/server";


export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Settings')
    };
  }

export default async function page(){
    const settings = await getAccountSettings()
    return (
        <SettingsPage settings={settings}/>
    )
} 