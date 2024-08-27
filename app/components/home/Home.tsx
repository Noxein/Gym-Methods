import { AddExerciseButton } from './AddExerciseButton'
import { IncomingTrainings } from './IncomingTrainings'
import { LatestTrainings } from './LatestTrainings'
import { MapDays } from './MapDays'

export const Home = () => {

  return (
    <div>
        <MapDays />
        <IncomingTrainings />
        <LatestTrainings />
        <AddExerciseButton />
    </div>
  )
}
