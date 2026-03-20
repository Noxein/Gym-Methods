'use client'
import { createContext, useRef, useState } from "react";
import { ExerciseTypes, Trainee, TraineePlan, TraineeSingleTraining, UserExercise } from "../types";
import { v4 } from "uuid";
import { Locale } from "../i18n/config";

const CreateTrainingContext = createContext<null|TrainingContextType>(null)

export default CreateTrainingContext;

type TrainingContextType = {
    plan: TraineePlan,
    setPlan: (plan: TraineePlan) => void,
    userData: Trainee,
    allHandles: {
        id: string;
        handlename: string;
    }[],
    exercisesThatRequireHandle: {
        id: string;
        exercisename: string;
    }[],
    exercisesThatRequireTimeMesure: {
        id: string;
        exercisename: string;
    }[],
    latestPlanIndexClicked: React.MutableRefObject<number>,
    lastExerciseIndexClicked: React.MutableRefObject<number>,
    allExercisesInOneArray: (string | UserExercise)[],
    allExercises: ExerciseTypes,
    showExerciseModal: boolean,
    setShowExerciseModal: (show: boolean) => void,
    showSideSelection: boolean,
    setShowSideSelection: (show: boolean) => void,
    showSinglePlanModal: boolean,
    setShowSinglePlanModal: (show: boolean) => void,
    copyOfLatestPlanClicked: React.MutableRefObject<TraineeSingleTraining|null>,
    locale: Locale,
    loading: boolean,
    setLoading: (loading: boolean) => void
}

type TrainingContextProviderProps = {
    children: React.ReactNode,
    userData: Trainee,
    allHandles: {
        id: string;
        handlename: string;
    }[],
    allExercisesInOneArray: (string | UserExercise)[],
    allExercises: ExerciseTypes,
    exercisesThatRequireTimeMesure:{
        id: string;
        exercisename: string;
    }[],
    exercisesThatRequireHandle: {
        id: string;
        exercisename: string;
    }[],
    locale: Locale
}


export const TrainingContextProvider = ({ children, locale, userData, allHandles, allExercisesInOneArray, allExercises, exercisesThatRequireTimeMesure, exercisesThatRequireHandle }: TrainingContextProviderProps) => {
    const defaultPlan:TraineePlan = {
        id: v4(),
        name: 'New ' + userData.username + ' plan',
        plan: [
            {
                id: v4(),
                date: new Date(),
                exercises: [],
                iscompleted: false,
                name: 'plan1',
            }
        ],
        iscompleted: false,
    }

    const [plan, setPlan] = useState<TraineePlan>(defaultPlan)
    const [showExerciseModal, setShowExerciseModal] = useState(false)
    const [showSideSelection, setShowSideSelection] = useState(false)
    const [showSinglePlanModal, setShowSinglePlanModal] = useState(false)
    const copyOfLatestPlanClicked = useRef<TraineeSingleTraining|null>(null)
    const [loading, setLoading] = useState(false)

    const latestPlanIndexClicked = useRef<number>(0)
    const lastExerciseIndexClicked = useRef<number>(0)

    return (
        <CreateTrainingContext.Provider value={{ plan, setPlan, userData, allHandles, exercisesThatRequireHandle, exercisesThatRequireTimeMesure, latestPlanIndexClicked, lastExerciseIndexClicked, allExercisesInOneArray, allExercises, showExerciseModal, setShowExerciseModal, showSideSelection, setShowSideSelection, showSinglePlanModal, setShowSinglePlanModal, copyOfLatestPlanClicked, locale, loading, setLoading }}>
            {children}
        </CreateTrainingContext.Provider>
    )
}