import { BigTrainingData } from "@/app/types";
import { Icon } from "../../Icon";
import { RightTriangle } from "@/app/ui/icons/ExpandIcon";
import { Button } from "../../ui/Button";
import { createStarterBigPlan } from "@/app/actions";
import { useTranslations } from "next-intl";

type StartNewTrainingListTypes = {
    LongTermTrainingList: BigTrainingData[],
    flip: () => void
}

function StartNewTrainingList({LongTermTrainingList,flip}:StartNewTrainingListTypes) {

    const u = useTranslations("Utils")
    const t = useTranslations("Home/Start-Training")

    return ( 
        <div className="w-full mx-5 mb-20" onClick={e=>e.stopPropagation()}>

            <p className="text-center text-2xl mb-4">{t("StartNewTraining")}</p>

            <div className="flex flex-col gap-5 w-full">
                {LongTermTrainingList.map((plan,index)=><BigPlanLink key={plan.id} plan={plan}/>)}
            </div>

            <div className="flex gap-2">
                <Button className="flex-1 mt-4" onClick={flip}>{u("Close")}</Button>
            </div>

        </div>

     );
}

export default StartNewTrainingList;

type BigPlanLinkTypes = {
    plan: BigTrainingData
}

const BigPlanLink = ({plan}:BigPlanLinkTypes) => {

    const handleSelectExercise = async () => {
        createStarterBigPlan(plan,new Date())
    }

    return(
        <div className={`bg-steel p-[2px] rounded-md flex`} onClick={handleSelectExercise}>

            <div className={`bg-dark flex flex-col rounded-md flex-1 px-4 pb-5 pt-3 relative`}>

                <span>{plan.name}</span>
                
                {plan.subplans && plan.subplans[0] && <span className='text-gray-400 text-sm relative'>
                    <span className='absolute -top-1'>{plan.subplans[0].name}... + {plan.subplans.length-1}</span>
                </span>}
                
            </div>

            <div className='flex items-center px-2'>
                <Icon className='flex justify-center items-center'>
                    <RightTriangle width='15px' height='30px' fill='#fff'/>
                </Icon>
            </div>    

        </div>
    )
}