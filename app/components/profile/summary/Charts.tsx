'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Chart } from './Chart'
import { Button } from '../../ui/Button'
import { BasicSummaryDataType, ExercisesThatRequireTimeMesureOrHandle, ExerciseSummaryType, ExerciseTypes, Span, Status, SummaryDataFetched, UserExercise } from '@/app/types'
import { getBasicSummaryData, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { format, isSameDay, subDays } from 'date-fns'
import { MapExercises } from '@/app/components/ui/MapExercises'
import { SmallLoader } from '../../Loading/SmallLoader'
import { ArcherContainerRef } from 'react-archer'
import { SummaryContext } from '@/app/context/SummaryContext'
import { HideShowHTMLScrollbar, nameTrimmer } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'
import { exercisesArr } from '@/app/lib/exercise-list'

type ChartsTypes = {
    allExercisesInOneArray: (UserExercise | string)[],
    timeOrHandleExercises: {
        ExercisesThatRequireTimeMesure: ExercisesThatRequireTimeMesureOrHandle[];
        ExercisesThatRequireHandle: ExercisesThatRequireTimeMesureOrHandle[];
    },
    allExercisesObject: ExerciseTypes
}

export const Charts = ({allExercisesInOneArray,timeOrHandleExercises,allExercisesObject}:ChartsTypes) => {

    const returning = useContext(SummaryContext)
    const {selectedExercise, setSelectedExercise, archRefs, basicData, changeExercise, changeSpan, data, error, exerciseData, setSpan, span, showSelectExercise, status, setShowSelectExercise} = returning!
    const d = useTranslations('DefaultExercises')
    const t = useTranslations('Summary')

    const selectedExerciseTranslated = exercisesArr.includes(selectedExercise) ? d(nameTrimmer(selectedExercise)) : selectedExercise

    if(error) return <ErrorDiv error={error}/>

    if(status === 'loading') return <SmallLoader />
  return (
    <div className='relative'>
        <div className='flex gap-2 overflow-hidden overflow-x-scroll py-2 sticky top-0 z-50 bg-dark'>
            <CustomButton isSelected={span==='month'} text={t('Month')} onClick={()=>changeSpan('month',data,selectedExercise)}/>
            <CustomButton isSelected={span==='quarter'} text={t('Quarter')} onClick={()=>changeSpan('quarter',data,selectedExercise)}/>
            <CustomButton isSelected={span==='year'} text={t('Year')} onClick={()=>changeSpan('year',data,selectedExercise)}/>
            <CustomButton isSelected={span==='beggining'} text={t('Beginning')} onClick={()=>changeSpan('beggining',data,selectedExercise)}/>
        </div>

    <Chart 
        name={selectedExerciseTranslated}
        data={exerciseData.data}
        archRef={archRefs}
        />
    <Button onClick={()=>{setShowSelectExercise(true);HideShowHTMLScrollbar('hide')}} className='w-full mt-2'>{t("SelectExercise")}</Button>

    <Chart 
        name={t("Repeats")}
        data={basicData?.repeats}
        archRef={archRefs}
        />

    <Chart 
        name={t("Weight")}
        data={basicData?.weight}
        archRef={archRefs}
        />


    
    {showSelectExercise && <MapExercises handleClose={()=>{setShowSelectExercise(false);HideShowHTMLScrollbar('show')}} allExercisesInOneArray={allExercisesInOneArray} exercisesObject={allExercisesObject} handleSelect={(name)=>{changeExercise(name);HideShowHTMLScrollbar('show')}}/>}
    </div>
  )
}

interface customButtonTypes extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string,
    isSelected: boolean
}

const CustomButton = ({text,isSelected,...rest}:customButtonTypes) => {
    return(
        <Button className={`${isSelected?'border-green border-1 text-green':'border-notSelected border-1 text-notSelected py-0'} px-12 py-2 bg-dark`} {...rest}>{text}</Button>
    )
}