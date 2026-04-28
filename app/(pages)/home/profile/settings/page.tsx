import { getAccountSettings } from "@/app/actions";
import { SettingsPage } from "@/app/components/profile/settings/SettingsPage";
import { MetaDataTranslations } from "@/app/lib/utils";


export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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