import { MyTraingPlansPage } from '@/app/components/profile/my-training-plans/trainingPlanName/MyTraingPlansPage'
import { MetaDataTranslations } from '@/app/lib/utils';

export async function generateMetadata() {
  const t = await MetaDataTranslations()
 
  return {
    title: t('Edit training')
  };
}

export default async function page(props:{params: Promise<{trainingPlanName:string}>}) {
  const params = await props.params;
  const trainingName = decodeURIComponent(params.trainingPlanName)

  return <MyTraingPlansPage trainingName={trainingName}/>
}
