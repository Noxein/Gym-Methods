'use client'

import { saveTraineeGoal } from "@/app/actions"
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal"
import { Button } from "@/app/components/ui/Button"
import { MapExercises } from "@/app/components/ui/MapExercises"
import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import { ExerciseTypes, UserExercise } from "@/app/types"
import { useEffect, useMemo, useState } from "react"

type GoalItem = {
    id: string
    userid: string
    exerciseid: string
    exercisename: string
    goal: string
}

type TrainerGoalsPageProps = {
    title: string
    traineeId: string
    emptyMessage: string
    exerciseLabel: string
    goalLabel: string
    addGoalLabel: string
    saveLabel: string
    selectExerciseLabel: string
    goals: GoalItem[]
    exercisesObject: ExerciseTypes
    allExercisesInOneArray: (string | UserExercise)[]
}

const getInitialExercise = (allExercisesInOneArray: (string | UserExercise)[]) => {
    const firstExercise = allExercisesInOneArray[0]

    if(!firstExercise) {
        return { id: '', name: '' }
    }

    if(typeof firstExercise === 'string') {
        return { id: firstExercise, name: firstExercise }
    }

    return { id: firstExercise.id, name: firstExercise.exercisename }
}

export const TrainerGoalsPage = ({
    title,
    traineeId,
    emptyMessage,
    exerciseLabel,
    goalLabel,
    addGoalLabel,
    saveLabel,
    selectExerciseLabel,
    goals,
    exercisesObject,
    allExercisesInOneArray,
}: TrainerGoalsPageProps) => {
    const initialExercise = useMemo(() => getInitialExercise(allExercisesInOneArray), [allExercisesInOneArray])
    const [showExerciseModal, setShowExerciseModal] = useState(false)
    const [selectedExerciseId, setSelectedExerciseId] = useState(initialExercise.id)
    const [selectedExerciseName, setSelectedExerciseName] = useState(initialExercise.name)

    useEffect(() => {
        setSelectedExerciseId(initialExercise.id)
        setSelectedExerciseName(initialExercise.name)
    }, [initialExercise.id, initialExercise.name])

    useEffect(() => {
        HideShowHTMLScrollbar(showExerciseModal ? 'hide' : 'show')

        return () => {
            HideShowHTMLScrollbar('show')
        }
    }, [showExerciseModal])

    const handleClose = () => {
        setShowExerciseModal(false)
    }

    const handleSelect = (id: string, name?: string) => {
        setSelectedExerciseId(id)
        setSelectedExerciseName(name ?? id)
        setShowExerciseModal(false)
    }

    return (
        <main className="mx-5 mt-20 flex flex-col gap-4 text-white">
            <p className="text-center text-3xl">{title}</p>

            <section className="rounded-2xl border border-white/10 bg-darkLight p-4 shadow-[0_0_30px_rgba(0,0,0,0.18)]">
                <p className="mb-4 text-lg font-semibold">{addGoalLabel}</p>
                <form action={saveTraineeGoal} className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_auto] md:items-end">
                    <input type="hidden" name="traineeId" value={traineeId} />
                    <input type="hidden" name="exerciseid" value={selectedExerciseId} />
                    <div className="flex flex-col gap-2 text-sm text-gray-300">
                        <span>{exerciseLabel}</span>
                        <button
                            type="button"
                            onClick={() => setShowExerciseModal(true)}
                            className="w-full rounded-lg border-2 border-borderInteractive bg-dark px-4 py-2 text-left text-white outline-none transition-colors hover:border-green/50"
                        >
                            {selectedExerciseName || selectExerciseLabel}
                        </button>
                    </div>
                    <label className="flex flex-col gap-2 text-sm text-gray-300">
                        <span>{goalLabel}</span>
                        <input
                            name="goal"
                            type="number"
                            step="0.1"
                            min="0"
                            className="w-full rounded-lg border-2 border-borderInteractive bg-dark px-4 py-2 text-white outline-none transition-colors focus:border-green/50"
                            placeholder={goalLabel}
                        />
                    </label>
                    <Button isPrimary type="submit" className="md:min-w-28" disabled={!selectedExerciseId}>{saveLabel}</Button>
                </form>
            </section>

            <section className="rounded-2xl border border-white/10 bg-darkLight p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-sm text-gray-400">{goals.length}</p>
                </div>

                {goals.length === 0 ? (
                    <p className="py-6 text-center text-gray-300">{emptyMessage}</p>
                ) : (
                    <div className="space-y-3">
                        {goals.map((goal) => (
                            <form
                                key={goal.id}
                                action={saveTraineeGoal}
                                className="grid gap-3 rounded-xl border border-white/10 bg-dark p-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_auto] md:items-end"
                            >
                                <input type="hidden" name="traineeId" value={traineeId} />
                                <input type="hidden" name="exerciseid" value={goal.exerciseid} />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-400">{exerciseLabel}</span>
                                    <p className="text-base">{goal.exercisename}</p>
                                </div>
                                <label className="flex flex-col gap-2 text-sm text-gray-300">
                                    <span>{goalLabel}</span>
                                    <input
                                        name="goal"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        defaultValue={goal.goal}
                                        className="w-full rounded-lg border-2 border-borderInteractive bg-dark px-4 py-2 text-white outline-none transition-colors focus:border-green/50"
                                    />
                                </label>
                                <Button isPrimary type="submit" className="md:min-w-28">{saveLabel}</Button>
                            </form>
                        ))}
                    </div>
                )}
            </section>

            {showExerciseModal && (
                <BlurBackgroundModal className="z-50">
                    <MapExercises
                        exercisesObject={exercisesObject}
                        allExercisesInOneArray={allExercisesInOneArray}
                        handleClose={handleClose}
                        handleSelect={handleSelect}
                    />
                </BlurBackgroundModal>
            )}
        </main>
    )
}