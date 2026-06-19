import { Button } from "@/app/components/ui/Button";
import TraineeCalendarContext from "@/app/context/TraineeCalendarContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { TraineePlan } from "@/app/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

type AddTrainingBtnProps = {
    showAddTrainingModal: boolean;
    setShowAddTrainingModal: (value: boolean) => void;
    selectedDate: Date;
    allTrainings: TraineePlan[]; // tutaj powinien być typ treningu, ale nie mam jeszcze zdefiniowanego, więc daję any
}

function AddTrainingBtn({ showAddTrainingModal, setShowAddTrainingModal, selectedDate, allTrainings }: AddTrainingBtnProps) {
    const params = useParams<{ traineeId: string }>()
    const traineeId = params?.traineeId
    const { setPlans, setUpdatedPlansIds } = useContext(TraineeCalendarContext)!

    const handleShowTrainingModal = () => {
        HideShowHTMLScrollbar('hide')
        setShowAddTrainingModal(true);
    }

    const handleCloseTrainingModal = () => {
        HideShowHTMLScrollbar('show')
        setShowAddTrainingModal(false);
    }

    const u = useTranslations('Utils')
    const t = useTranslations('Home/Profile/My-Trainees/Calendar')

    const handleAddTraining = (training: TraineePlan) => {
        if (training.plan.length === 0) return

        const templatePlan = structuredClone(training.plan[0])
        templatePlan.id = crypto.randomUUID()
        templatePlan.date = new Date(selectedDate)
        templatePlan.lastedited = new Date()
        templatePlan.iscompleted = false

        setPlans((prevPlans) => prevPlans.map((existingPlan) => {
            if (existingPlan.id !== training.id) return existingPlan

            return {
                ...existingPlan,
                lastedited: new Date(),
                plan: [...existingPlan.plan, templatePlan],
            }
        }))

        setUpdatedPlansIds((prevIds) => prevIds.includes(training.id) ? prevIds : [...prevIds, training.id])
        handleCloseTrainingModal()
    }

    const getPreviewExercises = (training: TraineePlan) => {
        const exercises = training.plan.flatMap((singlePlan) => singlePlan.exercises.map((exercise) => exercise.exercisename))
        return [...new Set(exercises)]
    }

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const todayStartTimestamp = startOfToday.getTime()

    const getTrainingDateStats = (training: TraineePlan) => {
        const timestamps = training.plan
            .map((singlePlan) => new Date(singlePlan.date).getTime())
            .filter((timestamp) => Number.isFinite(timestamp))

        const upcomingTimestamps = timestamps.filter((timestamp) => timestamp >= todayStartTimestamp)
        const pastTimestamps = timestamps.filter((timestamp) => timestamp < todayStartTimestamp)

        return {
            hasUpcoming: upcomingTimestamps.length > 0,
            nearestUpcoming: upcomingTimestamps.length > 0 ? Math.min(...upcomingTimestamps) : Number.POSITIVE_INFINITY,
            latestPast: pastTimestamps.length > 0 ? Math.max(...pastTimestamps) : Number.NEGATIVE_INFINITY,
        }
    }

    const trainingsSortedByDate = [...allTrainings].sort((a, b) => {
        const statsA = getTrainingDateStats(a)
        const statsB = getTrainingDateStats(b)

        if (statsA.hasUpcoming && !statsB.hasUpcoming) return -1
        if (!statsA.hasUpcoming && statsB.hasUpcoming) return 1

        if (statsA.hasUpcoming && statsB.hasUpcoming) {
            if (statsA.nearestUpcoming !== statsB.nearestUpcoming) {
                return statsA.nearestUpcoming - statsB.nearestUpcoming
            }
            return a.name.localeCompare(b.name)
        }

        if (statsA.latestPast !== statsB.latestPast) {
            return statsB.latestPast - statsA.latestPast
        }
        return a.name.localeCompare(b.name)
    })

    const createTrainingHref = traineeId ? `/home/profile/my-trainees/${traineeId}/create` : '/home/profile/my-trainees'

    return ( 
        <div>
            <Button blue isPrimary className="w-full mt-2" onClick={handleShowTrainingModal}>{u('addTraining')}</Button>

            {showAddTrainingModal && (
                <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 text-white">
                    <div className=" p-5 rounded-lg w-96 bg-dark overflow-auto max-h-[80vh]">
                        <><h2 className="text-xl font-bold mb-4">{u('addNewTraining')}</h2>
                        <div className="flex flex-col gap-4">
                            {allTrainings.length === 0 && (
                                <div className="text-sm text-gray-300 bg-darkLight p-3 rounded-md">
                                    <p>{t('NoTrainingsEver')}</p>
                                    <Link href={createTrainingHref} className="inline-block mt-2 underline text-blue-300" onClick={handleCloseTrainingModal}>
                                        {t('CreateTrainingLink')}
                                    </Link>
                                </div>
                            )}

                            {trainingsSortedByDate.map(training => {
                                const previewExercises = getPreviewExercises(training)
                                const visibleExercises = previewExercises.slice(0, 4)
                                const hiddenExercisesCount = previewExercises.length - visibleExercises.length

                                return (
                                    <div key={training.id} className="bg-darkLight rounded-md p-3">
                                        <div className="flex items-start gap-2">
                                            <div>
                                                <p>{training.name} - <span className="text-gray-400">({training.plan.length})</span></p>
                                                {previewExercises.length === 0 ? (
                                                    <p className="text-xs text-gray-400 mt-1">{t('NoExercisesInTraining')}</p>
                                                ) : (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-gray-400">{t('ExercisesPreview')}:</p>
                                                        <ul className="text-xs text-gray-200 mt-1 list-disc pl-4 space-y-1">
                                                            {visibleExercises.map((exerciseName) => (
                                                                <li key={`${training.id}-${exerciseName}`}>{exerciseName}</li>
                                                            ))}
                                                            {hiddenExercisesCount > 0 && (
                                                                <li className="text-gray-400">{t('MoreExercises', { count: hiddenExercisesCount })}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            <Button blue isPrimary className="ml-auto px-5" onClick={() => handleAddTraining(training)}>{u("Add")}</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        </>
                        <Button blue className="w-full mt-2" onClick={handleCloseTrainingModal}>{u('close')}</Button>
                    </div>
                </div>
            )}        </div>
     );
}

export default AddTrainingBtn;
