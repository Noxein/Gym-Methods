'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { ExerciseList } from './ExerciseList'
import { ExerciseType, ExerciseTypes, UserExercise } from '@/app/types'
import { SelectedExerciseContext } from './SelectedExerciseContext'
import { Icon } from '../../Icon'
import { ExpandIcon2 } from '@/app/ui/icons/ExpandIcon'
import { SmallLoader } from '../../Loading/SmallLoader'
import { DisplayUserExercises } from './DisplayUserExercises'
import { fetchUserExercises } from '@/app/actions'
import { format } from 'date-fns'

type SearchComponentTypes = {
    exerciseList: (string | UserExercise)[],
    exercises: ExerciseTypes,
}

export const SearchComponent = ({exerciseList,exercises}:SearchComponentTypes) => {
    const [showSearch,setShowSearch] = useState(false)
    const [from,setFrom] = useState<Date>(new Date())
    const [to,setTo] = useState<Date>(new Date())

    const searchExercise = useContext(SelectedExerciseContext)
    const showExerciseList = searchExercise?.showExerciseList
    const selectedExercise = searchExercise?.exercise
    const setShowExerciseList = searchExercise?.setShowExerciseList

    const theme = useContext(ThemeContext)

    const [fetchedExercises,setFetchedExercises] = useState<ExerciseType[]>([])

    const[isLoadingExercises,setIsLoadingExercises] = useState(true)

    const handleShowExerciseList = () => {
        setShowExerciseList && setShowExerciseList(true)
    }
    const handleSearch = async () => {
        const result = await fetchUserExercises(from,to,selectedExercise)
        console.log(result)
        setFetchedExercises(result)
        setIsLoadingExercises(false)
    }
    const toggleSearchBar = () => {
        setShowSearch(!showSearch)
    }
  return (
<>
    <div className='text-white'>
        <div className={`fixed z-20 left-0 w-full ${showSearch?'top-5':'-top-[120px]'} transition-all bg-${theme?.colorPallete.primary}`}>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 mx-5'>
                    <div className='flex flex-col flex-1 relative'>
                        <Label htmlFor='from'>Od</Label>
                        <Input id='from' type='date' onChange={e=>setFrom(new Date(e.target.value))} />
                    </div>
                    <div className='flex flex-col flex-1 relative'>
                        <Label htmlFor='to'>Do</Label>
                        <Input id='to' type='date' onChange={e=>setTo(new Date(e.target.value))}/>
                    </div>
                </div>
                <div className='mx-5'>
                    <button className='w-full border-1 rounded-lg py-2' onClick={handleShowExerciseList}>{searchExercise?.exercise || 'Wszystkie ćwiczenia'}</button>
                </div>
            </div>
            <div className={`w-full flex justify-between px-5 bg-${theme?.colorPallete.accent} mt-5 gap-10`}>
                <button onClick={toggleSearchBar} className='flex-1'>
                    <Icon className='flex items-center'>
                        <ExpandIcon2 expanded={showSearch}/>
                    </Icon>
                </button>
                {
                    showSearch?
                    <button className={`text-${theme?.colorPallete.primary} font-semibold pl-10 text-right`} onClick={handleSearch}>
                        Szukaj
                    </button>:
                    <div className={`flex flex-col text-${theme?.colorPallete.primary}`}>
                        <span>
                            {format(from,'dd.MM.yyyy')} - {format(to,'dd.MM.yyyy')}
                        </span>
                        <span className='text-right font-semibold text-xl'>
                            {selectedExercise}
                        </span>

                    </div>
                }

            </div>
        </div>

        {isLoadingExercises?
        <SmallLoader sClassParent='h-screen flex items-center'/>:
        <DisplayUserExercises fetchedExercises={fetchedExercises} manyExercises={selectedExercise===''}/>
        }
    </div>
    {showExerciseList && 
        <ExerciseList exerciseList={exerciseList} exercises={exercises}/>
    }
</>
  )
}


type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {

    const theme = useContext(ThemeContext)
    return(
        <input  className={` w-full text-${theme?.colorPallete.accent} border-white bg-${theme?.colorPallete.primary} border-[1px] min-h-10 text-lg rounded-lg pl-4 pr-2 focus:outline-blue-500`} {...rest} />
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-${theme?.colorPallete.accent} font-light absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary} px-2 ${sClass}`} {...rest}></label>
    )
}