import { getTraineeData } from "@/app/actions";
import { LinkBtn, UserEmail } from "@/app/components/profile/LinkBtn";
import { CalendarIcon, PieChartIcon, StarIcon } from "@/app/ui/icons/ExpandIcon";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Home/Profile/My-Trainees")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    return {
        title: traineeData ? `${traineeData.username} - ${t("TrainingSummary")}` : t("TrainingSummary")
    }
}

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Home/Profile/My-Trainees")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    if(!traineeData) return <div className="text-white text-center">{t("TrainingSummary")}</div>

    const iconWidth = '30px'
    const iconHeight = '30px'

    return (
        <main className="flex flex-col gap-2 text-white">
            <UserEmail username={traineeData.username}/>
            <div className='mx-5 flex flex-col gap-4 min-h-[calc(100dvh-100px)]'>
                <LinkBtn href={`/home/profile/my-trainees/${traineeId}/summary`} text={t("TrainingSummary")}>
                    <PieChartIcon width={iconWidth} height={iconHeight} fill='#fff'/>
                </LinkBtn>

                <LinkBtn href={`/home/profile/my-trainees/${traineeId}/history`} text={t("TrainingHistory")}>
                    <CalendarIcon width={iconWidth} height={iconHeight} fill='#fff'/>
                </LinkBtn>

                <LinkBtn href={`/home/profile/my-trainees/${traineeId}/calendar`} text={t("ManageTrainings")}>
                    <CalendarIcon width={iconWidth} height={iconHeight} fill='#fff'/>
                </LinkBtn>

                <LinkBtn href={`/home/profile/my-trainees/${traineeId}/goals`} text={t("Goals")}>
                    <StarIcon width={iconWidth} height={iconHeight} fill='#fff'/>
                </LinkBtn>
            </div>
        </main>
    )
}