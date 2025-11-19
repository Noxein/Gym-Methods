import React, { useContext } from 'react'
import { ButtonWithIcon } from '../ui/ButtonWithIcon';
import { Icon } from '../Icon';
import { PlusIcon } from '@/app/ui/icons/ExpandIcon';
import { ActionTypes, AddExerciceReducerType, ProgressedIndexesType, Progression, ProgressionType, SholudAddWeightType, SingleExerciseLocalMemoryData } from '@/app/types';
import { useTranslations } from 'next-intl';
import { TimerContext } from '@/app/context/TimerContext';
import { SingleExerciseProgressionContext } from '@/app/context/SingleExerciseProgressionContext';
import { v4 } from 'uuid';
import { getProgressedSeriesIndexes } from '@/app/lib/utils';
import { ExerciseDataContext } from '@/app/context/ExerciseDataContext';

type ButtonToAddSeriesExerciseTypes = {
    dispatch: (value: ActionTypes) => void,
    state: AddExerciceReducerType,
    isLoading: boolean,
    loading: boolean,
}

export const ButtonToAddSeriesExercise = ({dispatch,state,isLoading,loading}:ButtonToAddSeriesExerciseTypes) => {
    const t = useTranslations("Home/Add-Exercise/[Exercise-Name]")
    
    const timeContext = useContext(TimerContext)
    const progressionContext = useContext(SingleExerciseProgressionContext)
    const {seriesIndexesThatMetGoal, setSeriesIndexesThatMetGoal} = progressionContext!
    const { exerciseData, progressions } = useContext(ExerciseDataContext)!

    const { newDateSetter, setTimePassed } = timeContext!
        const AddSeries = () => {
            
        const id = v4()
        dispatch({type:'ADDSERIES',payload:id})
        
        const set = {
            weight: state.weight,
            repeat: state.repeat,
            time: state.time,
            side: state.side,
            difficulty: state.difficultyLevel,
            id: id
        }
        const data = localStorage.getItem(name+'singleExerciseChanged')
        let dataParsed = data ? JSON.parse(data) as SingleExerciseLocalMemoryData : null

        if(dataParsed){
            dataParsed.series = [...dataParsed.series,set]
            localStorage.setItem(name+'singleExerciseChanged',JSON.stringify(dataParsed))
        }

        
        const progression = progressions[exerciseData.name]

        let indexes:ProgressedIndexesType = getProgressedSeriesIndexes([...state.series,set],progression)
        setSeriesIndexesThatMetGoal(indexes)
        newDateSetter(new Date(), exerciseData.name)
        setTimePassed(0)
    }

  return (
    <ButtonWithIcon onClick={e=>{e.preventDefault();AddSeries()}} className={`text-xl rounded-md py-4 flex items-center justify-between px-5 `} isPrimary disabled={isLoading || loading}
        buttonText={t('AddSeries')}
        childrenIcon={
            <Icon className='bg-opacity-0 flex'>
            <PlusIcon /> 
        </Icon>
        }
        >

    </ButtonWithIcon>
  )
}
