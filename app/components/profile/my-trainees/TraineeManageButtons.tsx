'use client'
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { useTranslations } from "next-intl";

function TraineeManageButtons({id}:{id:string}) {

    const router = useRouter()
    const t = useTranslations("Home/Profile/My-Trainees")
    
    return ( 
        <>
            <Button className="px-2 border-0 mt-4" onClick={() => router.push(`/home/profile/my-trainees/${id}/calendar`)}>{t('ManageTrainings')}</Button>
            <Button className="px-2 border-0" onClick={() => router.push(`/home/profile/my-trainees/${id}/create`)}>{t('CreateNewTraining')}</Button>
            <Button className="px-2 border-0" onClick={() => router.push(`/home/profile/my-trainees/${id}/history`)}>{t('TrainingHistory')}</Button>
        </>
     );
}

export default TraineeManageButtons;