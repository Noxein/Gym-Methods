import { TraineePlan, TraineeSingleExercise, TraineeSingleTraining } from "../types"

export type TrainerTraineePlanRow = {
    id: string,
    name: string,
    plan: unknown,
    date?: Date | string | null,
    iscompleted: boolean,
    lastedited?: Date | string | null,
    trainerid?: string,
    traineeid?: string,
    motherplanid?: string | null,
    motherplanname?: string | null,
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null
}

const toDate = (value: Date | string | null | undefined) => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value

    if (typeof value === 'string') {
        const parsed = new Date(value)

        if (!Number.isNaN(parsed.getTime())) return parsed
    }

    return new Date()
}

const isLegacySubPlan = (value: unknown): value is TraineeSingleTraining => {
    return isRecord(value) && Array.isArray(value.exercises)
}

const normalizeSingleTraining = (training: TraineeSingleTraining) => ({
    ...training,
    date: toDate(training.date),
    lastedited: toDate(training.lastedited),
})

const normalizeLegacyGroupedPlan = (row: TrainerTraineePlanRow): TraineePlan => {
    const rawPlan = Array.isArray(row.plan) ? row.plan : []
    const normalizedPlan = rawPlan
        .filter(isLegacySubPlan)
        .map(normalizeSingleTraining)

    return {
        id: row.id,
        name: row.name,
        plan: normalizedPlan,
        iscompleted: row.iscompleted,
        trainerid: row.trainerid,
        traineeid: row.traineeid,
        lastedited: toDate(row.lastedited),
    }
}

const normalizeExercises = (value: unknown): TraineeSingleExercise[] => {
    return Array.isArray(value) ? value as TraineeSingleExercise[] : []
}

export const formatTrainerTraineePlanDate = (value: Date | string) => {
    const date = toDate(value)
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const groupTrainerTraineePlanRows = (rows: TrainerTraineePlanRow[]) => {
    const groupedPlans = new Map<string, TraineePlan>()

    rows.forEach((row) => {
        if (Array.isArray(row.plan) && (row.date === undefined || row.date === null) && row.motherplanid == null) {
            groupedPlans.set(row.id, normalizeLegacyGroupedPlan(row))
            return
        }

        const groupId = row.motherplanid ?? row.id
        const existingPlan = groupedPlans.get(groupId)
        const subPlan: TraineeSingleTraining = {
            id: row.id,
            name: row.name,
            exercises: normalizeExercises(row.plan),
            date: toDate(row.date),
            iscompleted: row.iscompleted,
            lastedited: toDate(row.lastedited),
        }

        if (!existingPlan) {
            groupedPlans.set(groupId, {
                id: groupId,
                name: row.motherplanname ?? row.name,
                plan: [subPlan],
                iscompleted: subPlan.iscompleted,
                trainerid: row.trainerid,
                traineeid: row.traineeid,
                lastedited: toDate(row.lastedited),
            })
            return
        }

        existingPlan.plan.push(subPlan)
        existingPlan.iscompleted = existingPlan.iscompleted && subPlan.iscompleted

        if (existingPlan.lastedited && toDate(existingPlan.lastedited).getTime() < subPlan.lastedited.getTime()) {
            existingPlan.lastedited = subPlan.lastedited
        }
    })

    return Array.from(groupedPlans.values())
        .map((plan) => ({
            ...plan,
            plan: [...plan.plan].sort((left, right) => {
                const dateDiff = toDate(left.date).getTime() - toDate(right.date).getTime()

                if (dateDiff !== 0) return dateDiff

                return toDate(left.lastedited).getTime() - toDate(right.lastedited).getTime()
            }),
        }))
        .sort((left, right) => toDate(right.lastedited).getTime() - toDate(left.lastedited).getTime())
}
