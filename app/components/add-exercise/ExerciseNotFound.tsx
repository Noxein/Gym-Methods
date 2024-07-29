import React from 'react'
import { CenterComponent } from '../CenterComponent'
import { GoBackHomeComponent } from '../GoBackHomeComponent'

export const ExerciseNotFound = () => {
  return (
    <CenterComponent>
        <GoBackHomeComponent>
            <h1 className='text-2xl text-center'>Wygląda na to że nie mamy takiego ćwiczenia</h1>
        </GoBackHomeComponent>
    </CenterComponent>
  )
}
