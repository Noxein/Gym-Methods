'use client'

import { createContext, useState } from "react"
import { TraineePlan } from "../types"

const TraineeCalendarContext = createContext<TraineeCalendarContextType | null>(null)

type TraineeCalendarContextType = {
    plans: TraineePlan[]
    setPlans: React.Dispatch<React.SetStateAction<TraineePlan[]>>
    updatedPlansIds: string[]
    setUpdatedPlansIds: React.Dispatch<React.SetStateAction<string[]>>
}

type TraineeCalendarProviderProps = {
    children: React.ReactNode,
    traineePlans: TraineePlan[]
}

export default TraineeCalendarContext

export const TraineeCalendarProvider = ({ children, traineePlans }: TraineeCalendarProviderProps) => {

    const [plans, setPlans] = useState(traineePlans)
    const[updatedPlansIds, setUpdatedPlansIds] = useState<string[]>([])

    return (
        <TraineeCalendarContext.Provider value={{ plans, setPlans, updatedPlansIds, setUpdatedPlansIds }}>
            {children}
        </TraineeCalendarContext.Provider>
    )
}