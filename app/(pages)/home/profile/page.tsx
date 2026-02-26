import { Profile } from "@/app/components/profile/Profile";
import { MetaDataTranslations } from "@/app/lib/utils";
import { auth } from "@/auth";
  
export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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