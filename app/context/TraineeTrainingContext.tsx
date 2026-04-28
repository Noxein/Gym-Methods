'use client'
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TraineePlan, TraineeSingleTraining, UserPurposeType } from "../types";
import { WSString } from "../lib/utils";
import ConfirmModalContext from "./ConfirmModalContext";
import { useRouter } from "next/navigation";
import { TimerContext } from "./TimerContext";
import { handleCloseTrainingSF } from "../traineeActions";

const TraineeTrainingContext = createContext<contextType | null>(null)

type contextType = {
    training: TraineeSingleTraining,
    setTrainingData: React.Dispatch<React.SetStateAction<TraineeSingleTraining>>,
    sentFunc: () => void,
    currentExerciseIndex: number,
    setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>,
    allHandles :{
        id: string;
        handlename: string;
    }[],
    handleInputChange: (value:number,changedField:'weight'|'repetition'|'time', seriesIndex: number) => void,
    flipT: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
    flipF: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
    handleChange: (handle:string) => void,
    handleCloseTraining: () => void
}

export default TraineeTrainingContext

type TraineeTrainingContextProviderType = {
    children: React.ReactNode,
    training: TraineePlan,
    userid: string,
    allHandles: {
        id: string;
        handlename: string;
    }[],
    userPurpose: UserPurposeType 
}
export const TraineeTrainingContextProvider = ({children,training,userid,allHandles,userPurpose}:TraineeTrainingContextProviderType) => {

    const ws = useRef<WebSocket | null>(null);
    const[isTrainerConnected, setIsTrainerConnected] = useState(false);
    const[trainingData,setTrainingData] = useState<TraineeSingleTraining>(training.plan.find(x=>x.iscompleted===false)!)
    const[currentExerciseIndex,setCurrentExerciseIndex] = useState(0)
    const JWTRef = useRef<string | null>(null);
    const { setModalState } = useContext(ConfirmModalContext)!
    const router = useRouter()

        const {
            newDateSetter,
            setTimePassed,
        } = useContext(TimerContext)!

    useEffect(()=>{
        ws.current = new WebSocket(`${WSString}/trainee-training`)

        ws.current.onopen = () => {
            console.log("WebSocket połączony");
            ws.current!.send(JSON.stringify({type:"FIRST_CONNECT", userid,trainingData,userPurpose }));
        }

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if(data.type === "TRAINER_CONNECTED"){
                setIsTrainerConnected(true);

                ws.current!.send(JSON.stringify({type:"TRAINING_UPDATE", training: trainingData}));
            }

            if(data.type === 'SET_JWT_SUCCESS'){
                JWTRef.current = data.jwt;
            }

            if(data.type === 'SET_JWT_FAILURE'){
                setModalState({
                    isOpen: true,
                    message: "Nie można połączyć się z trenerem. Odśwież stronę i spróbuj ponownie.",
                    onConfirm: () => {
                        router.refresh();
                },
                    onDecline: () => {
                        router.back();
                    }
                })
            }

            if(data.type === "TRAINEER_CONNECTED"){
                setIsTrainerConnected(true);
                ws.current!.send(JSON.stringify({type:"TRAINING_UPDATE", training: trainingData}));
            }

            if(data.type === "TRAINING_UPDATE"){
                setTrainingData(data.training);
            }

        }

        return () => {
            ws.current?.close()
        }
    },[])

    const endFunction = (trainingObj: TraineeSingleTraining) => {
        if(!isTrainerConnected) return

        ws.current!.send(JSON.stringify({type:"TRAINING_END", training: trainingObj}));
    }

    const handleInputChange = (value:number,changedField:'weight'|'repetition'|'time', seriesIndex: number) => {
        let trainingCopy = structuredClone(trainingData)
                
        let series = {...trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex].actual}
        if(changedField==='weight'){
            series.weight = value
        } 
        if(changedField==='repetition'){
            series.repeat = value
        } 
        if(changedField==='time'){
            series.time = value
        } 
        trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex].actual = series
        //setCurrentLocalData(planDataCopy.subplans[planData.currentplanindex])
        setTrainingData(trainingCopy)
        endFunction(trainingCopy)
        //setPlanData(planDataCopy)
    }

    const handleChange = (handle:string) => {
        const parsedHandle = JSON.parse(handle) as {id: string;handlename: string;}
        let trainingCopy = structuredClone(trainingData)

        trainingCopy.exercises[currentExerciseIndex].handle = {id: parsedHandle.id, handlename: parsedHandle.handlename}

        setTrainingData(trainingCopy)
        endFunction(trainingCopy)
    }

    const sentFunc = () => {
        if(!isTrainerConnected) return

        ws.current!.send(JSON.stringify({type:"TRAINING_UPDATE", training: trainingData}));
    }

    const timerReset = (goalMet: undefined | 'met' | 'notmet',) => {
        if(typeof goalMet === 'undefined'){
            const exerciseName = trainingData.exercises[currentExerciseIndex].exercisename
            newDateSetter(new Date(),exerciseName)
            setTimePassed(0)
        }
    } 
    const flipT = (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => {
        timerReset(goalMet)
        let trainingCopy = structuredClone(trainingData)

        let series = {...trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex]}

        series.actual.repeat = series.goal.repetitionsgoalmax
        series.actual.weight = series.goal.weightgoal
        if(series.actual.time) series.actual.time = series.goal.timegoal
        
        trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex] = series

        setTrainingData(trainingCopy)
        endFunction(trainingCopy)
    }

    const flipF = (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => {
        timerReset(goalMet)
        //setGoalMet('notmet')
        let trainingCopy = structuredClone(trainingData)

        trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex].isSetCompleted = false

        setTrainingData(trainingCopy)
        endFunction(trainingCopy)
    }

    const handleCloseTraining = async () => {
        let trainingCopy = structuredClone(training)

        const planIndex = trainingCopy.plan.findIndex(x=>x.id === trainingData.id)!
        trainingCopy.plan[planIndex] = structuredClone(trainingData)
        trainingCopy.plan[planIndex].iscompleted = true
        trainingCopy.plan[planIndex].lastedited = new Date()

        if(trainingCopy.plan.length === planIndex + 1){
            trainingCopy.iscompleted = true
        }

        const result = await handleCloseTrainingSF(trainingCopy)

        if(result.error){
            setModalState({
                isOpen: true,
                message: result.error,
                onConfirm: () => {
                    router.refresh();
                },
                onDecline: () => {
                    router.back();
                }
            })
            return
        }

        ws.current!.close()
        router.push('/home')
        
    }

    return ( 
        <TraineeTrainingContext.Provider value={{
            training: trainingData, 
            setTrainingData, 
            handleInputChange,
            sentFunc, 
            currentExerciseIndex, 
            setCurrentExerciseIndex, 
            allHandles,
            flipF,
            flipT,
            handleChange,
            handleCloseTraining
             }}>
            {children}
        </TraineeTrainingContext.Provider>
     );
}

