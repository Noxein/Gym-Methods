import { MyTraingPlansPage } from '@/app/components/profile/my-training-plans/trainingPlanName/MyTraingPlansPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Edytuj trening",
};

export default async function page({params}:{params:{trainingPlanName:string}}){
  const trainingName = decodeURI(params.trainingPlanName)

return <MyTraingPlansPage trainingName={trainingName}/>
}
