'use client'

import { deleteUserGoal, saveUserGoal } from "@/app/actions"
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal"
import { Button } from "@/app/components/ui/Button"
import { MapExercises } from "@/app/components/ui/MapExercises"
import { exercisesArr } from "@/app/lib/exercise-list"
import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import { nameTrimmer } from "@/app/lib/utils"
import { ExerciseTypes, UserExercise } from "@/app/types"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useRef, useState, useTransition } from "react"

type GoalItem = {
    id: string
    userid: string
    exerciseid: string
    exercisename: string
    goal: string
}

type SelfGoalsPageProps = {
    title: string
    emptyMessage: string
    exerciseLabel: string
    goalLabel: string
    addGoalLabel: string
    saveLabel: string
    deleteLabel: string
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

export const SelfGoalsPage = ({
    title,
    emptyMessage,
    exerciseLabel,
    goalLabel,
    addGoalLabel,
    saveLabel,
    deleteLabel,
    selectExerciseLabel,
    goals,
    exercisesObject,
    allExercisesInOneArray,
}: SelfGoalsPageProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const formRef = useRef<HTMLFormElement>(null)
    const d = useTranslations("DefaultExercises")
    const initialExercise = useMemo(() => getInitialExercise(allExercisesInOneArray), [allExercisesInOneArray])
    const [showExerciseModal, setShowExerciseModal] = useState(false)
    const [selectedExerciseId, setSelectedExerciseId] = useState(initialExercise.id)
    const [selectedExerciseName, setSelectedExerciseName] = useState(initialExercise.name)
    const [newGoalValue, setNewGoalValue] = useState('')
    const [goalsValues, setGoalsValues] = useState<Record<string, string>>({})

    const handleFormAction = (action: (formData: FormData) => Promise<any>) => {
        return async (formData: FormData) => {
            startTransition(async () => {
                await action(formData)
                router.refresh()
            })
        }
    }

    const translateExerciseName = (exerciseName: string) => {
        return exercisesArr.includes(exerciseName) ? d(nameTrimmer(exerciseName)) : exerciseName
    }

    useEffect(() => {
        setSelectedExerciseId(initialExercise.id)
        setSelectedExerciseName(initialExercise.name)
    }, [initialExercise.id, initialExercise.name])

    useEffect(() => {
        const nextValues = goals.reduce((acc, goal) => {
            acc[goal.id] = String(goal.goal)
            return acc
        }, {} as Record<string, string>)

        setGoalsValues(nextValues)
        
        // Reset add goal form when goals update
        if (formRef.current) {
            formRef.current.reset()
            setNewGoalValue('')
            setSelectedExerciseId(initialExercise.id)
            setSelectedExerciseName(initialExercise.name)
        }
    }, [goals, initialExercise.id, initialExercise.name])

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

    const isCreateSaveDisabled = !selectedExerciseId || newGoalValue.trim() === ''

    return (
        <main className="mx-5 mt-20 flex flex-col gap-4 text-white">
            <p className="text-center text-3xl">{title}</p>

            <section className="rounded-2xl border border-white/10 bg-darkLight p-4 shadow-[0_0_30px_rgba(0,0,0,0.18)]">
                <p className="mb-4 text-lg font-semibold">{addGoalLabel}</p>
                <form ref={formRef} action={handleFormAction(saveUserGoal)} className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_auto] md:items-end">
                    <input type="hidden" name="exerciseid" value={selectedExerciseId} />
                    <div className="flex flex-col gap-2 text-sm text-gray-300">
                        <span>{exerciseLabel}</span>
                        <button
                            type="button"
                            onClick={() => setShowExerciseModal(true)}
                            className="w-full rounded-lg border-2 border-borderInteractive bg-dark px-4 py-2 text-left text-white outline-none transition-colors hover:border-green/50"
                        >
                            {selectedExerciseName ? translateExerciseName(selectedExerciseName) : selectExerciseLabel}
                        </button>
                    </div>
                    <label className="flex flex-col gap-2 text-sm text-gray-300">
                        <span>{goalLabel}</span>
                        <input
                            name="goal"
                            type="number"
                            step="0.1"
                            min="0"
                            value={newGoalValue}
                            onChange={(e) => setNewGoalValue(e.target.value)}
                            className="w-full rounded-lg border-2 border-borderInteractive bg-dark px-4 py-2 text-white outline-none transition-colors focus:border-green/50"
                            placeholder={goalLabel}
                        />
                    </label>
                    <Button isPrimary type="submit" className="md:min-w-28" disabled={isCreateSaveDisabled}>{saveLabel}</Button>
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
                                action={handleFormAction(saveUserGoal)}
                                className="grid gap-3 rounded-xl border border-white/10 bg-dark p-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_auto] md:items-end"
                            >
                                <input type="hidden" name="exerciseid" value={goal.exerciseid} />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-400">{exerciseLabel}</span>
                                    <p className="text-base">{translateExerciseName(goal.exercisename)}</p>
                                </div>
                                <label className="flex flex-col gap-2 text-sm text-gray-300">
                                    <span>{goalLabel}</span>
                                    <input
                                        name="goal"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={goalsValues[goal.id] ?? String(goal.goal)}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setGoalsValues((prev) => ({ ...prev, [goal.id]: value }))
                                        }}
                                        className="w-full rounded-lg border-2 border-borderInteractive bg-dark px-4 py-2 text-white outline-none transition-colors focus:border-green/50"
                                    />
                                </label>
                                <div className="flex flex-col gap-2 md:min-w-28">
                                    <Button
                                        isPrimary
                                        type="submit"
                                        formAction={handleFormAction(saveUserGoal)}
                                        disabled={(goalsValues[goal.id] ?? String(goal.goal)) === String(goal.goal)}
                                    >
                                        {saveLabel}
                                    </Button>
                                    <button
                                        type="submit"
                                        formAction={handleFormAction(deleteUserGoal)}
                                        className="rounded-lg border-2 bg-dark border-borderInteractive px-4 py-3 text-sm font-semibold text-green transition-colors hover:bg-red"
                                    >
                                        {deleteLabel}
                                    </button>
                                </div>
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