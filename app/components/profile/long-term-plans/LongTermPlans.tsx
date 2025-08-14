'use client'
import { BigTrainingData } from "@/app/types";
import { ButtonWithIcon } from "../../ui/ButtonWithIcon";
import { PlusIcon, TrashIcon } from "@/app/ui/icons/ExpandIcon";
import { useState } from "react";
import AddNewPlanModal from "./AddNewPlanModal";
import { BlurBackgroundModal } from "../../BlurBackgroundModal";
import Link from "next/link";
import { Icon } from "../../Icon";
import DeleteLongTermPlanModal from "./DeleteLongTermPlanModal";
import { useTranslations } from "next-intl";

type LongTermPlansTypes = {
    AllUserLongTermPlans: BigTrainingData[]
}

function LongTermPlans({AllUserLongTermPlans}:LongTermPlansTypes) {

    const[show,setShow] = useState(false)
    const[showDeleteTrainingModal,setShowDeleteTrainingModal] = useState(false)
    const[selectedExerciseName,setSeletedExerciseName] = useState('')

    const flip = () => {
        setShow(!show)        
    }

    const t = useTranslations('Home/Profile/Long-Term-Plans')

    return ( 
        <div className="mx-5 mt-5 text-white">

            <p className="text-2xl mb-5 text-center">{t("LongTermPlans")}</p>

            <ButtonWithIcon
                className="w-full" 
                isPrimary
                buttonText={t("AddNewPlan")}
                childrenIcon={<PlusIcon />
                }
                onClick={flip}
            />

            <div className="flex flex-col w-full mt-5 gap-4">
                {AllUserLongTermPlans.map(plan=>
                    // <Button key={plan.id} onClick={()=>router.push(`/home/profile/long-term-plans/${plan.name}`)}>{plan.name}</Button>
                    <LinkToTraining key={plan.id} trainingname={plan.name} setSelectedExercise={setSeletedExerciseName} setShowDeleteTrainingModal={setShowDeleteTrainingModal}/>
                )}
            </div>

            {show && 
            <BlurBackgroundModal onClick={flip}>
                <AddNewPlanModal flip={flip}/>
            </BlurBackgroundModal>
            }

            {showDeleteTrainingModal && 
                <BlurBackgroundModal>
                    <DeleteLongTermPlanModal planName={selectedExerciseName} setShowDeleteTrainingModal={setShowDeleteTrainingModal}/>
                </BlurBackgroundModal>
            }

        </div>
    );
}

export default LongTermPlans;

type LinkToTrainingTypes = {
    trainingname: string,
    setSelectedExercise: React.Dispatch<React.SetStateAction<string>>,
    setShowDeleteTrainingModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const LinkToTraining = ({trainingname,setSelectedExercise,setShowDeleteTrainingModal}:LinkToTrainingTypes) => {

    const DeleteTraining = () => {
        setSelectedExercise(trainingname)
        setShowDeleteTrainingModal(true)
    }
    
    return(
        <div className={`text-xl rounded-lg flex items-center bg-borderInteractive`}>

            <Link href={`/home/profile/long-term-plans/${trainingname}`} className='flex flex-1 items-center rounded-lg p-[2px]'>
                <div className={`bg-dark py-3 rounded-lg flex-1 px-4`}>
                {trainingname}
                </div>
            </Link>
            
            <Icon onClick={DeleteTraining}>
                <TrashIcon fill='#fff'/>
            </Icon>

        </div>
    )
}