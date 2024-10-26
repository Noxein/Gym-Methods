import { Last30DaysExercises } from '@/app/actions'
import React from 'react'
import { MapDays } from './MapDays'

export const WidgetDataProvider = async () => {
    const data = await Last30DaysExercises()
  return (
    <MapDays Last30DaysExercises={data} />
  )
}
