'use client'
import React, { useContext } from 'react'
import { Chart } from './Chart'
import { Button } from '../../ui/Button'
import { ExercisesThatRequireTimeMesureOrHandle, ExerciseTypes, UserExercise } from '@/app/types'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { MapExercises } from '@/app/components/ui/MapExercises'
import { SummaryContext } from '@/app/context/SummaryContext'
import { HideShowHTMLScrollbar, nameTrimmer, resolveExerciseName } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'
import { exercisesArr } from '@/app/lib/exercise-list'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

type ChartsTypes = {
    allExercisesInOneArray: (UserExercise | string)[]
    timeOrHandleExercises: {
        ExercisesThatRequireTimeMesure: ExercisesThatRequireTimeMesureOrHandle[]
        ExercisesThatRequireHandle: ExercisesThatRequireTimeMesureOrHandle[]
    }
    allExercisesObject: ExerciseTypes
}

export const Charts = ({
    allExercisesInOneArray,
    timeOrHandleExercises,
    allExercisesObject,
}: ChartsTypes) => {
    const returning = useContext(SummaryContext)
    const {
        selectedExercise,
        setSelectedExercise,
        archRefs,
        basicData,
        changeExercise,
        changeSpan,
        data,
        error,
        exerciseData,
        setSpan,
        span,
        showSelectExercise,
        status,
        setShowSelectExercise,
    } = returning!
    const d = useTranslations('DefaultExercises')
    const t = useTranslations('Summary')

    // First resolve UUID to exercise name if needed
    const resolvedExerciseName = resolveExerciseName(selectedExercise, allExercisesObject)
    
    // Then translate if it's a known exercise
    const selectedExerciseTranslated = exercisesArr.includes(resolvedExerciseName)
        ? d(nameTrimmer(resolvedExerciseName))
        : resolvedExerciseName

    // Check if selected exercise requires time measurement (use resolved name for comparison)
    const isTimeBasedExercise = timeOrHandleExercises.ExercisesThatRequireTimeMesure.some(
        (ex) => ex.exercisename === resolvedExerciseName
    )

    if (error) return <ErrorDiv error={error} />

    if (status === 'loading') return <SmallLoaderDiv loading={status === 'loading'} />

    return (
        <div className='relative'>
            <div className='flex gap-2 overflow-x-auto py-3 sticky top-0 z-50 bg-dark border-b border-white/10 px-2'>
                <CustomButton
                    isSelected={span === 'month'}
                    text={t('Month')}
                    onClick={() => changeSpan('month', data, selectedExercise)}
                />
                <CustomButton
                    isSelected={span === 'quarter'}
                    text={t('Quarter')}
                    onClick={() => changeSpan('quarter', data, selectedExercise)}
                />
                <CustomButton
                    isSelected={span === 'year'}
                    text={t('Year')}
                    onClick={() => changeSpan('year', data, selectedExercise)}
                />
                <CustomButton
                    isSelected={span === 'beggining'}
                    text={t('Beginning')}
                    onClick={() => changeSpan('beggining', data, selectedExercise)}
                />
            </div>

            <div className='mt-8 space-y-8'>
                <Chart
                    name={isTimeBasedExercise ? `${selectedExerciseTranslated} (${t('Time')})` : selectedExerciseTranslated}
                    data={exerciseData.data}
                    archRef={archRefs}
                    chartType='area'
                />

                <Button
                    onClick={() => {
                        setShowSelectExercise(true)
                        HideShowHTMLScrollbar('hide')
                    }}
                    className='w-full py-3 font-semibold'
                >
                    {t('SelectExercise')}
                </Button>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <Chart
                        name={t('Repeats')}
                        data={basicData?.repeats}
                        archRef={archRefs}
                        chartType='line'
                    />

                    <Chart
                        name={t('Weight')}
                        data={basicData?.weight}
                        archRef={archRefs}
                        chartType='line'
                    />
                </div>
            </div>

            {showSelectExercise && (
                <MapExercises
                    handleClose={() => {
                        setShowSelectExercise(false)
                        HideShowHTMLScrollbar('show')
                    }}
                    allExercisesInOneArray={allExercisesInOneArray}
                    exercisesObject={allExercisesObject}
                    handleSelect={(name) => {
                        changeExercise(name)
                        HideShowHTMLScrollbar('show')
                    }}
                />
            )}
        </div>
    )
}

interface CustomButtonTypes
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    text: string
    isSelected: boolean
}

const CustomButton = ({ text, isSelected, ...rest }: CustomButtonTypes) => {
    return (
        <Button
            className={`${
                isSelected
                    ? 'border-green/50 border text-green bg-dark hover:bg-darkLight'
                    : 'border-gray-600 border text-gray-400 bg-dark hover:bg-darkLight'
            } px-6 py-2 whitespace-nowrap font-semibold transition-colors`}
            {...rest}
        >
            {text}
        </Button>
    )
}