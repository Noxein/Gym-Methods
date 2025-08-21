import { Icon } from "@/app/components/Icon";
import { Button } from "@/app/components/ui/Button";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { HideShowHTMLScrollbar, nameTrimmer } from "@/app/lib/utils";
import { ExerciseSubPlanData, SubPlanData, UserExercise, UserTrainingPlan } from "@/app/types";
import { PlusIcon } from "@/app/ui/icons/ExpandIcon";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { v4 } from "uuid";

type ImportTrainingModalTypes = {
    UserTrainings: UserTrainingPlan[],
    allExercisesInOneArray: (string | UserExercise)[],
}
function ImportTrainingModal({UserTrainings,allExercisesInOneArray}:ImportTrainingModalTypes) {
    const {planData,setPlanData,planIndexRef,setShowImportTrainingModal,handleAndTimeMesureExercises,handles,updateToLocalStorage } = useContext(LongPlanEditorContext)!

    const handleCloneTraining = (index:number) => {
        let planDataCopy = structuredClone(planData!)
        let planToCopy = JSON.parse(JSON.stringify(planDataCopy.subplans[index]))

        planToCopy.id = planDataCopy.subplans[planIndexRef.current].id
        planToCopy.name = planDataCopy.subplans[planIndexRef.current].name

        planDataCopy.subplans[planIndexRef.current] = planToCopy

        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)

        HideShowHTMLScrollbar('show')
        setShowImportTrainingModal(false)
        
    }

    const handleCloneDifferentUserTraining = (index:number) => {
        let planDataCopy = {...planData!}
        const thePlan = UserTrainings[index]

        let newTrainingObj:SubPlanData = {
            name: thePlan.trainingname,
            id: thePlan.id,
            exercises:[],
        }

        thePlan.exercises.forEach(exercise=>{
            let obj: ExerciseSubPlanData = {
                exerciseid:exercise.exerciseid,
                exercisename: exercise.exercisename,
                setgoals:[],
                istimeexercise: handleAndTimeMesureExercises!.ExercisesThatRequireTimeMesure.some((name,index)=>name.id === exercise.id)
            }
            if(handleAndTimeMesureExercises?.ExercisesThatRequireHandle.some((name,index)=>name.id === exercise.id)){
                obj.handle = {handleid: handles![0].id, handlename: handles![0].handlename}
            }

            newTrainingObj.exercises.push(obj)
        })

        planDataCopy.subplans[planIndexRef.current] = newTrainingObj

        updateToLocalStorage(planDataCopy)
        setPlanData(planData)
        HideShowHTMLScrollbar('show')
        setShowImportTrainingModal(false)
    }

    const closeTraining = () => {
        setShowImportTrainingModal(false)
        HideShowHTMLScrollbar('show')
    }

    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/Long-Term-Plans")

    return ( 
    <div className="fixed w-[calc(100vw-40px)] backdrop-blur-sm min-h-screen top-0 left-0 ml-5 z-40 flex overflow-auto bottom-20">
        <div className=" text-white w-full bg-dark px-2 rounded-lg py-5 overflow-y-scroll" onClick={e=>e.stopPropagation()}>
            <div>
                <p className="text-center text-xl my-2">{t("TrainingsFromThisPlan")}</p>

                <div className="flex flex-col gap-4 rounded">
                    {planData!.subplans.map((plan,index)=>{
                    return (<div key={plan.id} className="flex-col bg-darkLight p-2">
                        <div className="flex justify-between">
                            <p>{plan.name}</p>
                            <button onClick={()=>handleCloneTraining(index)}>
                                <Icon>
                                    <PlusIcon fill="#fff"/>
                                </Icon>
                            </button>
                            
                        </div>
                        
                        <div className="flex flex-col ">
                            {plan.exercises.map((exercise,index)=><ExerciseName allExercisesInOneArray={allExercisesInOneArray} name={exercise.exercisename} key={exercise.exerciseid}/>)}
                        </div>
                    </div>)})}
                </div>

            </div>

            <div>

                <p className="text-center text-xl my-2">{t("DifferentTrainings")}</p>

                <div className="flex flex-col gap-4 rounded">
                    {UserTrainings && UserTrainings.map((plan,index)=>
                    <div key={plan.id} className="flex-col bg-darkLight p-2">
                        <div className="flex justify-between">
                            <p>{plan.trainingname}</p>
                            <button onClick={()=>handleCloneDifferentUserTraining(index)}>
                                <Icon>
                                    <PlusIcon fill="#fff"/>
                                </Icon>
                            </button>
                            
                        </div>

                        <div className="flex flex-col ">
                            {plan.exercises.map((exercise,index)=><ExerciseName allExercisesInOneArray={allExercisesInOneArray} name={exercise.exercisename} key={exercise.id}/>)}
                        </div>
                        
                    </div>)}
                </div>
                
            </div>
            <div className="flex gap-2 mb-20 mt-5">
                <Button className="flex-1" onClick={closeTraining}>{u("Close")}</Button>
            </div>
        </div> 
    </div>);
}

export default ImportTrainingModal;

type ExerciseNameTypes = {
    name: string,
    allExercisesInOneArray: (string | UserExercise)[],
}

const ExerciseName = ({name,allExercisesInOneArray}:ExerciseNameTypes) => {

        const d = useTranslations("DefaultExercises")
        const newName = allExercisesInOneArray.includes(name) ? d(nameTrimmer(name)) : name

    return(
        <span className="ml-2 text-neutral-400 text-sm">{newName}</span>
    )
}