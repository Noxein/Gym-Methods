import React, { useContext } from 'react'
import { ButtonWithIcon } from '../ui/ButtonWithIcon';
import { Icon } from '../Icon';
import { PlusIcon } from '@/app/ui/icons/ExpandIcon';
import { ActionTypes, AddExerciceReducerType, ProgressedIndexesType, Progression, ProgressionType, SholudAddWeightType } from '@/app/types';
import { useTranslations } from 'next-intl';
import { TimerContext } from '@/app/context/TimerContext';
import { SingleExerciseProgressionContext } from '@/app/context/SingleExerciseProgressionContext';
import { v4 } from 'uuid';
import { getProgressedSeriesIndexes } from '@/app/lib/utils';

type ButtonToAddSeriesExerciseTypes = {
    name: string,
    dispatch: (value: ActionTypes) => void,
    state: AddExerciceReducerType,
    isLoading: boolean,
    loading: boolean,
    goal?: Progression
}

export const ButtonToAddSeriesExercise = ({name,dispatch,state,isLoading,loading,goal}:ButtonToAddSeriesExerciseTypes) => {
    const t = useTranslations("Home/Add-Exercise/[Exercise-Name]")
    
    const timeContext = useContext(TimerContext)
    const progressionContext = useContext(SingleExerciseProgressionContext)
    const {seriesIndexesThatMetGoal, setSeriesIndexesThatMetGoal} = progressionContext!

    const { setFirstDate } = timeContext!
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
        localStorage.setItem(name+'singleExercise',JSON.stringify([...state.series,set]))

        let indexes:ProgressedIndexesType = getProgressedSeriesIndexes([...state.series,set],goal)
        setSeriesIndexesThatMetGoal(indexes)
        setFirstDate(new Date())
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
