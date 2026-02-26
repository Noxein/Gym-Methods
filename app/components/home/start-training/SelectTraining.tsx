import { getAllUserLongTermPlans, getStartedTrainingsList, GetUserTrainings } from '@/app/actions'
import BasicTrainings from './BasicTrainings'
import AdvancedTrainings from './AdvancedTrainings'
import LatestTrainingsWrapper from './LatestTrainingsWrapper'

export const SelectTraining = async () => {

  const LongTermTrainingList = await getAllUserLongTermPlans()
  const trainingList = await getStartedTrainingsList()

  const basicPlans = await GetUserTrainings()

  return (
    <div className='flex flex-col min-h-[calc(100dvh-40px)] pt-10'>

      {basicPlans.length > 0 && <BasicTrainings basicPlans={basicPlans} />}

      {LongTermTrainingList.length > 0 && <AdvancedTrainings LongTermTrainingList={LongTermTrainingList} trainingList={trainingList}/>}

      <LatestTrainingsWrapper trainingList={trainingList}/>

    </div>
  )
}
