import { getAccountSettings } from "@/app/actions";
import { SettingsPage } from "@/app/components/profile/settings/SettingsPage";

export default async function page(){
    const settings = await getAccountSettings()
    return (
        <SettingsPage settings={settings}/>
    )
}