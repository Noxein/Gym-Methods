import { getAccountSettings } from "@/app/actions";
import { SettingsPage } from "@/app/components/profile/settings/SettingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ustawienia",
};

export default async function page(){
    const settings = await getAccountSettings()
    return (
        <SettingsPage settings={settings}/>
    )
}