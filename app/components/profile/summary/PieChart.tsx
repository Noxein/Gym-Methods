'use client'
import { SummaryContext } from '@/app/context/SummaryContext';
import { exercisesArr } from '@/app/lib/exercise-list';
import { nameTrimmer } from '@/app/lib/utils';
import { useTranslations } from 'next-intl';
import React, { useContext } from 'react'
import { PieChart as PC } from 'react-minimal-pie-chart';

type PieChartTypes = {
    data: { exercisename: string, number: number}[]
}
export const PieChart = ({data}:PieChartTypes) => {
    const preparedData:{color: string, value: number, title: string, key?: string}[] = []
    const colors = ['#3C9F65','#F7A278','#A288A6','#0E4749','#EFF6EE']
    data.sort((x,y)=>{
        if(x.number === y.number) return 1
        if(x.number<y.number){
         return 1
        }else{
            return -1
        }}).map((x,i)=>{
        preparedData.push({color:colors[i],title:x.exercisename,value:x.number, key:x.exercisename})
    })

    const returning = useContext(SummaryContext)
    const { changeSpan, span, data: allData } = returning!
    const d = useTranslations('DefaultExercises')
    const t = useTranslations('Summary')
  return (<>
    <h1 className='text-white text-2xl text-center mt-5'>{t('FavouriteExercies')}</h1>
    <div className='flex gap-6 justify-center mt-10'>
        
        <PC 
        animate={true}
        label={({dataEntry})=>Math.round(dataEntry.percentage) + '%'}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        labelStyle={{
            fontSize: '8px'
        }}
        data={preparedData}
        onClick={(e,i)=>changeSpan(span,allData,preparedData[i].title)}
        className='flex-1 self-center'
        />

        <ul className='ul flex-1'>
            {preparedData.map((x,i)=>{
                const translatedName = exercisesArr.includes(x.title) ? d(nameTrimmer(x.title)) : x.title
            return (
                <li style={{color:colors[i]}} key={x.title} onClick={()=>{changeSpan(span,allData,x.title)}}> {translatedName} </li>
            )})}
        </ul>
    </div>
    </>)
}
