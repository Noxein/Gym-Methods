'use client'
import { SummaryContext } from '@/app/context/SummaryContext'
import { exercisesArr } from '@/app/lib/exercise-list'
import { nameTrimmer, resolveExerciseName } from '@/app/lib/utils'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React, { useContext, useState } from 'react'
import { ExerciseTypes } from '@/app/types'
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

type PieChartTypes = {
    data: { exercisename: string; number: number }[]
    showAddExerciseLink?: boolean
    allExercisesObject?: ExerciseTypes
}

export const PieChart = ({ data, showAddExerciseLink = true, allExercisesObject }: PieChartTypes) => {
    const t = useTranslations('Summary')
    const [hoveredExercise, setHoveredExercise] = useState<string | null>(null)
    const d = useTranslations('DefaultExercises')

    if (!data || data.length === 0) {
        return (
            <div className='text-center mt-6 text-white mb-10'>
                <h1 className='text-2xl font-semibold'>{t('FavouriteExercies')}</h1>
                <p className='mt-4 text-gray-400'>{t('NotEnoughtData')}</p>
                {showAddExerciseLink && (
                    <Link href='/home/add-exercise' className='inline-block mt-3 text-green hover:underline'>
                        {t('AddExerciseLink')}
                    </Link>
                )}
            </div>
        )
    }

    const colors = ['#3C9F65', '#F7A278', '#A288A6', '#0E4749', '#EFF6EE', '#FF6B6B', '#4ECDC4']
    const sortedData = data
        .sort((x, y) => y.number - x.number)
        .map((item, index) => ({
            ...item,
            displayName: resolveExerciseName(item.exercisename, allExercisesObject),
            fill: colors[index % colors.length],
        }))

    const returning = useContext(SummaryContext)
    const { changeSpan, span, data: allData } = returning!

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const displayName = resolveExerciseName(payload[0].payload.exercisename, allExercisesObject)
            return (
                <div className='bg-dark border border-green/50 rounded p-2'>
                    <p className='text-white text-sm font-semibold'>{displayName}</p>
                    <p className='text-green text-sm'>{payload[0].value} sessions</p>
                    <p className='text-gray-400 text-xs'>
                        {((payload[0].value / sortedData.reduce((sum, item) => sum + item.number, 0)) * 100).toFixed(1)}%
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <>
            <h1 className='text-white text-2xl text-center mt-5 font-semibold'>{t('FavouriteExercies')}</h1>
            <div className='flex gap-8 justify-center mt-10 flex-wrap lg:flex-nowrap'>
                <div className='flex-1 min-w-0'>
                    <ResponsiveContainer width='100%' height={300}>
                        <RechartsPieChart>
                            <Pie
                                data={sortedData}
                                cx='50%'
                                cy='50%'
                                labelLine={false}
                                label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : '0%'}
                                outerRadius={80}
                                fill='#8884d8'
                                dataKey='number'
                                onClick={(entry: any) => changeSpan(span, allData, entry.payload?.exercisename || entry.exercisename)}
                                style={{ cursor: 'pointer' }}
                            >
                                {sortedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.fill}
                                        opacity={hoveredExercise === null || hoveredExercise === entry.exercisename ? 1 : 0.5}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </div>

                <ul className='flex-1 space-y-2'>
                    {sortedData.map((item, index) => {
                        const translatedName = exercisesArr.includes(item.displayName)
                            ? d(nameTrimmer(item.displayName))
                            : item.displayName
                        const percentage = ((item.number / sortedData.reduce((sum, x) => sum + x.number, 0)) * 100).toFixed(1)

                        return (
                            <li
                                key={item.exercisename}
                                onClick={() => changeSpan(span, allData, item.exercisename)}
                                onMouseEnter={() => setHoveredExercise(item.exercisename)}
                                onMouseLeave={() => setHoveredExercise(null)}
                                className='p-3 rounded-lg border border-white/10 bg-darkLight cursor-pointer transition-all hover:border-green/50 hover:bg-dark'
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div
                                            className='w-3 h-3 rounded-full'
                                            style={{ backgroundColor: item.fill }}
                                        ></div>
                                        <span className='text-white font-semibold'>{translatedName}</span>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-green text-sm font-semibold'>{item.number}</p>
                                        <p className='text-gray-400 text-xs'>{percentage}%</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
