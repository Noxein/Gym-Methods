'use client'
import { createContext, useEffect, useRef, useState } from "react";
import { ArcherContainerRef } from "react-archer";
import { BasicSummaryDataType, ExerciseSummaryType, Span, Status, SummaryDataFetched } from "../types";
import { getBasicSummaryData } from "../actions";
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

export const SummaryContextProvider = ({children}:{children: React.ReactNode}) => {
    const[selectedExercise,setSelectedExercise] = useState('Wyciskanie hantli na ławce płaskiej')
    const archRefs = useRef<ArcherContainerRef | null>(null)
    const[span,setSpan] = useState<Span>('year')
    const[data,setData] = useState<SummaryDataFetched[]>([])
    const[basicData,setBasicData] = useState<BasicSummaryDataType>({repeats:[],weight:[]})
    const[exerciseData,setExerciseData] = useState<ExerciseSummaryType>({data:[]})
    const[status,setStatus] = useState<Status>('loading')
    const[error,setError] = useState('')
    const[showSelectExercise,setShowSelectExercise] = useState(false)

    const changeSpan = (span: Span,initData: SummaryDataFetched[],exercisename?: string) => {
           
        
        const exerciseName =  exercisename ? exercisename : selectedExercise
        
        setSelectedExercise(exerciseName)
        setSpan(span)

        let newBasicData:BasicSummaryDataType = {repeats:[],weight:[]}
        let newExerciseData:ExerciseSummaryType = {data:[]}
        
        const amount = span === 'month' ? 30 : span === 'quarter' ? 90 : span === 'year' ? 365 : undefined
        
        const start = amount ? subDays(new Date(),amount) : new Date(1000,1,1)
        
        //const start = subDays(new Date(),30)

        for(let i = 0 ; i < initData.length ; i ++ ){
            const date = initData[i].date
            if(initData[i].date.getTime() < start.getTime()) continue
            let highestKG = initData[i].exercisename === exerciseName ? 0 : undefined
            let totalKG = 0
            let totalSeries = 0

            initData[i].sets.map(cb=>{
                if(typeof highestKG === 'number') cb.weight > highestKG ? highestKG = cb.weight : null
                totalKG = totalKG + cb.weight
                totalSeries = totalSeries + cb.repeat
            })

            const index = newBasicData.repeats.findIndex(cb=>format(cb.date,'yyyy-MM-dd') === format(date,'yyyy-MM-dd'))
            const exerciseIndex = newExerciseData.data.findIndex(cb=>isSameDay(cb.date,date))

            if(exerciseIndex>=0){
                if( highestKG && newExerciseData.data[exerciseIndex].value < highestKG) newExerciseData.data[exerciseIndex] = {date: date,value:highestKG}
            }else{
                if(typeof highestKG === 'number') newExerciseData.data.push({date: date,value:highestKG})
            }
        
            if(index>=0){
                newBasicData.repeats[index] = {date:date ,value:totalSeries + newBasicData.repeats[index].value}
                newBasicData.weight[index] = {date:date,value:totalKG + newBasicData.weight[index].value}
            }else{
                newBasicData.repeats.push({date:date,value:totalSeries})
                newBasicData.weight.push({date:date,value:totalKG})
            }

        }

        setBasicData(newBasicData)
        setExerciseData(newExerciseData)
    }
        // useEffect(()=>{
        //     archRefs.current?.refreshScreen();
        // },[selectedExercise])
        
    const getData = async () => {
        const data = await getBasicSummaryData()
        if(data.error){
            setStatus('error')
            return setError(data.error)
        }
        setData(data.data)
        setStatus('idle')
        changeSpan(span,data.data,selectedExercise)
    }

    useEffect(()=>{
        getData()
    },[])

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