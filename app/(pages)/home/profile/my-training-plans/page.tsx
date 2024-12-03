import { GetUserTrainings } from "@/app/actions"
import { MyTrainingPlans } from "@/app/components/profile/my-training-plans/MyTrainingPlans"
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('My training')
    };
  }

export default async function page({searchParams}:{searchParams:{showAddModal:string}}){
        const UserTrainings = await GetUserTrainings()
        const showModal = !!(searchParams && searchParams.showAddModal || false)
    return (
        <MyTrainingPlans UserTrainings={UserTrainings} showAddModalUrl={showModal}/>
    )
} 