'use client'
import { BigTrainingData, EditedLongTermTraining, ExercisesThatRequireTimeMesureOrHandle } from "@/app/types";
import { createContext, MutableRefObject, useEffect, useRef, useState } from "react";
import { getAllHandleTypes, getPlanData, getUserLongTrainigs, userExercisesThatRequireHandlesOrTimeMesure } from "../actions";
import { useParams } from "next/navigation";
import { localStorageSetter } from "../lib/utils";

export const LongPlanEditorContext = createContext<LongPlanEditorContextTypes|null>(null)

type LongPlanEditorContextTypes = {
    planData: BigTrainingData | null,
    setPlanData: React.Dispatch<React.SetStateAction<BigTrainingData | null>>

    planIndexRef: React.MutableRefObject<number>,
    exerciseIndexRef: React.MutableRefObject<number>,

    showCloneTraingModal: boolean,
    setShowCloneTraingModal: React.Dispatch<React.SetStateAction<boolean>>,
    showDeleteExercisePopUp: boolean,
    setShowDeleteExercisePopUp: React.Dispatch<React.SetStateAction<boolean>>,
    showDeleteTrainigPopUp: boolean,
    setShowDeleteTrainigPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    showImportTrainingModal: boolean,
    setShowImportTrainingModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleAndTimeMesureExercises: {    
        ExercisesThatRequireTimeMesure: ExercisesThatRequireTimeMesureOrHandle[],
        ExercisesThatRequireHandle: ExercisesThatRequireTimeMesureOrHandle[]
    } | null,
    handles: {id: string;handlename: string;}[] | null,
    showAddExercise: boolean,
    setShowAddExercise: React.Dispatch<React.SetStateAction<boolean>>,
    state: 'loading'|'idle'|'error'|'succes'|'uploading',
    setState: React.Dispatch<React.SetStateAction<'loading'|'idle'|'error'|'succes'|'uploading'>>,
    updateToLocalStorage: (obj:BigTrainingData) => void,
    errorMessage:string,
    userTrainings: MutableRefObject<{
        id: string;
        name: string;
    }[]>,
    clonePlan: (planName: string) => Promise<void>
}

type ModalContextsProviderTypes = {
    children: React.ReactNode
}

export const LongPlanEditorProvider = ({children}:ModalContextsProviderTypes) => {
    const params = useParams()
    const[showDeleteExercisePopUp,setShowDeleteExercisePopUp] = useState(false)
    const[showDeleteTrainigPopUp,setShowDeleteTrainigPopUp] = useState(false)
    const[showImportTrainingModal,setShowImportTrainingModal] = useState(false)
    const[showCloneTraingModal,setShowCloneTraingModal] = useState(false)
    const userTrainings = useRef<{id:string, name: string}[]>([])
    const planIndexRef = useRef(0)
    const exerciseIndexRef = useRef(0)
    const[handleAndTimeMesureExercises,setHandleAndTimeMesureExercises] = useState<{    
        ExercisesThatRequireTimeMesure: ExercisesThatRequireTimeMesureOrHandle[];
        ExercisesThatRequireHandle: ExercisesThatRequireTimeMesureOrHandle[]} | null>(null)

    const[handles,setHandles] = useState<{id: string;handlename: string;}[] | null>(null)
    const[showAddExercise,setShowAddExercise] = useState(false)
    const[state,setState] = useState<'loading'|'idle'|'error'|'succes'|'uploading'>('idle') // uploading disables all functions
    const[errorMessage,setErrorMessage] = useState('')

    const[planData,setPlanData] = useState<BigTrainingData|null>(null)

    const updateToLocalStorage = (obj:BigTrainingData) => {
        localStorageSetter(planData!.name+'longtraining',{training:obj,lastedited:new Date()})
    }

    useEffect(()=>{
        const name = decodeURI(params['long-term-plan-name'] as string)
        
        const func = async () => {
            setState('loading')
            let planDataForSettlement = {}
            const planData = await getPlanData(name)
            const TimeExercises = await userExercisesThatRequireHandlesOrTimeMesure()
            const handles = await getAllHandleTypes()

            if(planData.error){
                setErrorMessage(planData.error)
                return setState('error')
            } 

            const localPlanData = localStorage.getItem(planData.data.name+'longtraining')

            if(localPlanData){
                const parsedLocalPlanData = JSON.parse(localPlanData) as EditedLongTermTraining
                if(new Date(parsedLocalPlanData.lastedited).getTime() > new Date(planData.data.lastedited).getTime()){
                    planDataForSettlement = parsedLocalPlanData.training
                }else{
                    planDataForSettlement = planData.data
                }
            }else{
                
                planDataForSettlement = planData.data
            }

            setHandleAndTimeMesureExercises(TimeExercises)
            setHandles(handles)
            setPlanData(planDataForSettlement as BigTrainingData)

            setState('succes')

            const userLongTrainigs = await getUserLongTrainigs()
            userTrainings.current = userLongTrainigs

        }
        func()
        
    },[])

    const clonePlan = async (planName:string) => {
        let data = await getPlanData(planName)

        if(data.error) return

        data.data.name = planData?.name!
        data.data.id = planData?.id!
        setPlanData(data.data)
    }
    return(
        <LongPlanEditorContext.Provider value={{
            planData,
            setPlanData,

            planIndexRef,
            exerciseIndexRef,

            showCloneTraingModal,
            setShowCloneTraingModal,
            showDeleteExercisePopUp,
            setShowDeleteExercisePopUp,
            showDeleteTrainigPopUp,
            setShowDeleteTrainigPopUp,
            showImportTrainingModal,
            setShowImportTrainingModal,
            handleAndTimeMesureExercises,
            handles,
            showAddExercise,
            setShowAddExercise,
            state,
            setState,
            updateToLocalStorage,
            errorMessage,
            userTrainings,
            clonePlan
            }}>
                {children}
        </LongPlanEditorContext.Provider>
    )
}