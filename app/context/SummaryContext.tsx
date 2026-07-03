'use client'
import { createContext, useEffect, useRef, useState } from "react";
import { ArcherContainerRef } from "react-archer";
import { BasicSummaryDataType, ExerciseSummaryType, Span, Status, SummaryDataFetched } from "../types";
import { format, isSameDay, subDays } from "date-fns";

export const SummaryContext = createContext<SummaryContextType|null>(null)

type SummaryContextType = {
    selectedExercise: string; 
    setSelectedExercise: React.Dispatch<React.SetStateAction<string>>;
    archRefs: React.MutableRefObject<ArcherContainerRef | null>;
    basicData: BasicSummaryDataType,
    exerciseData: ExerciseSummaryType,
    status: Status,
    error: string,
    showSelectExercise: boolean,
    changeExercise: (exerciseName: string) => void,
    changeSpan: (span: Span, initData: SummaryDataFetched[], exercisename?: string) => void,
    setSpan: React.Dispatch<React.SetStateAction<Span>>,
    data: SummaryDataFetched[],
    setShowSelectExercise: React.Dispatch<React.SetStateAction<boolean>>;
    span: Span,
}

export const SummaryContextProvider = ({children,initialData,timeExercises}:{children: React.ReactNode, initialData: SummaryDataFetched[], timeExercises: string[]}) => {
    const[selectedExercise,setSelectedExercise] = useState('Wyciskanie hantli na ławce płaskiej')
    const archRefs = useRef<ArcherContainerRef | null>(null)
    const[span,setSpan] = useState<Span>('year')
    const[data,setData] = useState<SummaryDataFetched[]>(initialData)
    const[basicData,setBasicData] = useState<BasicSummaryDataType>({repeats:[],weight:[],time:[]})
    const[exerciseData,setExerciseData] = useState<ExerciseSummaryType>({data:[]})
    const[status,setStatus] = useState<Status>('loading')
    const[error,setError] = useState('')
    const[showSelectExercise,setShowSelectExercise] = useState(false)

    const changeSpan = (span: Span,initData: SummaryDataFetched[],exercisename?: string) => {
           
        
        const exerciseName =  exercisename ? exercisename : selectedExercise
        const normalizedExerciseName = exerciseName.trim().toLowerCase()
        const isTimeBasedSelectedExercise = timeExercises.some(
            (value) => value.trim().toLowerCase() === normalizedExerciseName
        )
        
        setSelectedExercise(exerciseName)
        setSpan(span)

        let newBasicData:BasicSummaryDataType = {repeats:[],weight:[],time:[]}
        let newExerciseData:ExerciseSummaryType = {data:[]}
        
        const amount = span === 'month' ? 30 : span === 'quarter' ? 90 : span === 'year' ? 365 : undefined
        
        const start = amount ? subDays(new Date(),amount) : new Date(1000,1,1)
        
        //const start = subDays(new Date(),30)

        for(let i = 0 ; i < initData.length ; i ++ ){
            const date = initData[i].date
            if(initData[i].date.getTime() < start.getTime()) continue
            const isSelectedExercise = initData[i].exercisename === exerciseName

            let highestKG = isSelectedExercise && !isTimeBasedSelectedExercise ? 0 : undefined
            let highestTime = isSelectedExercise && isTimeBasedSelectedExercise ? 0 : undefined
            let totalKG = 0
            let totalSeries = 0
            let totalTime = 0

            initData[i].sets.map(cb=>{
                if(typeof highestKG === 'number') cb.weight > highestKG ? highestKG = cb.weight : null
                if(typeof highestTime === 'number' && (cb.time ?? 0) > 0) cb.time! > highestTime ? highestTime = cb.time! : null
                totalKG = totalKG + cb.weight
                totalSeries = totalSeries + cb.repeat
                if(cb.time) totalTime = totalTime + cb.time
            })

            const index = newBasicData.repeats.findIndex(cb=>format(cb.date,'yyyy-MM-dd') === format(date,'yyyy-MM-dd'))
            const exerciseIndex = newExerciseData.data.findIndex(cb=>isSameDay(cb.date,date))

            if(exerciseIndex>=0){
                if( highestKG && newExerciseData.data[exerciseIndex].value < highestKG) newExerciseData.data[exerciseIndex] = {date: date,value:highestKG}
                if( highestTime && newExerciseData.data[exerciseIndex].value < highestTime) newExerciseData.data[exerciseIndex] = {date: date,value:highestTime}
            }else{
                if(typeof highestKG === 'number') newExerciseData.data.push({date: date,value:highestKG})
                if(typeof highestTime === 'number' && highestTime > 0) newExerciseData.data.push({date: date,value:highestTime})
            }
        
            if(index>=0){
                newBasicData.repeats[index] = {date:date ,value:totalSeries + newBasicData.repeats[index].value}
                newBasicData.weight[index] = {date:date,value:totalKG + newBasicData.weight[index].value}
                newBasicData.time[index] = {date:date,value:totalTime + newBasicData.time[index].value}
            }else{
                newBasicData.repeats.push({date:date,value:totalSeries})
                newBasicData.weight.push({date:date,value:totalKG})
                newBasicData.time.push({date:date,value:totalTime})
            }

        }

        setBasicData(newBasicData)
        setExerciseData(newExerciseData)
    }
        // useEffect(()=>{
        //     archRefs.current?.refreshScreen();
        // },[selectedExercise])
        
    useEffect(()=>{
        setData(initialData)
        setStatus('idle')
        changeSpan(span,initialData,selectedExercise)
    },[initialData])

    const changeExercise = (exerciseName:string) => {
        setShowSelectExercise(false)
        setSelectedExercise(exerciseName)

        changeSpan(span,data,exerciseName)
        archRefs.current?.refreshScreen()
    }
    return (
    <SummaryContext.Provider value={{
        selectedExercise,
        setSelectedExercise,
        archRefs,
        basicData,
        exerciseData,
        status,
        error,
        showSelectExercise,
        changeExercise,
        changeSpan,
        setSpan,
        data,
        setShowSelectExercise,
        span,
        }}>
        {children}
    </SummaryContext.Provider>
    )
}