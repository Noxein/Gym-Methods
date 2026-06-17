'use client'
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TraineePlan, TraineeSingleTraining, UserPurposeType } from "../types";
import { WSString } from "../lib/utils";
import ConfirmModalContext from "./ConfirmModalContext";
import { useRouter } from "next/navigation";
import { TimerContext } from "./TimerContext";
import { handleCloseTrainingSF } from "../traineeActions";
import TraineeTrainingContext from "./TraineeTrainingContext";

const TrainerJoinTrainingContext = createContext<contextType | null>(null)

type contextType = {
    training: TraineeSingleTraining|null,
    setTrainingData: React.Dispatch<React.SetStateAction<TraineeSingleTraining|null>>,
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

export default TrainerJoinTrainingContext

type TrainerJoinTrainingContextProviderType = {
    children: React.ReactNode,
    traineeId: string,
    userid: string,
    allHandles: {
        id: string;
        handlename: string;
    }[],
    userPurpose: UserPurposeType 
}
export const TrainerJoinTrainingContextProvider = ({children,traineeId,userid,allHandles,userPurpose}:TrainerJoinTrainingContextProviderType) => {

    const ws = useRef<WebSocket | null>(null);
    const[isTrainerConnected, setIsTrainerConnected] = useState(true);
    const[trainingData,setTrainingData] = useState<TraineeSingleTraining|null>(null)
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
            ws.current!.send(JSON.stringify({type:"TRAINER_CONNECTED", userid, traineeId, userPurpose }));
        }

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

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

            if(data.type === "TRAINEE_DISCONNECTED"){
                setModalState({
                    isOpen: true,
                    message: "Podopieczny rozłączył się z treningiem. Zostaniesz przeniesiony na stronę główną.",
                    onConfirm: () => {router.push('/home')},
                    onDecline: () => {router.push('/home')}
                })
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
        if(!trainingData) return
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
        if(!trainingData) return
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
        if(!trainingData) return
        if(typeof goalMet === 'undefined'){
            const exerciseName = trainingData.exercises[currentExerciseIndex].exercisename
            newDateSetter(new Date(),exerciseName)
            setTimePassed(0)
        }
    } 
    const flipT = (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => {
        if(!trainingData) return
        timerReset(goalMet)
        let trainingCopy = structuredClone(trainingData)

        let series = {...trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex]}

        series.actual.repeat = series.goal.repetitionsgoalmax
        series.actual.weight = series.goal.weightgoal
        series.isSetCompleted = true
        if(series.actual.time) series.actual.time = series.goal.timegoal
        
        trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex] = series

        setTrainingData(trainingCopy)
        endFunction(trainingCopy)
    }

    const flipF = (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => {
        if(!trainingData) return
        timerReset(goalMet)
        //setGoalMet('notmet')
        let trainingCopy = structuredClone(trainingData)

        trainingCopy.exercises[currentExerciseIndex].sets[seriesIndex].isSetCompleted = false

        setTrainingData(trainingCopy)
        endFunction(trainingCopy)
    }

    const handleCloseTraining = async () => {
             
    }

    return ( 
        <TrainerJoinTrainingContext.Provider value={{
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
            <TraineeTrainingContext.Provider value={{
                training: trainingData as TraineeSingleTraining, 
                setTrainingData: setTrainingData as React.Dispatch<React.SetStateAction<TraineeSingleTraining>>, 
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
        </TrainerJoinTrainingContext.Provider>
     );
}

