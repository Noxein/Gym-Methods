import { Profile } from "@/app/components/profile/Profile";
import { auth } from "@/auth";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
  
export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Profile')
    };
}
export default async function page() {
    const email = (await auth())!.user?.email!
    return(
        <Profile email={email}/>
    )
}