'use client';
import { createContext, useEffect, useState } from "react";
import { exercisesArr } from '@/app/lib/exercise-list'
import { getAllHandleTypes, getUserExerciseIdUsingName, getUserExerciseProgression, userExercisesThatRequireHandlesOrTimeMesure } from "../actions";
import { AddExerciceReducerType, ExercisesThatRequireTimeMesureOrHandle, Progression } from "../types";
import { useRouter } from "next/navigation";

export const ExerciseDataContext = createContext<ExerciseDataContextType|null>(null)

type ExerciseDataContextType = {
        setDifferentExerciseData: () => Promise<void>,
        exerciseData: ExerciseDataType,
        allHandles: AllHandlesType,
        progressions: {
            [key: string]: Progression
        },
        newExerciseName: string,
        twoRecentExercises: string[],
        firstLoad: boolean,
        setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        finishOneExercise: () => Promise<void>,
}

type ExerciseDataType = {
    name: string,
    exerciseid: string,
    showTimeMesure: boolean,
    requiresHandle: boolean,
    exerciseProgression?: Progression | undefined,
}

type AllHandlesType = {
    id: string;
    handlename: string;
}[]
export const ExerciseDataContextProvider = ({children,twoRecentExercises}:{children: React.ReactNode,twoRecentExercises:string[]}) => {

    const router = useRouter();

    // const getRecentExercises = () => {
    //     const data = localStorage.getItem('twoRecentExercises')
    //     if(!data) return []
    //     return JSON.parse(data) as string[]
    // }

    const[firstLoad,setFirstLoad] = useState<boolean>(true)
    const[loading,setLoading] = useState<boolean>(false)
    const[recentExercises,setRecentExercises] = useState<string[]>(twoRecentExercises)
    const[progressions,setProgressions] = useState<{[key: string]: Progression}>({})
    const[exercisesIDsCache,setExercisesIDsCache] = useState<{[key: string]: string}>({})

    const[exerciseData,setExerciseData] = useState<{
        name: string,
        exerciseid: string,
        showTimeMesure: boolean,
        requiresHandle: boolean,
        exerciseProgression?: Progression | undefined,
    }>({
        name: '',
        exerciseid: '',
        showTimeMesure: false,
        requiresHandle: false,
    })

    const newExerciseName = exerciseData.name === recentExercises[0] ? recentExercises[1] : recentExercises[0]

    const setDifferentExerciseData = async () => {
        const newExerciseName = exerciseData.name === recentExercises[0] ? recentExercises[1] : recentExercises[0]
        let progression = progressions[newExerciseName]

        let exerciseid = newExerciseName

        if(exercisesIDsCache[newExerciseName]){
            exerciseid = exercisesIDsCache[newExerciseName]
        }
        
        if(!exercisesArr.includes(exerciseid) && !exercisesIDsCache[newExerciseName]){
            setLoading(true)
            exerciseid = await getUserExerciseIdUsingName(exerciseid)
            setExercisesIDsCache(prev=>({...prev,[newExerciseName]:exerciseid}))
        }

        if(!progression){
            console.log('no progression found')
            setLoading(true)
            let progressionsCopy = structuredClone(progressions)
            

            const fetchedProgression = await getUserExerciseProgression(await getUserExerciseIdUsingName(newExerciseName))
            
            if(!fetchedProgression){
                let newProgression: Progression = {
                    exerciseid: exerciseid,
                    series: [],
                    exercisename: newExerciseName,
                    id: '',
                    userid: '',
                }
                progression = newProgression
            }else{
                progression = fetchedProgression
            }
            
            progressionsCopy[newExerciseName] = progression
            progression && setProgressions(progressionsCopy)
        } 

        setExerciseData({
            name: newExerciseName,
            exerciseid: exerciseid,
            showTimeMesure: ExercisesTimeMesure.some(exercise => exercise.exercisename === newExerciseName),
            requiresHandle: ExercisesHandle.some(exercise => exercise.exercisename === newExerciseName),
            exerciseProgression: progression,
        })
        setLoading(false)
    }

    const[ExercisesTimeMesure, setExercisesTimeMesure] = useState<ExercisesThatRequireTimeMesureOrHandle[]>([])
    const[ExercisesHandle, setExercisesHandle] = useState<ExercisesThatRequireTimeMesureOrHandle[]>([])
    const[allHandles, setAllHandles] = useState<AllHandlesType>([])

    useEffect(()=>{
        const func = async() => {
            const handles = await getAllHandleTypes()   
            const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()

            setAllHandles(handles)

            setExercisesTimeMesure(ExercisesThatRequireTimeMesure)
            setExercisesHandle(ExercisesThatRequireHandle)

            let exerciseProgression = {} as Progression
            let exerciseid = ''
            const exerciseUrlName = decodeURI(window.location.pathname.split('/')[3])

            if(!exercisesArr.includes(recentExercises[0])){
                exerciseid = await getUserExerciseIdUsingName(exerciseUrlName)
            }else{
                // take name from url
                exerciseid = exerciseUrlName
            }
            
            const exerciseProgress = await getUserExerciseProgression(exerciseid)
            if(!exerciseProgress){
                let newProgression: Progression = {
                    exerciseid: exerciseid,
                    series: [],
                    exercisename: newExerciseName,
                    id: '',
                    userid: '',
                }

                exerciseProgression = newProgression
            }else{
                exerciseProgression = exerciseProgress
            }
            

            let obj: {[key: string]: Progression} = {}
            obj[exerciseUrlName] = exerciseProgression

            setProgressions(obj)

            setExerciseData({
                name: exerciseUrlName,
                exerciseid: exerciseid,
                showTimeMesure: ExercisesThatRequireTimeMesure.some(exercise => exercise.exercisename === recentExercises[0]),
                requiresHandle: ExercisesThatRequireHandle.some(exercise => exercise.exercisename === recentExercises[0]),
                exerciseProgression: exerciseProgression,
            })
            setExercisesIDsCache(prev=>({...prev,[exerciseUrlName]:exerciseid}))
            setFirstLoad(false)
        }
        func()
    },[])

    const ResetLocalStorage = (exerciseName:string) => {
        const data = localStorage.getItem(exerciseName+"singleExerciseChanged")
        if(!data) return
        let parsedData = JSON.parse(data) as AddExerciceReducerType

        parsedData.series = []
        localStorage.setItem(exerciseName+"singleExerciseChanged",JSON.stringify(parsedData))
    }

    const finishOneExercise = async () => {
        const currentExerciseName = exerciseData.name
        ResetLocalStorage(currentExerciseName)
        if(recentExercises.length === 1){
            setLoading(true)
            router.push('/home/add-exercise')
            return
        } 
        await setDifferentExerciseData()
        console.log(recentExercises.filter(exercise => exercise !== currentExerciseName))
        setRecentExercises(recentExercises.filter(exercise => exercise !== currentExerciseName))
    }
    return (
    <ExerciseDataContext.Provider value={{
        setDifferentExerciseData,
        exerciseData,
        allHandles,
        progressions,
        newExerciseName,
        twoRecentExercises: recentExercises,
        firstLoad,
        setFirstLoad,
        loading,
        setLoading,
        finishOneExercise,
    }}>
        {children}
    </ExerciseDataContext.Provider>
    )
}