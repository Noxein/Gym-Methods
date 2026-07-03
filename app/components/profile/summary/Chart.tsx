'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
} from 'recharts'

type ChartProps = {
    name: string
    data: {
        date: Date
        value: number
    }[]
    archRef: React.MutableRefObject<any>
    chartType?: 'line' | 'area' | 'composed'
}

export const Chart = ({ name, data, archRef, chartType = 'area' }: ChartProps) => {
    const [selectedDataPoint, setSelectedDataPoint] = useState<number | null>(null)
    const t = useTranslations('Summary')

    if (!data || !Array.isArray(data) || data.length < 2) {
        return (
            <div className='h-64 bg-darkLight text-gray-400 text-lg flex justify-center items-center rounded-lg border border-white/10'>
                {t('NotEnoughtData')}
            </div>
        )
    }

    const sortedData = data
        .sort((x, y) => x.date.getTime() - y.date.getTime())
        .map((item) => ({
            ...item,
            formattedDate: format(item.date, 'MMM dd'),
            fullDate: format(item.date, 'yyyy-MM-dd'),
        }))

    // Calculate average to filter outliers
    const initialAvg = sortedData.reduce((sum, x) => sum + x.value, 0) / sortedData.length
    
    // Filter out outliers (values > 3x average or < average/3)
    const filteredData = sortedData.filter(item => 
        item.value <= initialAvg * 3 && item.value >= initialAvg / 3
    )

    // If all data is filtered, show original data
    const chartData = filteredData.length > 0 ? filteredData : sortedData

    const maxValue = Math.max(...chartData.map((x) => x.value))
    const minValue = Math.min(...chartData.map((x) => x.value))
    const avgValue = chartData.reduce((sum, x) => sum + x.value, 0) / chartData.length

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-dark border border-green/50 rounded p-2'>
                    <p className='text-white text-sm font-semibold'>{payload[0].value.toFixed(2)}</p>
                    <p className='text-gray-400 text-xs'>{payload[0].payload.fullDate}</p>
                </div>
            )
        }
        return null
    }

    return (
        <div className='gap-4 text-white border-b border-white/10 pb-6 mb-6'>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold'>{name}</h3>
                <div className='flex gap-6 text-sm'>
                    <div>
                        <span className='text-gray-400'>Max: </span>
                        <span className='text-green font-semibold'>{maxValue.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className='text-gray-400'>Avg: </span>
                        <span className='text-blue-400 font-semibold'>{avgValue.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className='text-gray-400'>Min: </span>
                        <span className='text-orange-400 font-semibold'>{minValue.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width='100%' height={300}>
                {chartType === 'area' ? (
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${name}`} x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='5%' stopColor='#3C9F65' stopOpacity={0.3} />
                                <stop offset='95%' stopColor='#3C9F65' stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis 
                            dataKey='formattedDate' 
                            stroke='#9CA3AF'
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis stroke='#9CA3AF' style={{ fontSize: '12px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                        <Area
                            type='monotone'
                            dataKey='value'
                            stroke='#3C9F65'
                            strokeWidth={2}
                            fill={`url(#gradient-${name})`}
                            dot={{ fill: '#3C9F65', r: 4 }}
                            activeDot={{ r: 6, fill: '#10B981' }}
                            name={name}
                        />
                    </AreaChart>
                ) : chartType === 'line' ? (
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis 
                            dataKey='formattedDate' 
                            stroke='#9CA3AF'
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis stroke='#9CA3AF' style={{ fontSize: '12px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                        <Line
                            type='monotone'
                            dataKey='value'
                            stroke='#3C9F65'
                            strokeWidth={3}
                            dot={{ fill: '#3C9F65', r: 4 }}
                            activeDot={{ r: 6, fill: '#10B981' }}
                            name={name}
                        />
                    </LineChart>
                ) : (
                    <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis 
                            dataKey='formattedDate' 
                            stroke='#9CA3AF'
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis stroke='#9CA3AF' style={{ fontSize: '12px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                        <Line
                            type='monotone'
                            dataKey='value'
                            stroke='#3C9F65'
                            strokeWidth={2}
                            dot={{ fill: '#3C9F65', r: 3 }}
                        />
                    </ComposedChart>
                )}
            </ResponsiveContainer>
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