'use client'

import { useContext, useState } from "react";
import SinglePlan from "./SinglePlan";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import DeleteExerciseModal from "./DeleteExerciseModal";
import { Button } from "@/app/components/ui/Button";
import { ExerciseTypes, SubPlanData, UserExercise, UserTrainingPlan } from "@/app/types";
import { v4 } from "uuid";
import DeleteTrainingModal from "./DeleteTrainingModal";
import ImportTrainingModal from "./ImportTrainingModal";
import { MapExercises } from "@/app/components/ui/MapExercises";
import { HideShowHTMLScrollbar, localStorageSetter } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { LoaderFullScreen } from "@/app/components/Loading/LoaderFullScreen";
import { ErrorDiv } from "@/app/components/ui/ErrorDiv";
import { handleSaveLongTermPlan } from "@/app/actions";
import { useTranslations } from "next-intl";

type LongTermPlanTypes = {
    UserTrainings: UserTrainingPlan[],
    allExercisesInOneArray: (string | UserExercise)[],
    allExercises: ExerciseTypes
}
function LongTermPlan({UserTrainings,allExercisesInOneArray,allExercises}:LongTermPlanTypes) {

    const e = useTranslations('Errors')
    const u = useTranslations("Utils")
    
    const { 
        planData,
        setPlanData,
        showDeleteExercisePopUp,
        setShowDeleteExercisePopUp,
        showDeleteTrainigPopUp,
        setShowDeleteTrainigPopUp,
        showImportTrainingModal,
        setShowImportTrainingModal,
        showAddExercise,
        setShowAddExercise,
        planIndexRef,
        handles,
        handleAndTimeMesureExercises,
        state,
        setState,
        updateToLocalStorage,
        errorMessage
    } = useContext(LongPlanEditorContext)!

    const router = useRouter()
    const[error,setError] = useState('')

    const addTraining = () => {
        if(state === 'uploading') return
        let planDataCopy = {...planData!}
        let data: SubPlanData = {exercises:[],id:v4(),name:`Trening ${planDataCopy.subplans.length + 1}`} 
        planDataCopy.subplans.push(data)
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const handleSelectExercise = (name:string) => {
        if(state === 'uploading') return
        const planDataCopy = {...planData!}

        if(allExercises.userExercises?.some(exe=>exe.exercisename === name)){
            const userExercise = allExercises.userExercises.find(exe=>exe.exercisename === name)!
            //its exercise added by user
            planDataCopy.subplans[planIndexRef.current].exercises.push({
                exerciseid: userExercise.id,
                exercisename: userExercise.exercisename,
                setgoals: [],
                istimeexercise: userExercise.timemesure,
                handle: userExercise.useshandle ? {handleid: handles![0].id,handlename: handles![0].handlename} : undefined
            })
        }else{
                planDataCopy.subplans[planIndexRef.current].exercises.push({
                exerciseid: name,
                exercisename: name,
                setgoals: [],
                istimeexercise: handleAndTimeMesureExercises?.ExercisesThatRequireTimeMesure.some(exe=>exe.exercisename === name) ? true : false,
                handle:    handleAndTimeMesureExercises?.ExercisesThatRequireHandle.some(exe=>exe.exercisename === name) ? {handleid: handles![0].id, handlename: handles![0].handlename} : undefined
            })
        }
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
        HideShowHTMLScrollbar('show')
        setShowAddExercise(false)
    }

    const handleCloseDeleteExercise = () => {
        if(state === 'uploading') return
        setShowDeleteExercisePopUp(false)
        HideShowHTMLScrollbar('show')
    }

    const handleCloseDeleteTraining = () => {
        if(state === 'uploading') return
        setShowDeleteTrainigPopUp(false)
        HideShowHTMLScrollbar('show')
    }

    const handleCloseDeleteImportTraining = () => {
        if(state === 'uploading') return
        setShowImportTrainingModal(false)
        HideShowHTMLScrollbar('show')
    }

    const handleCloseAddExercise = () => {
        if(state === 'uploading') return
        setShowAddExercise(false)
        HideShowHTMLScrollbar('show')
    }
    const handleGoBack = () => {
        if(state === 'uploading') return
        router.push('/home/profile/long-term-plans')
    }

    const handleSave = async () => {
        if(state === 'uploading') return
        setState('uploading')
        const result = await handleSaveLongTermPlan(planData!,new Date())
        if(result?.error){
            setState('idle')
            return setError(e(result.error))
        }
        setState('succes')
        router.push('/home/profile/long-term-plans')
    }
    

    if(state === 'loading') return <LoaderFullScreen />
    
    if(state === 'error') return <BlurBackgroundModal><ErrorDiv error={e(errorMessage)}/></BlurBackgroundModal> 

    return (
    <div className="mx-5 mt-5 flex flex-col mb-24 relative min-h-[calc(100vh-100px)]">

        <p className="text-3xl text-center text-white font-normal">{planData?.name}</p>

        <div className="flex flex-col gap-4">
            {planData && planData.subplans?.map((plan,planIndex)=><SinglePlan key={plan.id} plan={plan} planIndex={planIndex} allExercisesInOneArray={allExercisesInOneArray}/>)}

            <Button onClick={addTraining} className="mb-2" disabled={state==='uploading'} isPrimary>{u("AddTraining")}</Button>
        </div>

        <div className="flex gap-2 mt-auto ">
            <Button className="border-red text-red flex-1" disabled={state==='uploading'} onClick={handleGoBack}>{u("Back")}</Button>
            <Button className="flex-1" isPrimary disabled={state==='uploading'} onClick={handleSave}>{u("Save")}</Button>
        </div>

        <ErrorDiv error={error}/>

        {showDeleteExercisePopUp && <BlurBackgroundModal onClick={handleCloseDeleteExercise}>
            <DeleteExerciseModal />
        </BlurBackgroundModal>}

        {showDeleteTrainigPopUp && <BlurBackgroundModal onClick={handleCloseDeleteTraining}>
            <DeleteTrainingModal />
        </BlurBackgroundModal>}

        {showImportTrainingModal && 
            <ImportTrainingModal UserTrainings={UserTrainings} allExercisesInOneArray={allExercisesInOneArray}/>}

        {showAddExercise && <MapExercises 
            allExercisesInOneArray={allExercisesInOneArray}
            exercisesObject={allExercises}
            handleClose={handleCloseAddExercise}
            handleSelect={handleSelectExercise}
        />}
      
    </div>);
}

export default LongTermPlan;
