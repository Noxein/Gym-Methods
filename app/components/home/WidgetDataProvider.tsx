import { GetProgressionsAndDeclines, Last30DaysExercises } from '@/app/actions'
import { MapDays } from './MapDays'

export const WidgetDataProvider = async () => {
    //const data = await Last30DaysExercises()
    const data = await GetProgressionsAndDeclines()
  return (
    <MapDays 
      //Last30DaysExercises={data} 
      data={data && data.obj}
      bestExercise={data && data.bestExercise}
      worstExercise={data && data.worstExercise}
    />
  )
}
