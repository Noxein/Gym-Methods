import { MyTraingPlansPage } from '@/app/components/profile/my-training-plans/trainingPlanName/MyTraingPlansPage'
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const locale = getLocale()
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('Edit training')
  };
}

export default async function page({params}:{params:{trainingPlanName:string}}){
  const trainingName = decodeURI(params.trainingPlanName)

return <MyTraingPlansPage trainingName={trainingName}/>
}
