import { userTrainingsList } from '@/app/actions'
import { TrainingList } from './TrainingList'
import { Icon } from '../../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { LastTrainings } from './LastTrainings'
import Link from 'next/link'

export const SelectTraining = async () => {
    const trainingList = await userTrainingsList()
    const filteredList = trainingList.filter(x=>Object.keys(x.exercises).length>0)
  return (
    <div className='flex flex-col min-h-[calc(100dvh-40px)]'>
        <h1 className='text-2xl text-center mt-10'>ROZPOCZNIJ TRENING</h1>

        <button className='bg-green mx-5 mt-5 px-4 py-3 rounded-lg'>
          <Link href={`/home/profile/my-training-plans`} className='flex justify-between'>
            <span>Dodaj nowy trening</span>
            <Icon className='bg-opacity-0'>
              <PlusIcon />
            </Icon>
          </Link>
        </button>

        <TrainingList list={filteredList}/>

        <div className='mt-auto mb-16'>
          <h2 className='text-center text-xl'>OSTATNIE TRENINGI</h2>

          <LastTrainings />
          
        </div>
    </div>
  )
}
