'use client'

import { createContext, useRef, useState } from "react"
import { ExerciseTypes, TrainerPlanSchema, UserExercise } from "../types";
import { exercisesUsingHandles } from "../lib/exercise-list";

type Page = 'create' | 'edit';

const TrainingSchemaContext = createContext<{handles: {id: string, handlename: string}[], schema: TrainerPlanSchema, setSchema: React.Dispatch<React.SetStateAction<TrainerPlanSchema>>, allExercises: ExerciseTypes, allExercisesInOneArray: (string | UserExercise)[], latestPlanIndexClicked: React.MutableRefObject<number>, latestExerciseIndexClicked: React.MutableRefObject<number>, showExerciseModal: boolean, setShowExerciseModal: React.Dispatch<React.SetStateAction<boolean>>, exercisesThatUseHandles: (string | UserExercise)[], confirmationModal: ConformationModalState | null, setConfirmationModal: React.Dispatch<React.SetStateAction<ConformationModalState | null>>, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>, page: Page } | undefined>(undefined);

export default TrainingSchemaContext;

type TrainingSchemaContextProviderProps = {
    children: React.ReactNode;
    handles: {id: string, handlename: string}[];
    schema: TrainerPlanSchema;
    allExercises: ExerciseTypes;
    allExercisesInOneArray: (string | UserExercise)[];
    page: Page;
}

type ConformationModalState = {
    isOpen: boolean;
    onConfirm: () => Promise<void> | void;
    message: string;
    onDecline: () => void;
}

const ConformationModalInitialState: ConformationModalState = {
    isOpen: false,
    onConfirm: () => {},
    message: '',
    onDecline: () => {}
}
export const TrainingSchemaContextProvider = ({ children, handles, schema, allExercises,allExercisesInOneArray, page }: TrainingSchemaContextProviderProps) => {
    const[schemaState, setSchema] = useState<TrainerPlanSchema>(schema)
    const[showExerciseModal, setShowExerciseModal] = useState(false)
    const[confirmationModal,setConfirmationModal] = useState<ConformationModalState | null>(ConformationModalInitialState)
    const[loading,setLoading] = useState(false)

    const exercisesThatUseHandles = allExercisesInOneArray.filter(exercise => {
        if(typeof exercise === 'string' && exercisesUsingHandles.includes(exercise)) {
            return true;
        };
        if(typeof exercise === 'object' && exercise.useshandle) {
            return true;
        }
        return false
    })

    const latestPlanIndexClicked = useRef<number>(0);
    const latestExerciseIndexClicked = useRef<number>(0);
    return(
        <TrainingSchemaContext.Provider value={{ handles, schema: schemaState, setSchema, allExercises, allExercisesInOneArray, latestPlanIndexClicked, latestExerciseIndexClicked, showExerciseModal, setShowExerciseModal, exercisesThatUseHandles, confirmationModal, setConfirmationModal, loading, setLoading, page }}>
            {children}
        </TrainingSchemaContext.Provider>
    )
}