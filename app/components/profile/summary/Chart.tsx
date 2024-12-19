'use client'
import { differenceInCalendarDays, format } from 'date-fns'
import React, { LegacyRef, useRef, useState } from 'react'
import { MinMaxChart } from './MinMaxChart'
import { ArcherContainer, ArcherContainerRef, ArcherElement } from 'react-archer'
import { useTranslations } from 'next-intl'

type ChartProps = {
    name: string
    data:{
        date: Date,
        value: number,
    }[],
    archRef: React.MutableRefObject<ArcherContainerRef | null>,
}
export const Chart = ({name,data,archRef}:ChartProps) => {
    const[selectedId,setSlectedId] = useState<undefined|number>()
    const t = useTranslations("Summary")

    if(data.length<2){
        return(
            <div className='h-64 bg-darkLight text-marmur text-2xl flex justify-center items-center'>
                {t("NotEnoughtData")}
            </div>
        )
    }
    const sortedData = data.sort((x,y)=>{if(x.date.getTime() > y.date.getTime()) return 1; return -1})
    const max = differenceInCalendarDays(sortedData[data.length-1].date,sortedData[0].date) 
    const maxValue = Math.max(...data.map(x=>x.value))

  return (
    <div className='gap-4 text-white border-darkLight border-b-2 pb-2 mb-2 '>
       <b>{name}</b>

        <div className='flex h-64 w-full'>
        <MinMaxChart max={maxValue} min={0}/>
            <ArcherContainer lineStyle={'straight'} className='relative h-full bg-darkLight flex-1' svgContainerStyle={{zIndex:20}} ref={archRef} key={'ghurt'}>
                <div className='absolute w-full top-1/2 h-[1px] bg-gray-800 z-10'></div>
                <div className='absolute w-full top-1/4 h-[1px] bg-gray-800 z-10'></div>
                <div className='absolute w-full top-3/4 h-[1px] bg-gray-800 z-10'></div>

                {sortedData.map((dataItem,index)=>{

                    const left = max === 0 ? 2 : differenceInCalendarDays(data[index].date,data[0].date) === max ? 98 : (differenceInCalendarDays(data[index].date,data[0].date) / max) * 100
                    const bottom = dataItem.value === 0 ? 1 : dataItem.value === maxValue ? 95 : (dataItem.value / maxValue) * 100
                    return(
                    
                        <ArcherElement
                        key={index}
                        id={String(index)+name}
                        relations={[
                            {
                                targetId: index === data.length-1 ? String(index)+name : String(index+1)+name,
                                hitSlop: data.length-1,
                                sourceAnchor: 'middle',
                                targetAnchor: 'middle',
                                style: { strokeWidth: 2, strokeColor: "#d9d9d9", startMarker: false, endMarker: false  },
                            }
                        ]}
                        >
                            <div style={{left:left + '%',bottom:bottom + '%'}} className={`absolute w-2 h-2 rounded-full z-30 border-white border-1 ${index === selectedId ? 'bg-green' : 'bg-darkLight'}`} onClick={()=>setSlectedId(index)}>
                            </div>
                        </ArcherElement>

                    
                )})}

            </ArcherContainer>
        </div>
        <div className='flex justify-between ml-8 mt-2 text-gray-400'>
            <div>{format(data[0].date,'yyyy-MM-dd')}</div>
            <div>{format(data[data.length-1].date,'yyyy-MM-dd')}</div>
        </div>
        {(selectedId === 0 || selectedId) && !(selectedId > data.length - 1) && 
            <div className='flex justify-center gap-4'>
                <span>{data[selectedId].value} </span>
                <span>{format(data[selectedId].date,'yyyy.MM.dd')}</span>
            </div>}
    </div>
  )
}

type ElementToHoverTypes = {
    left: number,
    bottom: number,
    value: number,
    name:string,
}

const ElementToHover = ({left,bottom,value,name}:ElementToHoverTypes) => {
    const[isHovered,setIsHovered] = useState(false)

    return (
    <div style={{left:left + '%',bottom:bottom + '%'}} className='absolute w-4 h-4 rounded-full border-white border-1' onMouseOver={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        {isHovered && <div>
                {value}
            </div>}
    </div>
    )
}